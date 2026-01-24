const { expect } = require('@playwright/test');

class PimPage {
  constructor(page) {
    this.page = page;

    // Menu
    this.pimMenu = '//span[text()="PIM"]';
    this.addEmployeeBtn = '//a[text()="Add Employee"]';

    // Search
    this.employeeIdSearchInput =
      '(//label[text()="Employee Id"]/following::input)[1]';
    this.searchBtn = '//button[normalize-space()="Search"]';
    this.tableRows = '//div[@class="oxd-table-body"]/div';

    // Add employee
    this.firstNameInput = 'input[name="firstName"]';
    this.middleNameInput = 'input[name="middleName"]';
    this.lastNameInput = 'input[name="lastName"]';
    this.employeeIdInput =
      '(//label[text()="Employee Id"]/following::input)[1]';
    this.saveBtn = '//button[normalize-space()="Save"]';

    // Personal details
    this.personalDetailsHeader = '//h6[text()="Personal Details"]';
    this.editBtn = '//button[normalize-space()="Edit"]';
    this.licenseInput =
      "//label[text()=\"Driver's License Number\"]/following::input[1]";
    this.licenseExpiryInput =
      '(//label[text()="License Expiry Date"]/following::input)[1]';
    this.nationalityDropdown =
      '(//label[text()="Nationality"]/following::div[contains(@class,"oxd-select-text")])[1]';
    this.maritalDropdown =
      '(//label[text()="Marital Status"]/following::div[contains(@class,"oxd-select-text")])[1]';
    this.dobInput =
      '(//label[text()="Date of Birth"]/following::input)[1]';

    // Logout
    this.profileIcon = '//span[@class="oxd-userdropdown-tab"]';
    this.logoutBtn = '//a[text()="Logout"]';
  }

  /* ---------- LOGIN (MOVED AS-IS) ---------- */

  async loginToOrangeHRM(config) {
    await this.page.goto(config.app.url, {
      waitUntil: 'load',
      timeout: 90000
    });

    await this.page.fill(
      'input[name="username"]',
      config.credentials.admin.username
    );
    await this.page.fill(
      'input[name="password"]',
      config.credentials.admin.password
    );
    await this.page.click('button[type="submit"]');

    await expect(this.page).toHaveURL(/dashboard/, { timeout: 15000 });
  }

  /* ---------- NAVIGATION ---------- */

  async goToPIM() {
    await this.page.click(this.pimMenu);
    await this.page.waitForURL(/viewEmployeeList/, { timeout: 15000 });
  }

  /* ---------- EXACT SAME LOGIC MOVED ---------- */

  async verifyOrCreateEmployeeAndLogout(employee) {
    await this.searchEmployeeById(employee.employeeId);
    const row = await this.findEmployeeById(employee.employeeId);

    if (row) {
      console.log('Employee exists → Editing');
      await this.openEmployee(row);
    } else {
      console.log('Employee not found → Creating');
      await this.addEmployee(employee);
    }

    await this.updatePersonalDetails(employee);
    await this.logout();
  }

  async searchEmployeeById(empId) {
    await this.page.fill(this.employeeIdSearchInput, empId);
    await this.page.click(this.searchBtn);
    await this.page.waitForLoadState('networkidle');
  }

  async findEmployeeById(empId) {
    const rows = this.page.locator(this.tableRows);
    const count = await rows.count();

    for (let i = 0; i < count; i++) {
      const cells = rows.nth(i).locator('div[role="cell"]');
      const idText = await cells.nth(1).innerText();
      if (idText.trim() === empId) {
        return rows.nth(i);
      }
    }
    return null;
  }

  async openEmployee(row) {
    await row.click();
    await this.page.waitForSelector(this.personalDetailsHeader, {
      timeout: 15000
    });
  }

  async addEmployee(emp) {
    await this.page.click(this.addEmployeeBtn);

    await this.page.fill(this.firstNameInput, emp.firstName);
    await this.page.fill(this.middleNameInput, emp.middleName);
    await this.page.fill(this.lastNameInput, emp.lastName);
    await this.page.fill(this.employeeIdInput, emp.employeeId);

    await this.page.click(this.saveBtn);

    await this.page.waitForSelector(this.personalDetailsHeader, {
      timeout: 15000
    });
  }

  async updatePersonalDetails(emp) {
    await this.page.waitForSelector(this.personalDetailsHeader, {
      timeout: 15000
    });

    if (await this.page.locator(this.editBtn).isVisible()) {
      await this.page.click(this.editBtn);
      await this.page.waitForSelector('.oxd-form-loader', {
        state: 'detached',
        timeout: 20000
      });
    }

    await this.page.waitForTimeout(6000);
    await this.page.evaluate(() => window.scrollBy(0, 400));

    const license = this.page.locator(this.licenseInput);
    await license.waitFor({ state: 'visible' });
    await license.fill(emp.license);

    await this.page.locator(this.licenseExpiryInput).fill(emp.licenseExpiry);
    await this.page.locator(this.dobInput).fill(emp.dob);

    await this.page.locator(
      `//label[normalize-space()='${emp.gender}']`
    ).click();

    await this.page.click(this.nationalityDropdown);
    await this.page.click(`//span[text()="${emp.nationality}"]`);

    await this.page.click(this.maritalDropdown);
    await this.page.click(`//span[text()="${emp.maritalStatus}"]`);

    await this.page.click(
      '(//button[@class="oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space"])[1]'
    );

    await this.page.evaluate(() => window.scrollBy(0, 600));
    await this.page.waitForTimeout(1000);

    await this.page
      .locator(
        "//label[text()='Blood Type']/following::div[contains(@class,'oxd-select-text-input')][1]"
      )
      .click();
    await this.page.click(`//span[text()='${emp.bloodType}']`);

    await this.page
      .locator("//label[text()='Test_Field']/following::input[1]")
      .fill(emp.testField);

    await this.page.click(
      '//*[@id="app"]/div[1]/div[2]/div[2]/div/div/div/div[2]/div[2]/div/form/div[2]/button'
    );

    console.log('✅ Employee Personal Details Updated:');
    console.table({
      firstName: emp.firstName,
      middleName: emp.middleName,
      lastName: emp.lastName,
      employeeId: emp.employeeId,
      license: await license.inputValue(),
      licenseExpiry: await this.page
        .locator(this.licenseExpiryInput)
        .inputValue(),
      dob: await this.page.locator(this.dobInput).inputValue(),
      gender: emp.gender,
      bloodType: emp.bloodType,
      testField: emp.testField,
      nationality: emp.nationality,
      maritalStatus: emp.maritalStatus
    });
  }

  async logout() {
    await this.page.click(this.profileIcon);
    await this.page.click(this.logoutBtn);
  }
}

module.exports = PimPage;
