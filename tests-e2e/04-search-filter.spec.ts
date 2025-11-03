import { test, expect } from '@playwright/test';

test('searches for a specific pizza and filters by restaurant', async ({ page }) => {
  await page.goto('https://miroslavburdyga24.thkit.ee/content/PHP/content/Pitsa/pitsaotsing.php');
  await page.waitForTimeout(2000);
  
  await page.locator('input[name="otsisona"], #otsisona').fill('Hawaii');
  await page.locator('input[value="Otsi pitsasid"]').click();
  await page.waitForTimeout(3000);
  
  const rows = page.locator('table tbody tr');
  const rowCount = await rows.count();
  expect(rowCount).toBeGreaterThanOrEqual(1);
  await expect(rows.first()).toContainText('Hawaii');
  
  await page.locator('input[name="otsisona"], #otsisona').fill('');
  await page.locator('select[name="restoran_id"], #restoran_id').selectOption({ label: 'Opera Pizza' });
  await page.locator('input[value="Otsi pitsasid"]').click();
  await page.waitForTimeout(3000);
  
  const filteredRows = page.locator('table tbody tr');
  const count = await filteredRows.count();
  expect(count).toBeGreaterThan(0);
  
  for (let i = 0; i < count; i++) {
    await expect(filteredRows.nth(i)).toContainText('Opera Pizza');
  }
});