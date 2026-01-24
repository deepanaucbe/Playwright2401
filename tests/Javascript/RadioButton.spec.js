import{test,expect}from '@playwright/test'
test("RadiButton",async ({page})=>{

await page.goto("https://testautomationpractice.blogspot.com/")
await page.locator("#male").check()

await expect(await page.locator('#male')).toBeChecked()
}
)