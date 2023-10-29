export default class TimePage {
    elements = {
        editBtn: () => cy.get('.oxd-button--ghost'),
        submitBtn: () => cy.get('.oxd-button--secondary'),
        projectField: () => cy.get('[placeholder="Type for hints..."]'),
        projectOptions: () => cy.get('.oxd-autocomplete-option'),
        activityField: () => cy.get('.bi-caret-down-fill'),
        activityItems: () => cy.get('role="option"'),
        hoursBerDayArray: () => cy.get('.oxd-input'),
        saveBtn: () => cy.get('[type="submit"]')
    }

    addTimeSheet() {
        // opensource-demo.orangehrmlive.com/web/index.php/api/v2/time/timesheets/default - time sheet api
        this.elements.editBtn().click({ force: true });
        this.elements.projectField().type('tr');
        this.elements.projectOptions().click({ force: true });
        this.elements.activityField().click({ force: true });
        this.elements.activityItems().click({ force: true });
        for (let i = 0; i < 7; i++) {
            this.elements.hoursBerDayArray().eq(i).type(`${1 + i}`);
        }
        this.elements.saveBtn().click();
    }

    assertRecord(employeeName: string) {
        cy.contains('[role="table"]', employeeName);
    }
}