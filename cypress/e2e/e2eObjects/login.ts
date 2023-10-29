class LogIn {
    elements = {
        userNameField: () => cy.get('[placeholder="Username"]'),
        passwordField: () => cy.get('[placeholder="Password"]'),
        loginBtn: () => cy.get('[type="submit"]'),
        logoutList: () => cy.get('.oxd-userdropdown-tab'),
        logoutBtn: () => cy.get('.oxd-topbar-header-userarea > ul > li > ul > li:nth-child(4) > a')
    };

    passedLogin(username: string, password: string): void {
        this.elements.userNameField().type(username);
        this.elements.passwordField().type(password);
        this.elements.loginBtn().click();
    };

    logOutLoggedUser() {
        this.elements.logoutList().click();
        this.elements.logoutBtn().click();
        cy.clearCookies();
    }
}

export default LogIn;