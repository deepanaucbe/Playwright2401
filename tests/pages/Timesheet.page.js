const { expect } = require('@playwright/test');

class TimesheetPage {
  constructor(page) {
    this.page = page;

    // ===== Login =====
    this.usernameInput = 'input[name="username"]';
    this.passwordInput = 'input[name="password"]';
    this.loginBtn = 'button[type="submit"]';

    // ===== Menu =====
    this.timeMenu = 'span:has-text("Time")';
    this.employeeTimesheets = 'a:has-text("Employee Timesheets")';

    // ===== Search Employee =====
    this.employeeNameInput ='label:has-text("Employee Name") >> xpath=following::input[1]';
    this.autoSuggestOption = '.oxd-autocomplete-option';
    this.viewBtn ='[class="oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space"]'

    // ===== Timesheet =====
    this.editBtn = 'button:has-text("Edit")';
    this.createTimesheetBtn = 'button:has-text("Create Timesheet")';
    this.projectInput ='.orangehrm-timesheet-table tbody tr:first-child input[placeholder="Type for hints..."]';
    this.activityDropdown ='.orangehrm-timesheet-table .oxd-select-text';
    this.activityOption ='.oxd-select-option';

    this.dayHourInputs ='.orangehrm-timesheet-table tbody tr:first-child td input';
    this.saveBtn = 'button:has-text("Save")';
    this.submitBtn = 'button:has-text("Submit")';

    // ===== Status =====
    this.statusText = '.orangehrm-timesheet-header--status';

    // ===== Logout =====
    this.profileIcon = '.oxd-userdropdown-tab';
    this.logoutBtn = 'a:has-text("Logout")';
  }

  // ===== Login =====
  async loginToOrangeHRM(config) {
    await this.page.goto(config.app.url, { waitUntil: 'load' });

    await this.page.fill(this.usernameInput, config.credentials.admin.username);
    await this.page.fill(this.passwordInput, config.credentials.admin.password);
    await this.page.click(this.loginBtn);

    await expect(this.page).toHaveURL(/dashboard/, { timeout: 15000 });
  }

  // ===== Navigate =====
   async goToTime() {
  // Click Time main menu
  await this.page.locator('span:has-text("Time")').click();

  // Click Timesheets dropdown
  const timesheetsDropdown = this.page.locator(
    'span.oxd-topbar-body-nav-tab-item:has-text("Timesheets")'
  );
  await timesheetsDropdown.waitFor({ state: 'visible', timeout: 15000 });
  await timesheetsDropdown.click();

  // Click Employee Timesheets option
  const employeeTimesheets = this.page.locator(
    'a.oxd-topbar-body-nav-tab-link:has-text("Employee Timesheets")'
  );
  await employeeTimesheets.waitFor({ state: 'visible', timeout: 15000 });
  await employeeTimesheets.click();
}


  // ===== Search Employee =====
  async searchEmployeeOrStop(empName) {
  const input = this.page.locator(this.employeeNameInput);

  await input.click();
  await input.fill('');
  await input.type(empName, { delay: 120 });

  const option = this.page
    .locator(this.autoSuggestOption)
    .filter({ hasText: empName })
    .first();

  await option.waitFor({ state: 'visible', timeout: 10000 });
  await option.click();

  // ✅ WAIT until View is enabled and click
  const viewBtn = this.page.locator(this.viewBtn);
  await viewBtn.waitFor({ state: 'visible', timeout: 10000 });
  await expect(viewBtn).toBeEnabled();
  await viewBtn.click();
}

  // ===== Create & Fill Timesheet (MON–FRI) =====

  async createAndFill(config) {
  const { project, activity, hours } = config.timesheetData;

  // ✅ NEW SAFE LOGIC (inserted here)
  const editBtn = this.page.locator(this.editBtn);
  const createBtn = this.page.locator(this.createTimesheetBtn);

  await Promise.race([
    editBtn.waitFor({ state: 'visible', timeout: 8000 }).catch(() => {}),
    createBtn.waitFor({ state: 'visible', timeout: 8000 }).catch(() => {})
  ]);

  if (await editBtn.isVisible()) {
    await editBtn.click();
  } else {
    await createBtn.click();
    await editBtn.waitFor({ state: 'visible', timeout: 10000 });
    await editBtn.click();
  }

  // ✅ EXISTING CODE CONTINUES
  await this.page.waitForSelector(this.projectInput, { timeout: 15000 });

  await this.page.fill(this.projectInput, project);
//   const Pinput=this.page.locator(this.projectInput);
//   await Pinput.click();
//   await Pinput.fill('');
//   await Pinput.type(project, { delay: 120 });
  const projectOption = this.page.locator(this.autoSuggestOption).filter({ hasText: project }).first();
  await projectOption.waitFor({ state: 'visible', timeout: 100000 });
  await projectOption.click();

  // Select Activity safely
const activityDrop = this.page.locator(this.activityDropdown);
await activityDrop.waitFor({ state: 'visible' });
await activityDrop.click();

const activityOpt = this.page
  .locator(this.activityOption)
  .filter({ hasText: activity })
  .first();

await activityOpt.waitFor({ state: 'visible' });
await activityOpt.click();

// ✅ VERY IMPORTANT: wait until activity text is locked
await expect(activityDrop).toContainText(activity);


  // await this.page.keyboard.press('Tab');
  // await this.page.waitForTimeout(500);

  // await this.page.locator(this.activityDropdown).click();
  // await this.page.locator(this.activityOption).filter({ hasText: activity }).click();

  // ---- Hours (Mon–Fri) ----
const inputs = this.page.locator(this.dayHourInputs);

// wait until inputs exist
await inputs.first().waitFor({ state: 'visible', timeout: 15000 });

// Debug safety (optional)
// const count = await inputs.count();
// console.log('Hour inputs found:', count);

// Fill Monday to Friday
await expect(
  this.page.locator(this.projectInput)
).toHaveValue(project);

const inputs = this.page.locator(this.dayHourInputs);
await inputs.first().waitFor({ state: 'visible' });

for (let i = 0; i < 5; i++) {
  await inputs.nth(i).fill(hours);
}


await this.page.click(this.saveBtn);

// 🔑 wait until Submit becomes enabled
const submit = this.page.locator(this.submitBtn);
await submit.waitFor({ state: 'visible', timeout: 15000 });
await expect(submit).toBeEnabled();

await submit.click();
}

  // ===== Verify =====
  async verifyStatus() {
    await expect(this.page.locator(this.statusText)).toHaveText(/Submitted/);
  }

  // ===== Logout =====
  async logoutApplication() {
    await this.page.click(this.profileIcon);
    await this.page.click(this.logoutBtn);
  }
}

module.exports = TimesheetPage;
