import LogIn from "../e2eObjects/login";
import RoutePage from "../e2eObjects/AdminRoutePages";
import addEmployee from "../e2eObjects/addEmployee";

const loggedIn = new LogIn();
const router = new RoutePage();
const addEmp = new addEmployee();

let id:any;

describe("Employee's Table data validation - Add Employee", function() {
    // visit OrangeHRM
    beforeEach("Visit OrangeHRM login page", function() {
        cy.visit("web/index.php/auth/login");
        cy.wait(2000);
    });
    // Test case #1
    it("Admin should be able to login correctly - correct username and password", function() {
        loggedIn.passedLogin("Admin", "admin123");
    });

    it("Admin should be able to visit PIM page in sidebar", function() {
        loggedIn.passedLogin("Admin", "admin123");
        router.router(2);
        
    });

    it("Admin should be able to add new employee", function() {
        loggedIn.passedLogin("Admin", "admin123");
        router.router(2);
        cy.get('[data-v-10d463b7]').eq(2).click({ force: true });
        // addEmp.addNewEmployeeWithoutLoginInfo("Moath", "M.", "Hjjawi");
        addEmp.addNewEmployeeWithLoginInfo("Moath", "M.", "Hjjawi", "Moath", "moath123");
    });

    it.only("System view the correct name for employee added", function() {
        loggedIn.passedLogin("Admin", "admin123");
        cy.wait(2000);
        router.router(2);
        cy.wait(2000);
        cy.get('[data-v-10d463b7]').eq(2).click({ force: true });
        cy.wait(2000);
        // addEmp.addNewEmployeeWithoutLoginInfo("Moath", "M.", "Hjjawi");
        cy.url().then( (url) => {
            id = url.split("/")[url.length - 1];
            console.log(id);
        });
        addEmp.addNewEmployeeWithLoginInfo("Moath1", "M.", "Hjjawi1", "Moath", "moath123");
        cy.contains('h6', "Moath1 Hjjawi1");
        cy.get('.oxd-date-input-icon').eq(0).click();
        cy.get('oxd-calendar-date-wrapper').eq(15).click();
        cy.get('oxd-select-text--arrow').eq(0).click();
        cy.get('.oxd-select-option').eq(2).click();
        cy.get('[type="submit"]').eq(0).check();

        cy.find('')
    });

});