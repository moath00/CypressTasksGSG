class addEmployee {
    elements={
        AddEmp: () => cy.get('.oxd-button--secondary'),
        // EmployeeInputName: () => cy.get('.--name-grouped-field'),
        saveNewEmp: () => cy.get('button[type="submit"]'),
        addLoginDetailsBtn: () => cy.get('.oxd-switch-input').click({ force: true }),
        loginDetailsFields: () => cy.get('.oxd-input')
    }
    

    addNewEmployeeWithoutLoginInfo(firstName:string, MiddleName:string, LastName:string){
        this.elements.loginDetailsFields().eq(1).type(firstName);
        this.elements.loginDetailsFields().eq(2).type(MiddleName);
        this.elements.loginDetailsFields().eq(3).type(LastName);
        this.elements.AddEmp().click();
    }

    addNewEmployeeWithLoginInfo(firstName:string, MiddleName:string, LastName:string, Username:string, Password:string){
        this.elements.loginDetailsFields().eq(1).type(firstName);
        this.elements.loginDetailsFields().eq(2).type(MiddleName);
        this.elements.loginDetailsFields().eq(3).type(LastName);
        this.elements.addLoginDetailsBtn();
        this.elements.loginDetailsFields().eq(5).type(Username);
        this.elements.loginDetailsFields().eq(6).type(Password, {force:true});
        this.elements.loginDetailsFields().eq(7).type(Password, {force:true});
        this.elements.AddEmp().click();
    }

}
export default addEmployee;