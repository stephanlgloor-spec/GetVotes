import { test, expect } from '@playwright/test';

test('GetVotes app renders and increments count', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('GetVotes').first()).toBeVisible();
  await expect(page.getByText('Votes: 0')).toBeVisible();

  await page.getByRole('button', { name: 'Vote' }).click();
  await expect(page.getByText('Votes: 1')).toBeVisible();
});
