import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { VIEWPORTS, VIEWS } from './matrix';

const thresholdEnv = process.env.THRESHOLD_PCT?.trim();
// An unset or empty variable keeps the documented 2% default; 0 means pixel-exact.
const THRESHOLD_PCT = Number(thresholdEnv === undefined || thresholdEnv === '' ? '2' : thresholdEnv);
if (!Number.isFinite(THRESHOLD_PCT) || THRESHOLD_PCT < 0) {
  throw new Error(`THRESHOLD_PCT must be a non-negative number, got '${thresholdEnv ?? ''}'`);
}
const root = path.resolve(import.meta.dirname, 'screenshots');
const diffDir = path.join(root, 'diff');

interface Result {
  pair: string;
  mismatchPct: number;
  sizeMismatch: boolean;
  passed: boolean;
}

// THRESHOLD_PCT is an exclusive bound (the spec is "under 2%"), except 0, which
// means "pixel-exact".
function withinThreshold(mismatchPct: number): boolean {
  return THRESHOLD_PCT === 0 ? mismatchPct === 0 : mismatchPct < THRESHOLD_PCT;
}

function pad(png: PNG, width: number, height: number): PNG {
  if (png.width === width && png.height === height) return png;
  const out = new PNG({ width, height });
  out.data.fill(255);
  PNG.bitblt(png, out, 0, 0, Math.min(png.width, width), Math.min(png.height, height), 0, 0);
  return out;
}

function main(): void {
  mkdirSync(diffDir, { recursive: true });
  const results: Result[] = [];

  for (const view of VIEWS) {
    for (const viewport of VIEWPORTS) {
      const name = `${view.name}-${viewport.name}.png`;
      const sourcePath = path.join(root, 'source', name);
      const reactPath = path.join(root, 'react', name);
      if (!existsSync(sourcePath) || !existsSync(reactPath)) {
        throw new Error(`missing screenshot for ${name}`);
      }
      const a = PNG.sync.read(readFileSync(sourcePath));
      const b = PNG.sync.read(readFileSync(reactPath));
      const width = Math.max(a.width, b.width);
      const height = Math.max(a.height, b.height);
      const left = pad(a, width, height);
      const right = pad(b, width, height);
      const diff = new PNG({ width, height });
      const mismatched = pixelmatch(left.data, right.data, diff.data, width, height, {
        threshold: 0.1,
      });
      const mismatchPct = (mismatched / (width * height)) * 100;
      const sizeMismatch = a.width !== b.width || a.height !== b.height;
      writeFileSync(path.join(diffDir, name), PNG.sync.write(diff));
      results.push({
        pair: name,
        mismatchPct,
        sizeMismatch,
        passed: !sizeMismatch && withinThreshold(mismatchPct),
      });
    }
  }

  results.sort((x, y) => y.mismatchPct - x.mismatchPct);
  console.log(
    THRESHOLD_PCT === 0 ? 'threshold: pixel-exact\n' : `threshold: <${THRESHOLD_PCT}% mismatch\n`,
  );
  console.log('| pair | mismatch % | result |');
  console.log('| --- | --- | --- |');
  for (const r of results) {
    const verdict = r.passed ? 'PASS' : r.sizeMismatch ? 'FAIL (size mismatch)' : 'FAIL';
    console.log(`| ${r.pair} | ${r.mismatchPct.toFixed(3)} | ${verdict} |`);
  }
  const failed = results.filter((r) => !r.passed);
  console.log(`\n${results.length - failed.length}/${results.length} pairs passed`);
  if (failed.length > 0) {
    process.exitCode = 1;
  }
}

main();
