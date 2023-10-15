import candidateInit from "../init/candidateInit";

export const URLs = {
    candidates: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates'
}

export default class Candidates {
    addCandidateViaAPI(data: any) {
        return cy.addNewCandidate(URLs.candidates, candidateInit.initCandidate(data));
    }

    addCandidatePage() {
        return {
            acceptBTNs: () => cy.get('.oxd-button--success'),
            rejectBTN: () => cy.get('.oxd-button--danger'),
            status: () => cy.get('.orangehrm-recruitment-status > .oxd-text')
        }
    };

    scheduleInterviewPage() {
        return {
            interviewTitle: () => cy.get('.oxd-input').eq(5),
            interviewer: () => cy.get('[include-employees="onlyCurrent"]'),
            dateInput: () => cy.get('.oxd-input').eq(6),
            saveBTN: () => cy.get('.oxd-button--secondary').contains('Save'),
            autocompleteOption: () => cy.get('.oxd-autocomplete-option'),
            selectOption: () => cy.get('.oxd-select-option')
        }
    }
};