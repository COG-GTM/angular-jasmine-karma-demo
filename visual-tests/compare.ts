import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const SOURCE_DIR = './screenshots/source';
const REACT_DIR = './screenshots/react';
const DIFF_DIR = './screenshots/diff';
const MISMATCH_THRESHOLD = 2; // percentage

interface ComparisonResult {
  name: string;
  mismatchPercent: number;
  passed: boolean;
  totalPixels: number;
  mismatchedPixels: number;
}

function compareImages(sourcePath: string, reactPath: string, diffPath: string): ComparisonResult {
  const name = path.basename(sourcePath, '.png');

  if (!fs.existsSync(sourcePath)) {
    console.error(`Source missing: ${sourcePath}`);
    return { name, mismatchPercent: 100, passed: false, totalPixels: 0, mismatchedPixels: 0 };
  }
  if (!fs.existsSync(reactPath)) {
    console.error(`React missing: ${reactPath}`);
    return { name, mismatchPercent: 100, passed: false, totalPixels: 0, mismatchedPixels: 0 };
  }

  const sourceImg = PNG.sync.read(fs.readFileSync(sourcePath));
  const reactImg = PNG.sync.read(fs.readFileSync(reactPath));

  const maxWidth = Math.max(sourceImg.width, reactImg.width);
  const maxHeight = Math.max(sourceImg.height, reactImg.height);

  const padImage = (img: PNG, width: number, height: number): PNG => {
    if (img.width === width && img.height === height) return img;
    const padded = new PNG({ width, height });
    // Fill with white
    for (let i = 0; i < padded.data.length; i += 4) {
      padded.data[i] = 255;
      padded.data[i + 1] = 255;
      padded.data[i + 2] = 255;
      padded.data[i + 3] = 255;
    }
    PNG.bitblt(img, padded, 0, 0, img.width, img.height, 0, 0);
    return padded;
  };

  const paddedSource = padImage(sourceImg, maxWidth, maxHeight);
  const paddedReact = padImage(reactImg, maxWidth, maxHeight);

  const diff = new PNG({ width: maxWidth, height: maxHeight });
  const totalPixels = maxWidth * maxHeight;
  const mismatchedPixels = pixelmatch(
    paddedSource.data,
    paddedReact.data,
    diff.data,
    maxWidth,
    maxHeight,
    { threshold: 0.1 }
  );

  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  const mismatchPercent = (mismatchedPixels / totalPixels) * 100;
  const passed = mismatchPercent < MISMATCH_THRESHOLD;

  return { name, mismatchPercent, passed, totalPixels, mismatchedPixels };
}

function run() {
  if (!fs.existsSync(DIFF_DIR)) {
    fs.mkdirSync(DIFF_DIR, { recursive: true });
  }

  const sourceFiles = fs.readdirSync(SOURCE_DIR).filter((f: string) => f.endsWith('.png'));
  const results: ComparisonResult[] = [];

  for (const file of sourceFiles) {
    const sourcePath = path.join(SOURCE_DIR, file);
    const reactPath = path.join(REACT_DIR, file);
    const diffPath = path.join(DIFF_DIR, file);

    const result = compareImages(sourcePath, reactPath, diffPath);
    results.push(result);
  }

  console.log('\n=== Visual Regression Test Results ===\n');
  console.log(`${'Screenshot'.padEnd(35)} | ${'Mismatch %'.padEnd(12)} | ${'Status'}`);
  console.log('-'.repeat(65));

  let allPassed = true;
  for (const r of results) {
    const status = r.passed ? 'PASS' : 'FAIL';
    if (!r.passed) allPassed = false;
    console.log(
      `${r.name.padEnd(35)} | ${r.mismatchPercent.toFixed(2).padStart(10)}% | ${status}`
    );
  }

  console.log('-'.repeat(65));
  const passCount = results.filter((r: ComparisonResult) => r.passed).length;
  const failCount = results.filter((r: ComparisonResult) => !r.passed).length;
  console.log(`\nTotal: ${results.length} | Passed: ${passCount} | Failed: ${failCount}`);
  console.log(`Threshold: <${MISMATCH_THRESHOLD}%`);
  console.log(`\nOverall: ${allPassed ? 'ALL PASSED' : 'SOME FAILED'}\n`);

  process.exit(allPassed ? 0 : 1);
}

run();
