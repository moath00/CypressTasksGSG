import { actionOnLeaveRequestPayload } from "../API/payload/actionOnLeaveRequestPayload";
import { addLeaveEntitlementPayload } from "../API/payload/addLeaveEntitlementPayload";
import { applyLeavePayload } from "../API/payload/applyLeavePayload";

export default class LeaveInit {
    static initLeaveEntitlement(leaveEntitlementData: addLeaveEntitlementPayload, empNumber: number): addLeaveEntitlementPayload {
        const payload = {
            ...leaveEntitlementData,
            empNumber,
        };
        return payload;
    }

    static initLeaveRequest(leaveRequestData: applyLeavePayload, leaveTypeId: number): applyLeavePayload {
        const payload = {
            ...leaveRequestData,
            leaveTypeId,
        };
        return payload;
    }

    static initActionOnLeaveRequest(actionData: actionOnLeaveRequestPayload): actionOnLeaveRequestPayload {
        const payload = {
            ...actionData,
        };
        return payload;
    }
}