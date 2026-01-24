@smoke 
Feature: OrangeHRM Login

@login
Scenario: Login, navigate to Admin and logout
  Given user is logged into OrangeHRM
  When user clicks Admin menu
  Then user logs out

@adduser
Scenario: Add user only if not exists and verify
  Given user is logged into OrangeHRM
  When user adds user if not exists
  Then user should see the user in system users list
  And user logs out
    
@PIMuser
Scenario: Verify employee exists fully or create new employee
  Given I am logged into OrangeHRM
  When I navigate to PIM employee list
  And I search employee by employee name "Deepan"
  Then I verify employee details or create new employee and logout

@UploadPhoto
Scenario: Upload profile photo for existing employee
  Given I login to OrangeHRM
  When I navigate to PIM page
  And I search employee by ID "EMP854820"
  And I edit the employee and upload profile photo
  Then I save the profile and logout

@claim
Scenario: Create and submit claim for employee if not exists
  Given I logged into OrangeHRM
  When I navigate to Claim page
  And I search employee by employee id for claim
  Then I create claim if employee exists otherwise logout immediately
  And I submit the created claim
  Then I logout from application after claim

@timesheet
Scenario: Create and submit timesheet for existing employee
  Given I log into OrangeHRM
  When I navigate to Employee Timesheets
  And I search employee by name "Orange Test"
  And I create and fill the timesheet
  Then the timesheet status should be submitted
  And I logout from the application
