import LogIn from "../e2eObjects/login";
import RoutePage from "../e2eObjects/AdminRoutePages";
import PIM from "../../support/helpers/PIMPage";

const logger = new LogIn();
const router = new RoutePage();
const PIMPage = new PIM();

describe("The leave should exist in the records table with status Scheduled", () => {
    it("Scenario 1 - Admin logged in and added user via API to have leave", () => {
        cy.visit('web/index.php/auth/login');
        // admin login then create employee and employee login information
        logger.passedLogin("admin", "admin123");
        router.barPageNumber(2);
        // get employee data
        cy.fixture('employee').as('employeeInfo');
        cy.fixture('employeeLoginInfo').as('employeeLoginInfo');
        cy.get('@employeeInfo').then((employeeInfo) => {
            cy.get('@employeeLoginInfo').then((employeeLoginInfo) => {
                PIMPage.addEmployeeBtn().click();
                PIMPage.createEmployeeViaAPIwithLoginInfo(employeeLoginInfo);
            });
        });

        // admin give the employee entitlement days for leaves
        router.barPageNumber(3);
        cy.get('.oxd-topbar-body-nav-tab').click();
        cy.get('.oxd-topbar-body-nav-tab.--parent > ul > li:nth-child(1) > a').click();
        cy.api({
            url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/leave-entitlements",
            method: 'POST',
            body: {
                empNumber: 270,
                entitlement: 60,
                leaveTypeId: 5,
                fromDate: "2023-11-7",
                toDate: "2023-11-15"
            }
        })
        // admin logout then employee created login
        logger.logOutLoggedUser();
        // for new session
        cy.clearCookies();
        logger.passedLogin("moath", "moath123")
        // employee request(apply) leave
        router.barPageNumber(1);
        cy.api({
            method: 'POST',
            url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/leave-requests",
            body: {
                leaveTypeId: 5,
                fromDate: "2023-11-7",
                toDate: "2023-11-14",
                comment: "",
                duration: {
                    type: 5,
                }
            }
        });
        // employee logout then admin login
        logger.logOutLoggedUser();
        cy.clearCookies();
        // admin approve the leave exists then logout
        cy.api({
            method: 'PUT',
            url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/leave/employees/leave-requests/5",
            body: {
                action: "APPROVE"
            }
        });
        logger.logOutLoggedUser();
        cy.clearCookies();
        // 
        logger.passedLogin("moath", "moath123");
        router.barPageNumber(1);
        cy.find(".selectorOfTheRows").contains("approve") // not appear in the website
    });

    it("Scenario 2", () => {
        cy.visit('web/index.php/auth/login');
        logger.passedLogin("admin", "admin123");
        router.barPageNumber(5);
        // oxd-topbar-body-nav-tab-item
        cy.get('.oxd-topbar-body-nav-tab-item').eq(1).click();
        // add vacancy
        // edit vacancy
        // attach file (select or attach method)
        // assert the file uploaded
    });
});