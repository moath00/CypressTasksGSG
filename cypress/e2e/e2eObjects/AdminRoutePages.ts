class RoutePage {
    elements = {
        pages: () => cy.get('.oxd-main-menu-item-wrapper')
    };

    barPageNumber(page: number): void {
        this.elements.pages().eq(page-1).click();
    }

    openLeavePage() {
        cy.intercept("/web/index.php/api/v2/leave/leave-requests**").as(
          "leaveRequests"
        );
        cy.intercept("/web/index.php/api/v2/leave/leave-periods**").as(
          "leavePeriods"
        );
        cy.intercept("/web/index.php/api/v2/leave/leave-types/eligible**").as(
          "leaveTypes"
        );
        cy.intercept("/web/index.php/api/v2/leave/workweek**").as("workweek");
        cy.intercept("/web/index.php/api/v2/leave/holidays**").as("holidays");
        cy.visit("/web/index.php/leave/viewMyLeaveList");
        cy.wait([
          "@leaveRequests",
          "@leavePeriods",
          "@leaveTypes",
          "@workweek",
          "@holidays",
        ]);
      }
}

export default RoutePage;