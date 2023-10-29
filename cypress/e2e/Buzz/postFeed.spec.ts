import LogIn from "../e2eObjects/login";
import RoutePage from "../e2eObjects/AdminRoutePages";

const logger = new LogIn();
const router = new RoutePage();

describe("Post a feed and assert that it is published", () => {
    beforeEach(() => {
        cy.visit('web/index.php/auth/login')
        logger.passedLogin("admin", "admin123");
        router.barPageNumber(12);
        cy.writeFile('../../fixtures/post.txt', "This is the post");
    });

    it("Post the feed and find the published", () => {
        cy.fixture('post.txt').then((data) => {
            cy.get('.oxd-buzz-post-input').type(data);
            cy.get('.oxd-buzz-post-slot > .oxd-button').click();
            cy.contains('.orangehrm-buzz-newsfeed-posts', data);
        });
    });
});