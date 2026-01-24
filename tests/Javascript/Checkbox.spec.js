import {test, expect} from '@playwright/test'
test("Checkbox",async ({page})=>{

await page.goto("https://testautomationpractice.blogspot.com/")

//Single checbox
await page.locator('#sunday').check()
//Assertion
await expect(await page.locator('#sunday')).toBeChecked()
await expect(await page.locator("#sunday").isChecked()).toBeTruthy()
await expect(await page.locator("#monday").isChecked()).toBeFalsy()

//Multiple Checkbox
const multichecks=[await page.locator('#tuesday'),await page.locator('#thursday'),await page.locator('#saturday')]
for(const element of multichecks)
{
    await element.check()
    await expect(element).toBeChecked()
}

//Unchecck multicheck box
for (const element of multichecks)
{
    if (await expect(element).toBeChecked)
        await element.uncheck()
    await expect (element).not.toBeChecked()
}

}
)