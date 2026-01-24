import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').click();
  await page.locator('#loginusername').fill('test');
  await page.locator('#loginpassword').click();
  await page.locator('#loginpassword').fill('test');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.locator('#tbodyid').click();
  await expect(page.locator('h2')).toContainText('Iphone 6 32gb');
  await expect(page.locator('#more-information')).toContainText('Product descriptionIt comes with 1GB of RAM. The phone packs 16GB of internal storage cannot be expanded. As far as the cameras are concerned, the Apple iPhone 6 packs a 8-megapixel primary camera on the rear and a 1.2-megapixel front shooter for selfies.');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('link', { name: 'Add to cart' }).click();
  await page.getByRole('link', { name: 'Cart', exact: true }).click();
  await page.getByRole('link', { name: 'Delete' }).first().click();
  await page.getByRole('button', { name: 'Place Order' }).click();
  await page.getByRole('dialog', { name: 'Place order' }).getByLabel('Close').click();
  await page.getByRole('link', { name: 'Log out' }).click();
});