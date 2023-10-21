import { ICreateEmployeePayload } from "../API/payload/userAPIPayload";
import { ICreateEmployeeResponse } from "../API/response/userAPIResponse";
import { addCandidatePayload } from "../API/payload/candidateAPIPayload";
import { addCandidateResponse } from "../API/response/candidateAPIResponse";
import { addEmployeePayload } from "../API/payload/addEmployeePayload";
import { addEmployeeResponse } from "../API/response/addEmployeeResponse";
import { employeeLoginInfoPayload } from "../API/payload/employeeLoginInfoPayload";
import { employeeLoginInfoResponse } from "../API/response/employeeLoginInfoResponse";

declare global {
    namespace Cypress {
        interface Chainable {
            addNewUser: (requestUrl: string, employeePayload: ICreateEmployeePayload) => Chainable<ICreateEmployeeResponse>;
            addNewCandidate: (requestUrl: string, candidatePayload: addCandidatePayload) => Chainable<addCandidateResponse>;
            addEmployeePIM: (requestUrl: string, addEmployeePayload: addEmployeePayload) => Chainable<addEmployeeResponse>;
            addEmployeeLoginInfo: (requestUrl: string, employeeLoginInfoPayload: employeeLoginInfoPayload) => Chainable<employeeLoginInfoResponse>
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

Cypress.Commands.add('addEmployeePIM', (requestUrl: string, addEmployeePayload:addEmployeePayload) => {
    return cy.api({
        method: 'POST',
        url: requestUrl,
        body: addEmployeePayload,
        headers: {
            'Content-Type': 'application/json'
        }}
    ).its('body');
});

Cypress.Commands.add('addEmployeeLoginInfo', (requestUrl: string, employeeLoginInfoPayload:employeeLoginInfoPayload) => {
    return cy.api({
        method: 'POST',
        url: requestUrl,
        body: employeeLoginInfoPayload,
        headers: {
            'Content-Type': 'application/json'
        }}
    ).its('body');
});