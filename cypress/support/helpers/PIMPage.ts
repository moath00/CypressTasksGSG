import employeeInit from "../init/employeeInit";
import employeeLoginInfoInit from "../init/employeeLoginInfoInit";

export const URLs={
    addEmployee: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees',
    employeeLoginInfo: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/users',
}

export default class PIM {
    createEmployeeViaAPI(data: any) {
        return cy.addEmployeePIM(URLs.addEmployee, employeeInit.initEmployee(data));
    }

    createEmployeeViaAPIwithLoginInfo(data: any) {
        const addEmployee = cy.addEmployeePIM(URLs.addEmployee, employeeInit.initEmployee(data));
        const loginInfo = cy.addEmployeeLoginInfo(URLs.employeeLoginInfo, employeeLoginInfoInit.initLoginInfo(data));
        return {
            addEmployee: addEmployee,
            loginInfo: loginInfo
        }
    }

    addEmployeeBtn() {
        return cy.get(':nth-child(3) > .oxd-topbar-body-nav-tab-item');
    }
}