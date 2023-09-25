import LogIn from "../e2eObjects/login";
import RoutePage from "../e2eObjects/AdminRoutePages";
import addEmployee from "../e2eObjects/addEmployee";

const loggedIn = new LogIn();
const router = new RoutePage();
const addEmp = new addEmployee();

let gottenID:any;

describe("Employee's Table data validation - Add Employee", function() {
    // visit OrangeHRM
    beforeEach("Visit OrangeHRM login page", function() {
        cy.visit("web/index.php/auth/login");
    });

    it("System view the correct name for employee added", function() {
        // log in admin
        loggedIn.passedLogin("Admin", "admin123");
        // visit PIM page from the sidebar
        router.router(2);
        // click on add button to add employee
        cy.get('[data-v-10d463b7]').eq(2).click({ force: true });
        // gottenID = addEmp.addNewEmployeeWithoutLoginInfo("Moath", "M.", "Hjjawi");
        gottenID = addEmp.addNewEmployeeWithLoginInfo("Moath", "M.", "Hjjawi", "Moath2", "moath123");
        cy.contains('h6', "Moath Hjjawi");
        cy.get('.oxd-date-input-icon').eq(0).click({ force: true });
        cy.get('.oxd-calendar-date-wrapper').eq(25).click({ force: true });
        // oxd-calendar-date || selector for calendar days
        cy.get('.oxd-select-text--arrow').eq(0).click({ force: true });
        cy.get('.oxd-select-option').eq(2).click({ force: true});
        cy.get('[type="submit"]').eq(0).click({ force: true});

        cy.get('.oxd-topbar-body-nav-tab-item').eq(1).click();
        // cy.find('.oxd-table-row').contains(gottenID);
        cy.request({
            method: "GET",
            url: `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&employeeId=0301&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC`,
            }).then((response) => {
                console.log(response);
            // Assert that the response status code is 200
            expect(response.status).to.equal(200);
            // const recordExists = response.body.some((record:any) => {
            //     return record.id === gottenID;
            //   });
              expect(response.body.data[0]).exist;
        });

    });

});