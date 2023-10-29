class RoutePage {
    elements = {
        pages: () => cy.get('.oxd-main-menu-item-wrapper')
    };

    barPageNumber(page: number): void {
        this.elements.pages().eq(page-1).click();
    }
}

export default RoutePage;