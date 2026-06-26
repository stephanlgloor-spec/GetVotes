import { test, expect } from '@playwright/test';
import { readFileSync } from 'fs';
import { resolve } from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

test('GetVotes app renders Zurich aggregated results table', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('GetVotes Zürich')).toBeVisible();

  const table = page.getByRole('table');
  await expect(table).toHaveCount(1);
  await expect(table.getByRole('columnheader', { name: 'Abstimmung' })).toBeVisible();
  await expect(table.getByRole('columnheader', { name: 'Ja' })).toBeVisible();
  await expect(table.getByRole('columnheader', { name: 'Nein' })).toBeVisible();

  const rows = table.getByRole('row');
  await expect(rows.nth(1)).toBeVisible();
});

test('shows progress bar while loading and renders filtered Zurich row', async ({ page }) => {
//    1. Path to your local test file
    const path = resolve(__dirname, '../src/assets/daten/abstimmungen_seit1933.parquet');
    
//    2. Read file as a Buffer (Node.js binary format)
    const fileBuffer = readFileSync(path);
    //  const arrayBuffer = new Uint8Array(fileBuffer).slice().buffer
  await page.route('**/assets/daten/abstimmungen_seit1933.parquet', async route => {
    await new Promise(resolve => setTimeout(resolve, 150));
    await route.fulfill({
      status: 200,
      contentType: 'application/octet-stream',
      body: fileBuffer,
    });
  });

  await page.goto('/');
  // await expect(page.locator('mat-progress-bar')).toBeVisible();    // TODO use id for progress bar to avoid relying on class name

  const table = page.getByRole('table');
  // const table = page.locator('table.voting-table');    // TODO use id for table to avoid relying on class name
  await expect(table).toBeVisible();
  await expect(table.getByRole('row')).toHaveCount(30);
  await expect(table.getByText('Volksinitiative «Keine 10-Millionen-Schweiz! (Nachhaltigkeitsinitiative)»')).toBeVisible();
  await expect(table.getByText('312037')).toBeVisible();
  await expect(table.getByText('589809')).toBeVisible();
  await expect(page.getByText('Kanton Zürich')).toHaveCount(17);
});
