import { test, expect } from '@playwright/test';

/**
 * Stsenaarium: Pitsa otsing ja restorani filter
 *
 * Algseis: Kasutaja asub otsingulehel.
 * Tegevus: Kasutaja otsib nime järgi pitsa "Hawaii" ja seejärel filtreerib
 * tulemused konkreetse restorani (Opera Pizza) järgi.
 * Oodatav tulemus: Esimese otsingu järel on tulemustes näha ainult "Hawaii".
 * Filtri rakendamisel kuvatakse vaid selle restorani pitsad ja iga
 * tulemuse real on restoraniks "Opera Pizza".
 */
test('searches for a specific pizza and filters by restaurant', async ({ page }) => {
  await page.goto('/pitsaotsing.php');
  // Sisesta otsingutermin ja esita
  await page.fill('#otsisona', 'Hawaii');
  await Promise.all([
    page.waitForNavigation(),
    page.click('input[value="Otsi pitsasid"]'),
  ]);
  // Pärast "Hawaii" otsimist peaks jääma ainult üks rida selle nimega
  const rows = page.locator('table tbody tr');
  await expect(rows).toHaveCount(1);
  await expect(rows.first()).toContainText('Hawaii');
  // Tühjenda otsingukast
  await page.fill('#otsisona', '');
  // Vali rippmenüüst Opera Pizza restoran selle nähtava sildi järgi
  await page.selectOption('#restoran_id', { label: 'Opera Pizza' });
  await Promise.all([
    page.waitForNavigation(),
    page.click('input[value="Otsi pitsasid"]'),
  ]);
  // Pärast Opera Pizza järgi filtreerimist peaks olema mitu rida, kõik Opera Pizzast
  const filteredRows = page.locator('table tbody tr');
  const count = await filteredRows.count();
  await expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    const cell = filteredRows.nth(i).locator('td').last();
    await expect(cell).toContainText('Opera Pizza');
  }
  
});
