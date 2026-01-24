import { test, expect } from "@playwright/test";

test("Login Page", async ({ page }) => {

  await page.goto("https://www.demoblaze.com/");

  // LOGIN
  await page.click("#login2");
  await page.fill("#loginusername", "test");
  await page.fill("#loginpassword", "test");
  await page.click('//button[text()="Log in"]');

  // Wait for successful login indicator
  await expect(page.locator("#nameofuser")).toHaveText(/Welcome/);

  // Print All Link Texts
  console.log("\n===== ALL LINK TEXTS =====");
  const allLinks = await page.$$("a");
  for (const link of allLinks) {
    const text = await link.textContent();
    if (text?.trim()) 
        console.log(text.trim());
  }

  // Product Titles
  console.log("\n===== PRODUCT TITLES =====");
  const products = await page.$$("//div[@id='tbodyid']//h4/a");
  for (const item of products) {
    console.log((await item.textContent()).trim());
  }

  // Logout
  await expect(page.locator("#logout2")).toBeVisible();
  await page.click("#logout2");
});
