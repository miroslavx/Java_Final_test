import { test, expect } from '@playwright/test';

/**
 * Stsenaarium: Väljalogimine
 *
 * Algseis: Uus kasutaja registreerib end ja logib seejärel rakendusse.
 * Tegevus: Kasutaja avab menüüst lingi "Logi välja".
 * Oodatav tulemus: Kasutaja suunatakse tagasi avalehele, kus menüüs
 * kuvatakse taas lingid "Logi sisse" ja "Registreeri" ning sisselogitud
 * kasutaja nime ei näidata enam.
 
 */
test('logged in user can log out successfully', async ({ page }) => {
  const username = `logout${Date.now()}`;
  const password = 'Password123!';
  // Registreeri
  await page.goto('/register.php');
  await page.fill('#reg_login', username);
  await page.fill('#reg_pass', password);
  await page.fill('#reg_pass_confirm', password);
  await Promise.all([
    page.waitForNavigation(),
    page.click('input[type="submit"][name="register_submit"]'),
  ]);
  // Logi sisse
  await page.fill('#login', username);
  await page.fill('#pass', password);
  await Promise.all([
    page.waitForNavigation(),
    page.click('input[type="submit"][name="login_submit"]'),
  ]);
  // Kontrolli, et oleme sisse logitud
  await expect(page.locator(`text=${username}`)).toBeVisible();
  // Klõpsa väljalogimise lingil
  await Promise.all([
    page.waitForNavigation(),
    page.click('text=Logi välja'),
  ]);
  // Pärast väljalogimist peaks sisselogimise link olema nähtav ja kasutajanime ei tohiks kuvada
  await expect(page.locator('text=Logi sisse')).toBeVisible();
  await expect(page.locator(`text=${username}`)).toHaveCount(0);
});
