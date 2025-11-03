import { test, expect } from '@playwright/test';

/**
 * Stsenaarium: Vigased sisselogimise andmed
 *
 * Algseis: Sisselogimislehel ei ole kasutajat sisse logitud.
 * Tegevus: Kasutaja sisestab olematu kasutajanime ja vale parooli ning
 * klikib nupule "Logi sisse".
 * Oodatav tulemus: Lehel kuvatakse hoiatus "Vale kasutajanimi või parool"
 * ning kasutaja ei pääse rakendusse.
 */
test('login with invalid credentials displays an error', async ({ page }) => {
  await page.goto('/login.php');
  const username = `nouser${Date.now()}`;
  await page.fill('#login', username);
  await page.fill('#pass', 'wrongpass');
  await page.click('input[type="submit"][name="login_submit"]');
  // Kontrolli, et kuvatakse veateade vigaste andmete kohta
  await expect(page.locator('text=/vale kasutajanimi/i')).toBeVisible();
  // Jää sisselogimislehele
  await expect(page).toHaveURL(/login\.php/);
});
