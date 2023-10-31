export interface applyLeavePayload {
    leaveTypeId: number;
    fromDate: string;
    toDate: string;
    comment: string;
    duration: {
        type: string;
    };
    partialOption: string;
}