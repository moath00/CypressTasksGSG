import LogIn from "../e2eObjects/login";
import RoutePage from "../e2eObjects/AdminRoutePages";
import PIM from "../../support/helpers/PIMPage";
import TimePage from "../../support/helpers/addTimeUI";

const logger = new LogIn();
const router = new RoutePage();
const PIMPage = new PIM();
const TimePageUI = new TimePage();

describe("Employee add time sheet and admin check it", () => {
    before(() => {
        cy.visit('web/index.php/auth/login');
        
        logger.passedLogin("admin", "admin123");
        router.barPageNumber(2);

        // get employee data
        cy.fixture('employeeLoginInfo').as('employeeLoginInfo');
        cy.get('@employeeLoginInfo').then((employeeLoginInfo) => {
            PIMPage.addEmployeeBtn().click();
            PIMPage.createEmployeeViaAPIwithLoginInfo(employeeLoginInfo);
        });

        logger.logOutLoggedUser();

        logger.passedLogin("Moath", "moath123");

        router.barPageNumber(2);
    })
    it("Employee add time sheet and admin check it", () => {
        TimePageUI.addTimeSheet();

        logger.logOutLoggedUser();

        logger.passedLogin("admin", "admin123");
        router.barPageNumber(4);

        TimePageUI.assertRecord("Moath M. Hjjawi");
    });
})