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

    it('E2E adding candidate and attach resume file', () => {
        // bring data from fixture
        cy.fixture('candidateData').as('candidateInfo');

        cy.get('@candidateInfo').then((candidateData) => {
            // add candidate via API
            candidate.addCandidateViaAPI(candidateData.data).then((response: any) => {
                let id = response.data.id;
                
                candidate.visitCandidateByID(id);
                cy.wait(3000);
                candidate.attachFileToCandidate('../../fixtures/testPostman2.pdf');
                candidate.assertionAttached(id ,'testPostman2');
            });
        });
    });
});