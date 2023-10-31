import { vacancyPayload } from "../API/payload/vacancyPayload";

export default class Vacancies {
    static initVacancy(
        vacancyData: vacancyPayload,
        employeeId: number
    ): vacancyPayload {
        const payload = {
            ...vacancyData,
            "employeeId": employeeId,
        };
        return payload;
    }
}