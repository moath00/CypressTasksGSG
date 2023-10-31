import { employeeLoginInfoPayload } from "../API/payload/employeeLoginInfoPayload"

export default class employeeLoginInfoInit{
    static initLoginInfo(data: any): employeeLoginInfoPayload {
        return {
            username: data.data.username,
            password: data.data.password,
            status: data.data.status,
            userRoleId: data.data.userRoleId,
            empNumber: data.empNumber
        }
    }
}