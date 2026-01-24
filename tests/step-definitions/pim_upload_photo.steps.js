// const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
// setDefaultTimeout(120 * 1000);

// const { expect } = require('@playwright/test');
// const PIMphotoupload = require('../pages/uploadPhoto.js');
// const config = require('../config/testConfig');

// let pimPhotoUpload;
// let shouldContinue = true;

// Given('I login to OrangeHRM', async function () {
//   await this.page.goto(config.app.url, {
//     waitUntil: 'load',
//     timeout: 90000
//   });

//   pimPhotoUpload = new PIMphotoupload(this.page);

//   await pimPhotoUpload.login(
//     config.credentials.admin.username,
//     config.credentials.admin.password
//   );

//   await expect(this.page).toHaveURL(/dashboard/, { timeout: 15000 });
// });

// When('I navigate to PIM page', async function () {
//   if (!shouldContinue) return;
//   await pimPhotoUpload.goToPIM();
// });

// When('I search employee by ID {string}', async function (empId) {
//   if (!shouldContinue) return;

//   const found = await pimPhotoUpload.searchEmployeeById(empId);

//   if (!found) {
//     shouldContinue = false;
//     await this.page.close();
//   }
// });

// When('I edit the employee and upload profile photo', async function () {
//   if (!shouldContinue) return;

//   const proceeded = await pimPhotoUpload.editEmployeeAndUploadPhoto(
//     config.upload.photoPath
//   );

//   if (!proceeded) {
//     shouldContinue = false;
//     await this.page.close();
//   }
// });

// Then('I save the profile and logout', async function () {
//   if (!shouldContinue) return;

//   await pimPhotoUpload.saveProfilePhoto();
//   await pimPhotoUpload.logout();
// });

const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(120 * 1000);

const PIMphotoupload = require('../pages/uploadPhoto');

let pimPhotoUpload;

Given('I login to OrangeHRM', async function () {
  pimPhotoUpload = new PIMphotoupload(this.page);
  await pimPhotoUpload.openAndLogin();
});

When('I navigate to PIM page', async function () {
  await pimPhotoUpload.goToPIM();
});

When('I search employee by ID {string}', async function (empId) {
  await pimPhotoUpload.searchEmployeeOrStop(empId);
});

When('I edit the employee and upload profile photo', async function () {
  await pimPhotoUpload.editEmployeeAndUploadPhoto();
});

Then('I save the profile and logout', async function () {
  await pimPhotoUpload.saveAndLogout();
});
