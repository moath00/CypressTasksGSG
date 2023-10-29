import { addEmployeePayload } from "../API/payload/addEmployeePayload"

export default class employeeInit{
    static initEmployee(data: any): addEmployeePayload {
        return {
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            empPicture: '',
            employeeId: 270
        }
    }
}