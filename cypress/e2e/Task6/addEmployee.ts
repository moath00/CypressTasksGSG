import LogIn from "../e2eObjects/login";
import RoutePage from "../e2eObjects/AdminRoutePages";
import PIM from "../../support/helpers/PIMPage";

const logger = new LogIn();
const router = new RoutePage();
const PIMPage = new PIM();

describe("Add user to the database and test if able to login", () => {

    before(() => {
        cy.visit('web/index.php/auth/login');
        logger.passedLogin("Admin", "admin123");
        cy.fixture('employee').as('employeeInfo');
        cy.fixture('employeeLoginInfo').as('employeeLoginInfo');
    });

    it("Admin logged in and added user via API", () => {
        router.barPageNumber(2);
        cy.get('@employeeInfo').then((employeeInfo) => {
            cy.get('@employeeLoginInfo').then((employeeLoginInfo) => {
                PIMPage.addEmployeeBtn().click();
                PIMPage.createEmployeeViaAPI(employeeInfo);
                PIMPage.createEmployeeViaAPIwithLoginInfo(employeeLoginInfo);
            });
        });
    });
});