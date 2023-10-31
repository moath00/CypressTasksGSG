import LeaveInit from "../init/leaveInit";
import { addLeaveEntitlementPayload } from "../API/payload/addLeaveEntitlementPayload";
import { applyLeavePayload } from "../API/payload/applyLeavePayload";
import { actionOnLeaveRequestPayload } from "../API/payload/actionOnLeaveRequestPayload";

export const URLs = {
    leaveEntitlements: "/web/index.php/api/v2/leave/leave-entitlements",
    applyRequest: "/web/index.php/api/v2/leave/leave-requests",
    actionRequest: "/web/index.php/api/v2/leave/employees/leave-requests",
};

export default class Leave {
    addLeaveEntitlement(leaveEntitlementData: addLeaveEntitlementPayload, empNumber: number) {
        cy.addLeaveEntitlement(
            URLs.leaveEntitlements,
            LeaveInit.initLeaveEntitlement(leaveEntitlementData, empNumber)
        );
    }

    applyLeave(leaveRequestData: applyLeavePayload, leaveTypeId: number) {
        cy.applyLeave(
            URLs.applyRequest,
            LeaveInit.initLeaveRequest(leaveRequestData, leaveTypeId)
        );
    }

    actionOnLeaveRequest(action: actionOnLeaveRequestPayload, leaveRequestId: number) {
        cy.actionOnLeaveRequest(
            `${URLs.actionRequest}/${leaveRequestId}`,
            LeaveInit.initActionOnLeaveRequest(action)
        );
    }

    enterAddEntitlementPage() {
        cy.get('.oxd-topbar-body-nav-tab').eq(2).click();
        cy.get('.oxd-topbar-body-nav-tab.--parent > ul > li:nth-child(1) > a').click();
    }

    assertLeaveApproved(args: {}[]) {
        cy.get('oxd-table-card > .oxd-table-row').should('contain', args["Employee Name"]);
    }
}