import { test, expect } from '@playwright/test';

test('registering with an existing username shows an error', async ({ page }) => {
  const username = `dup${Date.now()}`;
  const password = 'Password123!';
  
  await page.goto('https://miroslavburdyga24.thkit.ee/content/PHP/content/Pitsa/register.php');
  await page.waitForTimeout(2000);
  
  await page.locator('input[name="reg_login"], #reg_login').first().fill(username);
  await page.locator('input[name="reg_pass"], #reg_pass').first().fill(password);
  await page.locator('input[name="reg_pass_confirm"], #reg_pass_confirm, input[name="reg_pass"]').last().fill(password);
  await page.locator('input[type="submit"][name="register_submit"]').click();
  await page.waitForTimeout(3000);
  
  await expect(page.locator('body')).toContainText(/edukalt registreeritud/i);
  
  await page.goto('https://miroslavburdyga24.thkit.ee/content/PHP/content/Pitsa/register.php');
  await page.waitForTimeout(2000);
  
  await page.locator('input[name="reg_login"], #reg_login').first().fill(username);
  await page.locator('input[name="reg_pass"], #reg_pass').first().fill(password);
  await page.locator('input[name="reg_pass_confirm"], #reg_pass_confirm, input[name="reg_pass"]').last().fill(password);
  await page.locator('input[type="submit"][name="register_submit"]').click();
  await page.waitForTimeout(3000);
  
  await expect(page.locator('body')).toContainText(/kasutajanimi on juba/i);
});