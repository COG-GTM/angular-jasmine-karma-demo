// Composes baseline (left) and upgraded (right) full-page screenshots side by side,
// computes a pixel-diff % per page and writes report/README.md with the results tables.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const root = path.dirname(fileURLToPath(import.meta.url));
const screens = path.join(root, 'report', 'screens');
const outDir = path.join(root, 'report', 'side-by-side');
fs.mkdirSync(outDir, { recursive: true });

const read = (p) => PNG.sync.read(fs.readFileSync(p));
const pad = (img, w, h) => {
  const out = new PNG({ width: w, height: h });
  out.data.fill(255);
  PNG.bitblt(img, out, 0, 0, img.width, img.height, 0, 0);
  return out;
};

const names = fs.existsSync(path.join(screens, 'baseline')) ? fs.readdirSync(path.join(screens, 'baseline')).filter((f) => f.endsWith('.png')).sort() : [];
const rows = [];
for (const name of names) {
  const upPath = path.join(screens, 'upgraded', name);
  if (!fs.existsSync(upPath)) { rows.push({ name, diff: 'missing' }); continue; }
  const a = read(path.join(screens, 'baseline', name));
  const b = read(upPath);
  const w = Math.max(a.width, b.width), h = Math.max(a.height, b.height);
  const pa = pad(a, w, h), pb = pad(b, w, h);
  const diff = new PNG({ width: w, height: h });
  const changed = pixelmatch(pa.data, pb.data, diff.data, w, h, { threshold: 0.1 });
  const gap = 16;
  const side = new PNG({ width: w * 2 + gap, height: h });
  side.data.fill(0);
  PNG.bitblt(pa, side, 0, 0, w, h, 0, 0);
  PNG.bitblt(pb, side, 0, 0, w, h, w + gap, 0);
  fs.writeFileSync(path.join(outDir, name), PNG.sync.write(side));
  rows.push({ name, diff: ((changed / (w * h)) * 100).toFixed(2) + '%', size: `${a.width}x${a.height} / ${b.width}x${b.height}` });
}

// Per-test results from Playwright's JSON reporter.
const resultsPath = path.join(root, 'report', 'results.json');
const tests = new Map();
if (fs.existsSync(resultsPath)) {
  const walk = (suite, prefix) => {
    const title = suite.title && !suite.title.endsWith('.ts') ? [...prefix, suite.title] : prefix;
    for (const spec of suite.specs ?? []) {
      for (const t of spec.tests) {
        const key = `${spec.file} › ${[...title, spec.title].join(' › ')}`;
        const last = t.results[t.results.length - 1];
        const status = t.status === 'expected' ? 'pass' : t.status === 'flaky' ? 'pass (flaky)' : t.status === 'skipped' ? 'skipped' : 'FAIL';
        tests.set(key, { ...(tests.get(key) ?? {}), [t.projectName]: status, retries: Math.max(tests.get(key)?.retries ?? 0, (last?.retry ?? 0)) });
      }
    }
    for (const s of suite.suites ?? []) walk(s, title);
  };
  for (const s of JSON.parse(fs.readFileSync(resultsPath, 'utf8')).suites) walk(s, []);
}
const count = (p) => [...tests.values()].filter((t) => t[p]?.startsWith('pass')).length;

let md = `# Parity report: Angular 12 baseline vs Angular 21 upgrade\n\n`;
md += `Same Playwright specs, two projects: \`baseline\` (Angular 12, http://localhost:4000) and \`upgraded\` (Angular 21, http://localhost:4200).\n`;
md += `Retries: 2 (the /users page calls the shared public API jsonplaceholder.typicode.com).\n\n`;
md += `Result: baseline ${count('baseline')}/${tests.size} pass, upgraded ${count('upgraded')}/${tests.size} pass.\n\n`;
md += `## Flows\n\n| Page / flow | Baseline | Upgraded |\n|---|---|---|\n`;
for (const [k, v] of tests) md += `| ${k} | ${v.baseline ?? '-'} | ${v.upgraded ?? '-'} |\n`;
md += `\n## Screenshots (baseline left, upgraded right)\n\n| Page | Pixel diff | Size (baseline / upgraded) |\n|---|---|---|\n`;
for (const r of rows) md += `| [${r.name}](side-by-side/${r.name}) | ${r.diff} | ${r.size ?? '-'} |\n`;
md += `\n`;
for (const r of rows) if (r.size) md += `### ${r.name}\n\n![${r.name}](side-by-side/${r.name})\n\n`;
md += `## Run it\n\n\`\`\`bash\n# baseline (Angular 12, master + baseline build fixes) on :4000\ngit worktree add ../baseline 21b78bc && cd ../baseline\nnvm use 20 && npm ci && NODE_OPTIONS=--openssl-legacy-provider npx ng serve --port 4000\n\n# upgraded (Angular 21) on :4200 from this branch\nnvm use 22 && npm ci && npx ng serve --port 4200\n\n# parity suite\ncd parity && npm ci && npx playwright install chromium\nnpx playwright test; node compose.mjs\n\`\`\`\n`;
fs.writeFileSync(path.join(root, 'report', 'README.md'), md);
console.log(rows, `baseline ${count('baseline')}/${tests.size}, upgraded ${count('upgraded')}/${tests.size}`);
if (tests.size === 0 || count('baseline') < tests.size || count('upgraded') < tests.size) process.exitCode = 1;
