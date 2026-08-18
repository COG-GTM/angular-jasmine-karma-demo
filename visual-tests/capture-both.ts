import path from 'node:path';
import { captureApp } from './capture';

const SOURCE_URL = process.env.SOURCE_URL ?? 'http://localhost:4200';
const REACT_URL = process.env.REACT_URL ?? 'http://localhost:5173';

async function main(): Promise<void> {
  const root = path.resolve(import.meta.dirname, 'screenshots');
  const source = await captureApp(SOURCE_URL, path.join(root, 'source'));
  console.log(`source: ${source.length} screenshots`);
  const react = await captureApp(REACT_URL, path.join(root, 'react'));
  console.log(`react: ${react.length} screenshots`);
}

void main();
