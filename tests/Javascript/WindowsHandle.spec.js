import { test, expect,chromium } from "@playwright/test";

test("test-1", async ({ }) => {
  const browser=await chromium.launch()  
  const context = await browser.newContext();
  const page1 = await context.newPage();
  const page2 = await context.newPage();

  console.log("No of pages=", context.pages().length);

  await page1.goto("https://www.demoblaze.com/");
  await expect(page1).toHaveTitle("STORE")

  await page2.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  await expect(page2).toHaveTitle("OrangeHRM")
 

  

});

test("test-2", async ({ }) => {
  const browser=await chromium.launch()  
  const context = await browser.newContext();
  const page1 = await context.newPage();

  await page1.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
  await page1.locator("//a[text()='OrangeHRM, Inc']").click()
  const pages=await context.waitForEvent('page')
  await pages.waitForTimeout(3000)

})