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
            interviewTitle: () => cy.get(':nth-child(2) > .oxd-grid-3 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input'),
            interviewer: () => cy.get('.oxd-autocomplete-text-input > input'),
            dateInput: () => cy.get('.oxd-date-input > .oxd-input'),
            saveBTN: () => cy.get('.oxd-button--secondary').contains('Save'),
            autocompleteOption: () => cy.get('.oxd-autocomplete-option'),
            selectOption: () => cy.get('.oxd-select-option')
        }
    }
};