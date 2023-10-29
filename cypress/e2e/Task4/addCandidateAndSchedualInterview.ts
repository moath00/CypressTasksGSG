import LogIn from "../e2eObjects/login";
import RoutePage from "../e2eObjects/AdminRoutePages";
import Candidates from "../../support/helpers/candidate";

const login = new LogIn();
const sidebar = new RoutePage();
const candidate = new Candidates();

describe('Adding candidate by API then apply for scheduled interview', () => {

    beforeEach(() => {
        // visit login page, logged in user and go to the recruitment page
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        login.passedLogin('Admin', 'admin123');
        sidebar.barPageNumber(5);
    });

    it('E2E adding candidate and schedule interview', () => {
        // bring data from fixture
        cy.fixture('candidateData').as('candidateInfo');

        cy.get('@candidateInfo').then((candidateData) => {
            // add candidate via API
            candidate.addCandidateViaAPI(candidateData.data).then((response: any) => {
                let id = response.data.id;

                // change candidate status to shortlisted using API
                cy.api({
                    method: 'PUT',
                    url: `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/${id}/shortlist`
                })

                // schedule an interview using UI
                cy.visit(`/web/index.php/recruitment/addCandidate/${id}`);
                candidate.addCandidatePage().acceptBTNs().click({ force: true });

                // fill the required fields
                candidate.scheduleInterviewPage().interviewTitle().type('Quality Assurance Interview');
                candidate.scheduleInterviewPage().interviewer().type('m');
                cy.wait(2000);
                candidate.scheduleInterviewPage().autocompleteOption().eq(0).click();
                candidate.scheduleInterviewPage().dateInput().type('2023-10-20');
                candidate.scheduleInterviewPage().saveBTN().click();

                // checking 'interview scheduled' status
                candidate.addCandidatePage().status().should('have.text', 'Status: Interview Scheduled')
            });
        });
    });
});