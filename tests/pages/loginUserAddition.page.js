const config = require('../config/testConfig');

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto(config.app.url);
  }

  async loginAsAdmin() {
    await this.page.fill(
      'input[name="username"]',
      config.credentials.admin.username
    );
    await this.page.fill(
      'input[name="password"]',
      config.credentials.admin.password
    );
    await this.page.click('button[type="submit"]');
  }

  async verifyAdminMenu() {
    await this.page.locator('span:has-text("Admin")').waitFor();
  }

  async clickAdmin() {
    await this.page.locator('span:has-text("Admin")').click();
  }

  async logout() {
    await this.page.locator('.oxd-userdropdown-name').click();
    await this.page.locator('a:has-text("Logout")').click();
  }
}

class AdminPage {
  constructor(page) {
    this.page = page;
  }

  async openAdmin() {
    await this.page.locator('span:has-text("Admin")').click();
  }

  async searchUser(username) {
    const usernameInput = this.page
      .locator('.oxd-input-group')
      .filter({ hasText: 'Username' })
      .locator('input');

    if (!(await usernameInput.isVisible())) {
      console.log('⚠ Username search input not visible');
      return;
    }

    await usernameInput.fill(username);
    await this.page.locator('button:has-text("Search")').click();
  }

  async isUserPresent(username) {
    try {
      await this.page
        .locator('.oxd-table-row', { hasText: username })
        .waitFor({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async addUser(user) {
    await this.page.locator('button:has-text("Add")').click();

    // Role
    await this.page.locator('.oxd-select-text').first().click();
    await this.page
      .locator('.oxd-select-dropdown')
      .locator(`span:has-text("${user.role}")`)
      .click();

    // Employee
    const empInput = this.page.locator('input[placeholder="Type for hints..."]');
    await empInput.fill(user.employee.substring(0, 6));
    await this.page
      .locator('.oxd-autocomplete-option', { hasText: user.employee })
      .click();

    // Status
    await this.page
      .locator('.oxd-input-group')
      .filter({ hasText: 'Status' })
      .locator('.oxd-select-text')
      .click();
    await this.page
      .locator('.oxd-select-dropdown')
      .locator(`span:has-text("${user.status}")`)
      .click();

    // Credentials
    await this.page.locator('input.oxd-input').nth(1).fill(user.username);
    await this.page.locator('input[type="password"]').first().fill(user.password);
    await this.page.locator('input[type="password"]').nth(1).fill(user.password);

    await this.page.locator('button:has-text("Save")').click();
  }

  async verifyUserExists(username) {
    await this.page.locator(`text=${username}`).waitFor({ timeout: 15000 });
    console.log(`✅ User verified: ${username}`);
  }

  async logout() {
    await this.page.locator('.oxd-userdropdown-name').click();
    await this.page.locator('a:has-text("Logout")').click();
  }
}

module.exports = { LoginPage, AdminPage };

