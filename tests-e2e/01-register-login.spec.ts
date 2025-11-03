import { test, expect } from '@playwright/test';

/**
 * Stsenaarium: Edukas registreerimine ja sisselogimine
 *
 * Algseis: Uus kasutaja ei ole veel registreeritud ja ei ole sisse logitud.
 * Tegevus: Kasutaja avab registreerimislehe, täidab vormi unikaalse
 * kasutajanimega ja parooliga, saadab vormi ning logib sisse kasutades
 * äsja loodud tunnuseid.
 * Oodatav tulemus: Leht kuvab teate edukast registreerimisest ja pärast
 * sisselogimist kuvatakse esilehel sõnum "Sisse logitud kui: <kasutajanimi>"
 * ning menüüs on näha link "Logi välja". Seejärel kasutaja logib välja ja
 * menüüsse ilmub uuesti link "Logi sisse".
 */
test('successful registration and login shows username and logout option', async ({ page }) => {
  const username = `user${Date.now()}`;
  const password = 'Password123!';

  // Ava registreerimisleht
  await page.goto('/register.php');
  // Täida registreerimisvorm
  await page.fill('#reg_login', username);
  await page.fill('#reg_pass', password);
  await page.fill('#reg_pass_confirm', password);
  // Esita registreerimisvorm ja oota ümbersuunamist sisselogimislehele
  await Promise.all([
    page.waitForNavigation(),
    page.click('input[type="submit"][name="register_submit"]'),
  ]);
  // Kontrolli, et sisselogimislehel kuvatakse eduteade
  await expect(page.locator('text=/edukalt registreeritud/i')).toBeVisible();
  // Täida sisselogimise vorm
  await page.fill('#login', username);
  await page.fill('#pass', password);
  // Esita sisselogimise vorm ja oota ümbersuunamist avalehele
  await Promise.all([
    page.waitForNavigation(),
    page.click('input[type="submit"][name="login_submit"]'),
  ]);
  // Kontrolli, et oleme avalehel
  await expect(page).toHaveURL(/index\.php/);
  // Kontrolli, et sisselogitud kasutajanimi kuvatakse ja väljalogimise valik on olemas
  await expect(page.locator(`text=${username}`)).toBeVisible();
  await expect(page.locator('text=Logi välja')).toBeVisible();
  // Logi välja, et puhastada testandmed
  await page.goto('/logout.php');
  // Pärast väljalogimist peaks "Logi sisse" link olema jälle nähtav
  await expect(page.locator('text=Logi sisse')).toBeVisible();
});
