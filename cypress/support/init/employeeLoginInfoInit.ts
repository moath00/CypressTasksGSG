import { employeeLoginInfoPayload } from "../API/payload/employeeLoginInfoPayload"

export default class employeeLoginInfoInit{
    static initLoginInfo(data: any): employeeLoginInfoPayload {
        return {
            username: data.username,
            password: data.password,
            status: data.status,
            userRoleId: data.userRoleId,
            empNumber: 270
        }
    }
}