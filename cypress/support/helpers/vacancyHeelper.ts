import { vacancyPayload } from "../API/payload/vacancyPayload";
import VacanciesInit from "../init/vacancyInit";

export const URLs = {
    vacancies: `/web/index.php/api/v2/recruitment/vacancies`,
};

export default class Vacancies {
    elements = {
        pages: () => cy.get(".oxd-topbar-body-nav-tab"),
        addAttachmentBtn: () => cy.get(".orangehrm-attachment-header > button[type='button']"),
        fileInput: () => cy.get("input[type='file']"),
        saveBtn: () => cy.get("button[type='submit']"),
        attachmentsTableData: () => cy.get(".oxd-table-card > .oxd-table-row"),
        resultToast: () => cy.get(".oxd-toast")
    };

    addVacancy(vacancyData: vacancyPayload, employeeId: number) {
        return cy.addVacancy(
            URLs.vacancies,
            VacanciesInit.initVacancy(vacancyData, employeeId)
        );
    }

    addAttachmentWithAssertion(fileName: string) {
        this.elements.addAttachmentBtn().click();
        this.elements.fileInput().selectFile(`cypress/fixtures/${fileName}`, { force: true });
        this.elements.saveBtn().eq(1).click();

        this.elements.resultToast().should("exist");
        this.elements.attachmentsTableData().should("contain", fileName);
    }
}