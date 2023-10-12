import userInit from "../init/userInit"

export default class addUser {
    static addNewUserViaAPI() {
        cy.addNewUser('https://conduit.productionready.io/api/users', userInit.initUser());
    }
}