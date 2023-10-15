import { ICreateEmployeePayload } from "../API/payload/userAPIPayload";
import { ICreateEmployeeResponse } from "../API/response/userAPIResponse";
import { addCandidatePayload } from "../API/payload/candidateAPIPayload";
import { addCandidateResponse } from "../API/response/candidateAPIResponse";

declare global {
    namespace Cypress {
        interface Chainable {
            addNewUser: (requestUrl: string, employeePayload: ICreateEmployeePayload) => Chainable<ICreateEmployeeResponse>;
            addNewCandidate: (requestUrl: string, employeePayload: addCandidatePayload) => Chainable<addCandidateResponse>;
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