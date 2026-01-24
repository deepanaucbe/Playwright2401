const { Given, When, Then } = require('@cucumber/cucumber');
const TimesheetPage = require('../pages/Timesheet.page');
const config = require('../config/testConfig');

let timepage;

Given('I log into OrangeHRM', async function () {
  timepage = new TimesheetPage(this.page);
  await timepage.loginToOrangeHRM(config);
});

When('I navigate to Employee Timesheets', async function () {
  await timepage.goToTime();
});
When('I search employee by name {string}', async function (empName) {
  await timepage.searchEmployeeOrStop(empName);
});

When('I create and fill the timesheet', async function () {
  await timepage.createAndFill(config);
});

When('the timesheet status should be submitted', async function () {
  await timepage.verifyStatus();
});

Then('I logout from the application', async function () {
  await timepage.logoutApplication();
});
