const { test, expect } = require('@playwright/test');

test('Select Vandalur and KMCH', async ({ page }) => {

  await page.goto('https://www.redbus.in/');

  //-------- FROM --------
  const fromInput = page.locator('#srcinput');
  await expect(fromInput).toBeVisible();

  // ✅ IMPORTANT: use focus(), NOT click()
  await fromInput.focus();
  await page.keyboard.type('Chenn', { delay: 200 });

  const fromOptions = page.locator('[role="option"]');
  await expect(fromOptions.first()).toBeVisible({ timeout: 10000 });

  await fromOptions.filter({ hasText: 'Vandalur' }).first().click();

  const selectedValue = await fromInput.inputValue();
  console.log("Selected location:", selectedValue);

  await expect(fromInput).toHaveValue(/Vandalur/i);
  // -------- TO --------
  const toInput = page.locator('#destinput');
  await expect(toInput).toBeVisible();

  await toInput.focus();
  await page.keyboard.type('Coim', { delay: 200 });

  const toOptions = page.locator('[role="option"]');
  await expect(toOptions.first()).toBeVisible({ timeout: 10000 });

  await toOptions.filter({ hasText: 'KMCH' }).first().click();

  const selectedValue1 = await toInput.inputValue();
  console.log("Selected location:", selectedValue1);

 await expect(toInput).toHaveValue(/KMCH/i);

 //Date picker

 let selectedMonthYear = "January 2026";

await page.locator("//span[text()='Date of Journey']").click();

while (true) {
  const presentMonthYear = await page
    .locator("//p[contains(@class,'monthYear')]")
    .textContent();

  if (presentMonthYear.trim() === selectedMonthYear) {
    break;
  }

  await page.click("//i[@role='button' and contains(@aria-label,'Next month')]");
}

await page.locator("//div[@role='button' and @aria-label='Thursday, January 1, 2026']").click();
await page.locator("//button[text()='Search buses']").click();
await expect(page).toHaveURL(/search/);
await page.close();

})