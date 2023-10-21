import LogIn from "../e2eObjects/login";
import RoutePage from "../e2eObjects/AdminRoutePages";
import Candidates from "../../support/helpers/candidate";
import Finder from "../../support/helpers/searchAddedRow";

const login = new LogIn();
const sidebar = new RoutePage();
const candidate = new Candidates();
const find = new Finder();

describe("Table data check", () => {
    beforeEach(() => {
        // visit login page, logged in user and go to the recruitment page
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        login.passedLogin('Admin', 'admin123');
        sidebar.barPageNumber(5);
    });

    it("Should match table columns and response keys", () => {
        // bring data from fixture
        cy.fixture('candidateData').as('candidateInfo');

        cy.get('@candidateInfo').then((candidateData) => {
            // add candidate via API
            candidate.addCandidateViaAPI(candidateData.data).then((response: any) => {
                cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates');
                find.addedRow(response.data);
            });
        });
    });
});
