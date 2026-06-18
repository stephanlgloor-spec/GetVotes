# Vitest: Coverage and Test Failure Line Numbers

This document explains how to configure coverage reporters and ensure failing test output shows file paths and line numbers (including for TypeScript).

## Configurable options (via environment variables)

- `COVERAGE_REPORTER` — comma-separated list of coverage reporters. Defaults to `text,json,html`.
  - Examples: `text`, `html`, `json`, `lcov` (depending on provider support).
  - Usage: `COVERAGE_REPORTER=html,json npx vitest run --coverage`

- `COVERAGE_DIR` — directory where coverage reports are written. Defaults to `coverage`.
  - Usage: `COVERAGE_DIR=coverage-reports npx vitest run --coverage`

- `VITEST_REPORTERS` — comma-separated list of Vitest reporters. Defaults to `default`.
  - Examples: `default`, `verbose`, `junit` (third-party reporter names may vary).
  - Usage: `VITEST_REPORTERS=default,verbose npx vitest run`

The repository `vitest.config.ts` reads these environment variables and applies them at runtime.

## Getting stack traces with TypeScript line numbers

To see failing test frames with original TypeScript file paths and line numbers, make sure:

1. Your TypeScript is compiled with source maps enabled. In `tsconfig.json` set:

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "inlineSources": true
  }
}
```

2. Run Vitest with Node source-map support. Example commands:

- Using `node --enable-source-maps` (recommended):

```bash
COVERAGE_REPORTER=text,html VITEST_REPORTERS=default node --enable-source-maps ./node_modules/.bin/vitest run --coverage
```

- Or simply (Vitest CLI will still work, but Node flag ensures correct mapping in some setups):

```bash
COVERAGE_REPORTER=text,html VITEST_REPORTERS=default npx vitest run --coverage
```

3. If you still see compiled JS frames rather than TypeScript frames, ensure your test runner is loading source maps and that vite/ts-node setup (if used) emits the maps.

## Examples

Run tests with coverage and HTML report written to `coverage`:

```bash
COVERAGE_REPORTER=html,json npx vitest run --coverage
```

Run tests with verbose reporter and coverage text output:

```bash
VITEST_REPORTERS=verbose COVERAGE_REPORTER=text npx vitest run --coverage
```

For CI, produce a machine-readable JSON or lcov report:

```bash
COVERAGE_REPORTER=json,lcov COVERAGE_DIR=ci-coverage npx vitest run --coverage
```

### Recommended npm scripts

Add the following npm scripts (already added to this repo):

- `test:precise` — runs Vitest with Node source-map support enabled so failing frames map to TypeScript lines:

```bash
npm run test:precise
```

- `test:ci-coverage` — produces HTML + JSON coverage with source-map support for CI:

```bash
npm run test:ci-coverage
```

### Quick checklist to ensure precise spec line numbers

- Enable source maps in `tsconfig.json` (see earlier section).
- Run tests using `NODE_OPTIONS=--enable-source-maps` (the `test:precise` script does this).
- If you still see JS frames, confirm the failing stack frame includes your spec file path — if not, try adding `--enable-source-maps` to the Node invocation used in your CI runner.


## Notes

- The exact reporter names supported depend on the coverage `provider` (the config uses `v8` by default) and installed Vitest reporters.
- If you need additional custom reporter options (e.g. junit output file path), prefer passing a CLI `--reporter` or customizing `vitest.config.ts` directly.

If you want, I can add an `npm` script to `package.json` that sets sensible defaults for local runs and CI.
