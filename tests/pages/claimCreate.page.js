const testConfig = require('../config/testConfig');

class ClaimCreatePage {
  constructor(page) {
    this.page = page;

    this.employeeInput = page.locator(
      'label:has-text("Employee Name") >> xpath=following::input[1]'
    );
  }

  async openApp() {
    await this.page.goto(
      `${testConfig.app.url}web/index.php/auth/login`
    );
  }

  async login() {
    await this.page.getByRole('textbox', { name: 'Username' })
      .fill(testConfig.credentials.admin.username);

    await this.page.getByRole('textbox', { name: 'Password' })
      .fill(testConfig.credentials.admin.password);

    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async goToClaim() {
    await this.page.getByRole('link', { name: 'Claim' }).click();
    await this.page.getByRole('button', { name: ' Assign Claim' }).click();
  }

  async searchEmployee() {
    await this.page.getByRole('textbox', { name: 'Type for hints...' }).click();
    await this.page.waitForLoadState('networkidle');

    await this.page.getByRole('textbox', { name: 'Type for hints...' })
      .fill(testConfig.pimEmployee.employeeId);
  }

  async createClaimOrLogout() {
  await this.page.waitForTimeout(2000);

  // Check if employee exists in search results
  const employeeLocator = this.page.locator(
    `text=${testConfig.pimEmployee.firstName} ${testConfig.pimEmployee.lastName}`
  );

  const exists = await employeeLocator.count();

  if (exists === 0) {
    console.log('❌ No user found, logging out');

    const userIcon = this.page.locator('header i.oxd-userdropdown-icon');
    await userIcon.click();
    await this.page.getByRole('menuitem', { name: 'Logout' }).click();
    return false;
  }

  // Employee exists → create claim
  await employeeLocator.first().click({ timeout: 15000 });

  await this.page.getByText('-- Select --').first().click();
  await this.page.getByText('Accommodation').click();

  await this.page.getByText('-- Select --').click();
  await this.page.getByText('Indian Rupee').click();

  await this.page.locator('textarea').fill('Stay claim');
  await this.page.getByRole('button', { name: 'Create' }).click();

  return true;
}


  async submitClaim() {
    await this.page.getByRole('button', { name: ' Add' }).first().click();
    await this.page.getByText('-- Select --').click();
    await this.page.getByRole('option', { name: 'Accommodation' }).click();

    await this.page.locator('.oxd-icon.bi-calendar').click();
    await this.page.getByText('20', { exact: true }).click();

    await this.page
      .locator('.oxd-grid-2 > div:nth-child(2) > .oxd-input-group > div:nth-child(2) > .oxd-input')
      .fill(testConfig.claimData.amount);

    await this.page.getByRole('button', { name: 'Save' }).click();
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  async logout() {
  const userIcon = this.page.locator('header i.oxd-userdropdown-icon');

  // If already logged out, do nothing
  if (!(await userIcon.isVisible({ timeout: 3000 }).catch(() => false))) {
    console.log('ℹ️ User already logged out, skipping logout');
    return;
  }

  await userIcon.click();
  await this.page.getByRole('menuitem', { name: 'Logout' }).click();
}
}

module.exports = ClaimCreatePage;
