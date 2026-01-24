const { test, expect } = require('@playwright/test');
 //Simple alert

test("Simple alert",async ({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/")
await page.locator("[id='alertBtn']").click()

  await page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('I am an alert');
    await dialog.accept();
  });
})


 //Confirm alert

test("Confirm alert",async ({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/")
await page.locator('[id="confirmBtn"]').click()

await page.once('dialog', async dialog => {
  const message = dialog.message();

  if (message.includes('Press')) {
    await dialog.accept();   // OK
  } else {
    await dialog.dismiss();  // Cancel
  }
})
})

//Prompt alert
test("Promt alert",async ({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/")
await page.locator('[id="promptBtn"]').click()

await page.once('dialog', async dialog => {

  await expect(dialog.type()).toBe('prompt');
  await expect(dialog.message()).toContain('Please enter your name:');
  await expect(dialog.defaultValue()).toEqual('Harry Potter');
  await dialog.accept('Deepan');
  // await popup.dismiss();
});
await page.locator('#promptBtn').click();

})
