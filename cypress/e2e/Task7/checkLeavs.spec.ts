import LogIn from "../e2eObjects/login";
import RoutePage from "../e2eObjects/AdminRoutePages";
import PIM from "../../support/helpers/PIMPage";
import Leave from "../../support/helpers/leaveHelper";
import Vacancies from "../../support/helpers/vacancyHeelper";

const logger = new LogIn();
const router = new RoutePage();
const PIMPage = new PIM();
const leaves = new Leave();
const vacancy = new Vacancies();
let uniqueID: number;
let entitlementID: number;
let userAppliedEntID: number;

describe("The leave should exist in the records table with status Scheduled", () => {
    it("Scenario 1 - Admin logged in and added user via API to have leave", () => {
        cy.fixture('loginData').as('log');
        cy.visit('web/index.php/auth/login');
        // admin login then create employee and employee login information
        cy.get('@log').then((log: any) => {
            logger.passedLogin(log.correctUsername, log.correctPassword);
            router.barPageNumber(2);
            // get employee data
            cy.fixture('employee').as('employeeInfo');
            cy.fixture('employeeLoginInfo').as('employeeLoginInfo');
            cy.fixture('leaveEntitlementInfo').as('entitlementInfo');
            cy.fixture('leaveInfo').as('leaveInfo');
            cy.fixture('actionOnLeaveRequestInfo').as('leaveAction');
            cy.fixture('leaveRequestInfo').as('leaveRequestInfo');

            cy.get('@employeeInfo').then((employeeInfo) => {
                cy.get('@employeeLoginInfo').then((employeeLoginInfo) => {
                    PIMPage.addEmployeeBtn().click();
                    PIMPage.createEmployeeViaAPI(employeeInfo).then((response: any) => {
                        uniqueID = response.data.empNumber;
                        PIMPage.createEmployeeViaAPIwithLoginInfo({ data: employeeLoginInfo, empNumber: uniqueID });
                    });
                });
            });

            // admin give the employee entitlement days for leaves
            router.openLeavePage();
            leaves.enterAddEntitlementPage();
            cy.get('@entitlementInfo').then((entitlementInfo: any) => {
                leaves.addLeaveEntitlement(entitlementInfo, uniqueID)
            })
                .then((response: any) => {
                    entitlementID = response.data.leaveType.id;
                });
            // admin logout then employee created login
            logger.logOutLoggedUser();
            // for new session
            logger.passedLogin(log.employeeUsername, log.employeePassword)
            // employee request(apply) leave
            router.barPageNumber(1);
            cy.get('@leaveRequestInfo').then((leaveRequestInfo: any) => {
                leaves.applyLeave(leaveRequestInfo, entitlementID)
            })
                .then((response: any) => {
                    userAppliedEntID = response.data.id;
                })
            // employee logout then admin login
            logger.logOutLoggedUser();
            logger.passedLogin(log.correctUsername, log.correctPassword)
            // admin approve the leave exists then logout
            cy.get('@leaveAction').then((leaveAction: any) => {
                leaves.actionOnLeaveRequest(leaveAction, userAppliedEntID)
            });
            logger.logOutLoggedUser();
            // 
            logger.passedLogin(log.employeeUsername, log.employeePassword);
            router.barPageNumber(1);
            cy.get('@leaveInfo').then((leaveInfo: any) => {
                leaves.assertLeaveApproved(leaveInfo[0]);
            });
        });
    });

    it("Scenario 2 - Add vacancies and attach file", () => {
        cy.visit('web/index.php/auth/login');
        logger.passedLogin("admin", "admin123");
        router.barPageNumber(5);
        cy.fixture('employee').as('employeeInfo');
        // Add an employee
        cy.get('@employeeInfo').then((employeeInfo) => {
            PIMPage.createEmployeeViaAPI(employeeInfo).then((employeeResponse) => { // Add a vacancy form fixture data
                return cy.fixture("vacancy").then((vacancyInfo) => {
                    vacancy.addVacancy(
                        vacancyInfo,
                        employeeResponse.data.empNumber
                    ).then((vacancyResponse) => { // Add xlsx file to the vacancy and assert in UI
                        cy.visit(
                            `/web/index.php/recruitment/addJobVacancy/${vacancyResponse.data.id}`
                        );
                        vacancy.addAttachmentWithAssertion("vacancy.xlsx");
                    })
                });
            })
        });
    });
});