import { test, expect } from "@playwright/test";

let context;
let page;

test.describe("Demoblaze grouped tests", () => {

  test.beforeAll(async ({ browser }) => {

    context = await browser.newContext();
    page = await context.newPage();

    await page.goto("https://www.demoblaze.com/index.html");

    // LOGIN
    await page.click('#login2');
    await page.locator("#loginusername").fill("test");
    await page.locator("#loginpassword").fill("test");
    await page.click("button[onclick='logIn()']");
    await page.waitForSelector("#logout2");
  });

  test.afterAll(async () => {
    await page.click("#logout2");
    await context.close();
  });

  test("test1 - print product titles", async () => {

    const products = page.locator('.card-title a');
    const count = await products.count();

    for (let i = 0; i < count; i++) {
      console.log(await products.nth(i).innerText());
    }
  });

  test("test2 - add Sony xperia z5 to cart", async () => {

    await page.locator('a:text("Sony xperia z5")').click();

    page.once('dialog', async dialog => {
      expect(dialog.message()).toBe("Product added.");
      await dialog.accept();
    });

    await page.locator('a:text("Add to cart")').click();

    await page.click("#cartur");
  });

});
