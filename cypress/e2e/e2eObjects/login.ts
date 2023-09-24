class LogIn {
    elements = {
        userNameField: () => cy.get('[placeholder="Username"]'),
        passwordField: () => cy.get('[placeholder="Password"]'),
        loginBtn: () => cy.get('[type="submit"]')
    };

    passedLogin(username: string, password: string): void {
        this.elements.userNameField().type(username);
        this.elements.passwordField().type(password);
        this.elements.loginBtn().click();
    };
}

export default LogIn;