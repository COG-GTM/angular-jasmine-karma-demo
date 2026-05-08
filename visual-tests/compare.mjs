/**
 * Compares source (Angular) screenshots against react screenshots.
 * Reports pixel diff percentage and generates diff images.
 * Threshold: <2% mismatch to pass.
 *
 * Usage: node compare.mjs
 */
import { readFileSync, readdirSync, existsSync, mkdirSync } from "fs";
import { writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOURCE_DIR = path.join(__dirname, "screenshots", "source");
const REACT_DIR = path.join(__dirname, "screenshots", "react");
const DIFF_DIR = path.join(__dirname, "screenshots", "diff");
const THRESHOLD = 0.02; // 2% max mismatch

function ensureDir(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function compareImages(sourcePath, reactPath, diffPath) {
  const sourceImg = PNG.sync.read(readFileSync(sourcePath));
  const reactImg = PNG.sync.read(readFileSync(reactPath));

  // Use the larger dimensions for comparison canvas
  const width = Math.max(sourceImg.width, reactImg.width);
  const height = Math.max(sourceImg.height, reactImg.height);

  // Create canvases with the target size
  const sourceCanvas = new PNG({ width, height });
  const reactCanvas = new PNG({ width, height });

  // Fill with white background
  for (let i = 0; i < width * height * 4; i += 4) {
    sourceCanvas.data[i] = 255;
    sourceCanvas.data[i + 1] = 255;
    sourceCanvas.data[i + 2] = 255;
    sourceCanvas.data[i + 3] = 255;
    reactCanvas.data[i] = 255;
    reactCanvas.data[i + 1] = 255;
    reactCanvas.data[i + 2] = 255;
    reactCanvas.data[i + 3] = 255;
  }

  // Copy source image data
  PNG.bitblt(sourceImg, sourceCanvas, 0, 0, sourceImg.width, sourceImg.height, 0, 0);
  PNG.bitblt(reactImg, reactCanvas, 0, 0, reactImg.width, reactImg.height, 0, 0);

  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(
    sourceCanvas.data,
    reactCanvas.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 }
  );

  writeFileSync(diffPath, PNG.sync.write(diff));

  const totalPixels = width * height;
  const diffPercentage = numDiffPixels / totalPixels;

  return { numDiffPixels, totalPixels, diffPercentage };
}

function main() {
  ensureDir(DIFF_DIR);

  if (!existsSync(SOURCE_DIR)) {
    console.error(`Source directory not found: ${SOURCE_DIR}`);
    console.log("Run capture-source.mjs first to generate baseline screenshots.");
    process.exit(1);
  }

  if (!existsSync(REACT_DIR)) {
    console.error(`React directory not found: ${REACT_DIR}`);
    console.log("Run capture-react.mjs first to generate React screenshots.");
    process.exit(1);
  }

  const sourceFiles = readdirSync(SOURCE_DIR).filter((f) => f.endsWith(".png"));
  let allPass = true;
  const results = [];

  for (const file of sourceFiles) {
    const sourcePath = path.join(SOURCE_DIR, file);
    const reactPath = path.join(REACT_DIR, file);
    const diffPath = path.join(DIFF_DIR, `diff-${file}`);

    if (!existsSync(reactPath)) {
      console.log(`SKIP: ${file} — no React counterpart found`);
      results.push({ file, status: "SKIP", reason: "no React screenshot" });
      continue;
    }

    const { numDiffPixels, totalPixels, diffPercentage } = compareImages(
      sourcePath,
      reactPath,
      diffPath
    );

    const pctStr = (diffPercentage * 100).toFixed(2);
    const passed = diffPercentage < THRESHOLD;

    if (!passed) {
      allPass = false;
    }

    const status = passed ? "PASS" : "FAIL";
    console.log(
      `${status}: ${file} — ${pctStr}% diff (${numDiffPixels}/${totalPixels} pixels)`
    );
    results.push({ file, status, diffPercentage, numDiffPixels, totalPixels });
  }

  console.log("\n--- Summary ---");
  for (const r of results) {
    if (r.status === "SKIP") {
      console.log(`  ${r.file}: SKIPPED (${r.reason})`);
    } else {
      const pct = ((r.diffPercentage ?? 0) * 100).toFixed(2);
      console.log(`  ${r.file}: ${r.status} (${pct}%)`);
    }
  }

  if (allPass) {
    console.log("\nAll visual comparisons PASSED (<2% threshold).");
    process.exit(0);
  } else {
    console.log("\nSome visual comparisons FAILED (>2% threshold).");
    console.log("Check diff images in:", DIFF_DIR);
    process.exit(1);
  }
}

main();
