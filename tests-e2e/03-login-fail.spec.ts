import { test, expect } from '@playwright/test';

test('login with invalid credentials displays an error', async ({ page }) => {
  await page.goto('https://miroslavburdyga24.thkit.ee/content/PHP/content/Pitsa/login.php');
  await page.waitForTimeout(2000);
  
  const username = `nouser${Date.now()}`;
  await page.locator('input[name="login"], #login').fill(username);
  await page.locator('input[name="pass"], #pass').fill('wrongpass');
  await page.locator('input[type="submit"][name="login_submit"]').click();
  await page.waitForTimeout(3000);
  
  await expect(page.locator('body')).toContainText(/vale kasutajanimi/i);
  await expect(page).toHaveURL(/login\.php/);
});