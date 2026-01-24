import { test, expect } from '@playwright/test';
test.setTimeout(160000)
test('test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Claim' }).click();
  await page.getByRole('button', { name: ' Assign Claim' }).click();
  await page.getByRole('textbox', { name: 'Type for hints...' }).click();
  await page.waitForLoadState('networkidle');
  await page.getByRole('textbox', { name: 'Type for hints...' }).fill('1212'); 

const employeeInput = page.locator(
  'label:has-text("Employee Name") >> xpath=following::input[1]'
);

// Wait for autosuggest processing to finish
await page.waitForTimeout(2000);

// Read the actual input value
const valueAfterSearch = await employeeInput.inputValue();

// 🚨 If value is still the ID → No employee exists
if (valueAfterSearch.trim() === '1212') {
  console.log('❌ No user found');

  await page.locator('header i.oxd-userdropdown-icon').click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();
  return;
}
  
  await page.getByText('Deepan deepu').first().click({ timeout: 150000 });
  await page.getByText('-- Select --').first().click();
  await page.getByText('Accommodation').click();
  await page.getByText('-- Select --').click();
  await page.getByText('Indian Rupee').click();
  await page.locator('textarea').click();
  await page.locator('textarea').fill('Stay claim');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('button', { name: ' Add' }).first().click();
  await page.getByText('-- Select --').click();
  await page.getByRole('option', { name: 'Accommodation' }).click();
  await page.locator('.oxd-icon.bi-calendar').click();
  await page.getByText('20', { exact: true }).click();
  await page.locator('.oxd-grid-2 > div:nth-child(2) > .oxd-input-group > div:nth-child(2) > .oxd-input').click();
  await page.locator('.oxd-input.oxd-input--focus').fill('5000');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.locator('header i.oxd-userdropdown-icon').click({ timeout: 30000 });
  await page.getByRole('menuitem', { name: 'Logout' }).click();
});