import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'src/react',
  plugins: [react()],
  build: {
    outDir: '../../dist/react',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test-setup.ts'],
    dir: 'src',
    include: ['**/*.test.{ts,tsx}'],
  },
});
