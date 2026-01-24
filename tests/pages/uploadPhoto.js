// class PIMphotoupload {
//   constructor(page) {
//     this.page = page;

//     // ===== Login =====
//     this.usernameInput = 'input[name="username"]';
//     this.passwordInput = 'input[name="password"]';
//     this.loginBtn = 'button[type="submit"]';

//     // PIM
//     this.pimMenu = 'span:has-text("PIM")';

//     // Search
//     this.employeeIdInput =
//       '//label[text()="Employee Id"]/following::input[1]';
//     this.searchBtn = 'button:has-text("Search")';

//     // Results
//     this.noRecordsText =
//       '//div[@class="oxd-table-body"]//span[text()="No Records Found"]';
//     this.exactIdCell = (empId) =>
//       `.oxd-table-cell:has-text("${empId}")`;

//     // Actions
//     this.editIcon = '.oxd-icon.bi-pencil-fill';

//     // Photo
//     this.photoIcon = '.orangehrm-edit-employee-image';
//     this.fileInput = 'input[type="file"]';
//     this.saveBtn = 'button:has-text("Save")';

//     // Logout
//     this.profileIcon = '.oxd-userdropdown-tab';
//     this.logoutBtn = 'a:has-text("Logout")';
//   }

//   // ===== Login action (NO logic change) =====
//   async login(username, password) {
//     await this.page.fill(this.usernameInput, username);
//     await this.page.fill(this.passwordInput, password);
//     await this.page.click(this.loginBtn);
//   }

//   async goToPIM() {
//     await this.page.locator(this.pimMenu).click();
//     await this.page.waitForURL(/viewEmployeeList/, { timeout: 15000 });
//   }

//   async searchEmployeeById(empId) {
//     await this.page.waitForSelector(this.employeeIdInput, { timeout: 15000 });
//     await this.page.fill(this.employeeIdInput, empId);

//     await this.page.click(this.searchBtn);
//     await this.page.waitForTimeout(2000);

//     if (await this.page.locator(this.noRecordsText).count() > 0) {
//       console.log(`❌ Employee ${empId} NOT found`);
//       await this.logout();
//       return false;
//     }

//     const idCell = this.page.locator(this.exactIdCell(empId));

//     if (await idCell.count() === 0) {
//       console.log(`❌ Employee ${empId} NOT found (exact match failed)`);
//       await this.logout();
//       return false;
//     }

//     console.log(`✅ Employee ${empId} found`);
//     return true;
//   }

//   async editEmployeeAndUploadPhoto(photoPath) {
//     const edit = this.page.locator(this.editIcon).first();

//     if (!(await edit.isVisible({ timeout: 5000 }).catch(() => false))) {
//       console.log('❌ Edit icon not visible');
//       await this.logout();
//       return false;
//     }

//     await edit.click();

//     await this.page.waitForSelector('h6:has-text("Personal Details")', {
//       timeout: 15000
//     });

//     await this.page.locator(this.photoIcon).click();
//     await this.page.waitForSelector(this.fileInput, { state: 'attached' });
//     await this.page.setInputFiles(this.fileInput, photoPath);

//     return true;
//   }

//   async saveProfilePhoto() {
//     if (await this.page.locator(this.saveBtn).count() > 0) {
//       await this.page.locator(this.saveBtn).first().click();
//       await this.page.waitForTimeout(2000);
//     }
//   }

//   async logout() {
//     if (await this.page.locator(this.profileIcon).count() > 0) {
//       await this.page.locator(this.profileIcon).click();
//       await this.page.locator(this.logoutBtn).click();
//     }
//   }
// }

// module.exports = PIMphotoupload;

const config = require('../config/testConfig');

class PIMphotoupload {
  constructor(page) {
    this.page = page;
    this.shouldContinue = true;

    // ===== Login =====
    this.usernameInput = 'input[name="username"]';
    this.passwordInput = 'input[name="password"]';
    this.loginBtn = 'button[type="submit"]';

    // PIM
    this.pimMenu = 'span:has-text("PIM")';

    // Search
    this.employeeIdInput =
      '//label[text()="Employee Id"]/following::input[1]';
    this.searchBtn = 'button:has-text("Search")';

    // Results
    this.noRecordsText =
      '//div[@class="oxd-table-body"]//span[text()="No Records Found"]';
    this.exactIdCell =
      '//div[@class="oxd-table-body"]//div[contains(@class,"oxd-table-card")]//div[contains(@class,"oxd-table-cell")]';

    // Actions
    this.editIcon =
      '//div[@class="oxd-table-body"]//i[contains(@class,"bi-pencil-fill")]';

    // Photo
    this.photoIcon = '.orangehrm-edit-employee-image';
    this.fileInput = 'input[type="file"]';
    this.saveBtn = 'button:has-text("Save")';

    // Logout
    this.profileIcon = '.oxd-userdropdown-tab';
    this.logoutBtn = 'a:has-text("Logout")';
  }

  // ===== Open + Login =====
  async openAndLogin() {
    await this.page.goto(config.app.url, {
      waitUntil: 'load',
      timeout: 90000
    });

    await this.page.fill(this.usernameInput, config.credentials.admin.username);
    await this.page.fill(this.passwordInput, config.credentials.admin.password);
    await this.page.click(this.loginBtn);

    await this.page.waitForURL(/dashboard/, { timeout: 15000 });
  }

  async goToPIM() {
    if (!this.shouldContinue) return;

    await this.page.click(this.pimMenu);
    await this.page.waitForURL(/viewEmployeeList/, { timeout: 15000 });
  }

  async searchEmployeeOrStop(empId) {
    if (!this.shouldContinue) return;

    await this.page.waitForSelector(this.employeeIdInput, { timeout: 15000 });
    await this.page.fill(this.employeeIdInput, empId);
    await this.page.click(this.searchBtn);
    await this.page.waitForTimeout(2000);

    if (await this.page.locator(this.noRecordsText).count() > 0) {
      console.log(`❌ Employee ${empId} NOT found`);
      this.shouldContinue = false;
      await this.logout();
      await this.page.close();
      return;
    }

    const rows = await this.page.locator(this.exactIdCell).count();
    if (rows === 0) {
      console.log(`❌ Employee ${empId} NOT found (exact match failed)`);
      this.shouldContinue = false;
      await this.logout();
      await this.page.close();
      return;
    }

    console.log(`✅ Employee ${empId} found`);
  }

  async editEmployeeAndUploadPhoto() {
    if (!this.shouldContinue) return;

    const edit = this.page.locator(this.editIcon).first();

    if (!(await edit.isVisible().catch(() => false))) {
      console.log('❌ Edit icon not visible');
      this.shouldContinue = false;
      await this.logout();
      await this.page.close();
      return;
    }

    await edit.click();

    await this.page.waitForSelector('h6:has-text("Personal Details")', {
      timeout: 15000
    });

    await this.page.click(this.photoIcon);
    await this.page.waitForSelector(this.fileInput, { state: 'attached' });
    await this.page.setInputFiles(this.fileInput, config.upload.photoPath);
  }

  async saveAndLogout() {
    if (!this.shouldContinue) return;

    if (await this.page.locator(this.saveBtn).count() > 0) {
      await this.page.locator(this.saveBtn).first().click();
      await this.page.waitForTimeout(2000);
    }

    await this.logout();
  }

  async logout() {
    if (await this.page.locator(this.profileIcon).count() > 0) {
      await this.page.click(this.profileIcon);
      await this.page.click(this.logoutBtn);
    }
  }
}

module.exports = PIMphotoupload;
