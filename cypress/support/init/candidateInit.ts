import { addCandidatePayload } from "../API/payload/candidateAPIPayload"

export default class candidateInit{
    static initCandidate(data: any): addCandidatePayload {
        return {
            firstName: data.firstName,
            middleName: data.lastName,
            lastName: data.lastName,
            email: data.email,
            contactNumber: data.contactNumber,
            keywords: '',
            comment: '',
            dateOfApplication: "2023-10-14",
            consentToKeepData: false,
            vacancyId: data.vacancyId

        }
    }
}