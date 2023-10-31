export interface addLeaveEntitlementPayload {
    empNumber: number;
    leaveTypeId: number;
    fromDate: string;
    toDate: string;
    entitlement: string;
}