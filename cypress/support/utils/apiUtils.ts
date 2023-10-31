import { ICreateEmployeePayload } from "../API/payload/userAPIPayload";
import { ICreateEmployeeResponse } from "../API/response/userAPIResponse";
import { addCandidatePayload } from "../API/payload/candidateAPIPayload";
import { addCandidateResponse } from "../API/response/candidateAPIResponse";
import { addEmployeePayload } from "../API/payload/addEmployeePayload";
import { addEmployeeResponse } from "../API/response/addEmployeeResponse";
import { employeeLoginInfoPayload } from "../API/payload/employeeLoginInfoPayload";
import { employeeLoginInfoResponse } from "../API/response/employeeLoginInfoResponse";
import { addLeaveEntitlementPayload } from "../API/payload/addLeaveEntitlementPayload";
import { addLeaveEntitlementResponse } from "../API/response/addLeaveEntitlementResponse";
import { applyLeavePayload } from "../API/payload/applyLeavePayload";
import { applyLeaveResponse } from "../API/response/applyLeaveResponse";
import { actionOnLeaveRequestPayload } from "../API/payload/actionOnLeaveRequestPayload";
import { actionOnLeaveRequestResponse } from "../API/response/actionOnLeaveRequestResponse";
import { vacancyPayload } from "../API/payload/vacancyPayload";
import { vacancyResponse } from "../API/response/vacancyResponse";

declare global {
    namespace Cypress {
        interface Chainable {
            addNewUser: (requestUrl: string, employeePayload: ICreateEmployeePayload) => Chainable<ICreateEmployeeResponse>;
            addNewCandidate: (requestUrl: string, candidatePayload: addCandidatePayload) => Chainable<addCandidateResponse>;
            addEmployeePIM: (requestUrl: string, addEmployeePayload: addEmployeePayload) => Chainable<addEmployeeResponse>;
            addEmployeeLoginInfo: (requestUrl: string, employeeLoginInfoPayload: employeeLoginInfoPayload) => Chainable<employeeLoginInfoResponse>;
            addLeaveEntitlement: (requestUrl: string, addLeaveEntitlementPayload: addLeaveEntitlementPayload) => Chainable<addLeaveEntitlementResponse>;
            applyLeave: (requestUrl: string, applyLeavePayload: applyLeavePayload) => Chainable<applyLeaveResponse>;
            actionOnLeaveRequest: (requestUrl: string, actionOnLeaveRequestPayload: actionOnLeaveRequestPayload) => Chainable<actionOnLeaveRequestResponse>;
            addVacancy: (requestUrl: string, vacancyPayload: vacancyPayload) => Chainable<vacancyResponse>;
        }
    }
}
Cypress.Commands.add('addNewUser', (requestUrl: string, userPayload: ICreateEmployeePayload) => {
    return cy.api({
        method: "POST",
        url: requestUrl,
        body: userPayload,
        headers: {
            "Content-Type": "application/json"
        }
    }).its('body')
});

Cypress.Commands.add('addNewCandidate', (requestUrl: string, candidatePayload: addCandidatePayload) => {
    return cy.api(
        {
            method: 'POST',
            url: requestUrl,
            body: candidatePayload,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).its('body');
});

Cypress.Commands.add('addEmployeePIM', (requestUrl: string, addEmployeePayload: addEmployeePayload) => {
    return cy.api({
        method: 'POST',
        url: requestUrl,
        body: addEmployeePayload,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    ).its('body');
});

Cypress.Commands.add('addEmployeeLoginInfo', (requestUrl: string, employeeLoginInfoPayload: employeeLoginInfoPayload) => {
    return cy.api({
        method: 'POST',
        url: requestUrl,
        body: employeeLoginInfoPayload,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    ).its('body');
});

Cypress.Commands.add("addLeaveEntitlement", (requestUrl: string, addLeaveEntitlementPayload: addLeaveEntitlementPayload) => {
    return cy.api({
        method: 'POST',
        url: requestUrl,
        body: addLeaveEntitlementPayload
    }).its('body')
});

Cypress.Commands.add("applyLeave", (requestUrl: string, applyLeavePayload: applyLeavePayload) => {
    return cy.api({
        method: 'POST',
        url: requestUrl,
        body: applyLeavePayload
    }).its('body');
});

Cypress.Commands.add("actionOnLeaveRequest", (requestUrl: string, actionOnLeaveRequestPayload: actionOnLeaveRequestPayload) => {
    cy.api({
        method: 'PUT',
        url: requestUrl,
        body: actionOnLeaveRequestPayload
    }).its('body');
});

Cypress.Commands.add("addVacancy", (requestUrl: string, vacancyPayload: vacancyPayload) => {
    return cy.api({
        method: 'POST',
        url: requestUrl,
        body: vacancyPayload
    }).its('body');
});