import { test, expect } from '@playwright/test';
//Taking screen shot of full page
test('Screenshot', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
await page.waitForTimeout(3000);
await page.screenshot({
    path: 'tests/Screenshots/Home-Page.png',
    fullPage: true})

})

//Taking screen shot of particular portion
test.only('Particularpart', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
await page.waitForTimeout(3000);
await page.locator("(//div[@id='tbodyid']//div//div//a//img)[3]")
.screenshot({path: 'tests/Screenshots'+ Date.now()+"/ParticularPage.png"})

})

