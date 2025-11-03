import { test, expect } from '@playwright/test';

/**
 * Stsenaarium: Duplikaat kasutajanime registreerimine
 *
 * Algseis: Andmebaasis ei ole veel kasutajat nimega <kasutajanimi>.
 * Tegevus: Kasutaja registreerib end unikaalse kasutajanimega ja seejärel
 * proovib registreerida uuesti sama nimega.
 * Oodatav tulemus: Esimese registreerimise järel on näha teade
 * edukast registreerimisest, kuid teise katse korral kuvatakse teade
 * "Selline kasutajanimi on juba olemas!" ja kasutajat ei lisata uuesti.
 */
test('registering with an existing username shows an error', async ({ page }) => {
  const username = `dup${Date.now()}`;
  const password = 'Password123!';
  // Esimene registreerimine
  await page.goto('/register.php');
  await page.fill('#reg_login', username);
  await page.fill('#reg_pass', password);
  await page.fill('#reg_pass_confirm', password);
  await Promise.all([
    page.waitForNavigation(),
    page.click('input[type="submit"][name="register_submit"]'),
  ]);
  // Registreerimine õnnestus, kasutaja suunatakse sisselogimislehele
  await expect(page.locator('text=/edukalt registreeritud/i')).toBeVisible();
  // Proovi sama kasutajanimega uuesti registreerida
  await page.goto('/register.php');
  await page.fill('#reg_login', username);
  await page.fill('#reg_pass', password);
  await page.fill('#reg_pass_confirm', password);
  await page.click('input[type="submit"][name="register_submit"]');
  // Kontrolli duplikaatse kasutajanime veateadet
  await expect(page.locator('text=/kasutajanimi on juba/i')).toBeVisible();
});
