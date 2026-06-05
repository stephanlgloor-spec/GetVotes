import { test, expect } from '@playwright/test';

const csv = `Abstimmungs_Text,Ja_Absolut,Nein_Absolut,Kanton
Testvorlage 1,100,50,Zürich
Testvorlage 1,20,10,Schaffhausen
Andere Vorlage,5,2,Bern`;

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
  await page.route('**/assets/daten/abstimmungen_seit1933.csv', async route => {
    await new Promise(resolve => setTimeout(resolve, 150));
    await route.fulfill({
      status: 200,
      contentType: 'text/csv',
      body: csv
    });
  });

  await page.goto('/');
  await expect(page.locator('mat-progress-bar')).toBeVisible();

  const table = page.locator('table.voting-table');
  await expect(table).toBeVisible();
  await expect(table.getByRole('row')).toHaveCount(2);
  await expect(table.getByText('Testvorlage 1')).toBeVisible();
  await expect(table.getByText('100')).toBeVisible();
  await expect(table.getByText('50')).toBeVisible();
  await expect(page.getByText('Schaffhausen')).toHaveCount(0);
});
