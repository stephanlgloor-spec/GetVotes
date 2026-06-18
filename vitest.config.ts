import { defineConfig } from 'vitest/config';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

// import { UserConfig } from 'vitest';

/*
 Environment-driven configuration notes:
 - COVERAGE_REPORTER: comma-separated list of coverage reporters (default: "text,json,html").
 - COVERAGE_DIR: directory where coverage reports are written (default: "coverage").
 - VITEST_REPORTERS: comma-separated list of Vitest reporters (default: "default").

 For readable test failure frames with original TypeScript line numbers, enable source maps
 in your TypeScript build and run Vitest with Node's source-map support, e.g.:
   node --enable-source-maps ./node_modules/.bin/vitest run --reporter default

 These env vars let you change behavior without editing this file.
*/

/*
const coverageDefault = 'text,json,html';
const coverageReporters = (process.env.COVERAGE_REPORTER || coverageDefault)
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const coverageDir = process.env.COVERAGE_DIR || 'coverage';
const vitestReporters = (process.env.VITEST_REPORTERS || 'default')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
  */

export default defineConfig({
  plugins: [await tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'test/setupTests.ts',
    include: ['test/**/*.spec.ts'],
    // Allow switching coverage reporters via COVERAGE_REPORTER env var
    // coverage: {
    //   provider: 'v8',
    //   reporter: coverageReporters,
    //   reportsDirectory: coverageDir,
    // },
    // Allow switching reporters (e.g. "default", "verbose", "junit") via env var
    // reporters: vitestReporters as any,
  },
  css: undefined,

});
