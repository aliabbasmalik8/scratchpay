import { Service } from "typedi";
import { IClinic } from "../types/entitites";
import ClinicRepository from "./clinic.repository";
import { getClinicSchema } from "./schemas/getClinic";

@Service()
class ClinicService {
    constructor(
        private readonly clinicRepo: ClinicRepository
    ) {}

    public async getClinics(filters: unknown): Promise<IClinic[]> {
        const { state, clinicName, from, to } = await getClinicSchema.validate(filters);
        let clinics = await this.clinicRepo.getClinics()
        const states = await this.clinicRepo.getStates()
        clinics = clinics.filter(clinic => {
            let isValidClinic = true
            if(state) {
                const foundState = states.find(st => 
                    st.abbreviation.toUpperCase() === state.toUpperCase() || 
                    st.name.toLowerCase() === state.toLowerCase()
                )
                isValidClinic = foundState ? (clinic.state.toLowerCase() === foundState.name.toLowerCase() || clinic.state.toLowerCase() === foundState.abbreviation.toLowerCase()) : false
            }
            if(clinicName && isValidClinic) isValidClinic = clinic.name.toLowerCase().includes(clinicName.toLowerCase())
            if(from && to && isValidClinic) {
                const fromHours = +from.split(":")[0]
                const toHours = +to.split(":")[0]
                const toMins = +to.split(":")[1]
                const clinicFromHours = +clinic.availability.from.split(":")[0]
                const clinicToHours = +clinic.availability.to.split(":")[0]
                const clinicToMins = +clinic.availability.to.split(":")[1]
                isValidClinic = (clinicFromHours >= fromHours && (clinicToHours <= toHours && clinicToMins <= toMins))   
            }
            else if(from && isValidClinic) {
                const hours = +from.split(":")[0]
                const mins = +from.split(":")[1]
                const clinicHours = +clinic.availability.from.split(":")[0]
                const clinicMins = +clinic.availability.from.split(":")[1]
                isValidClinic = (clinicHours === hours && clinicMins >= mins) ||  clinicHours >= hours
            }
            else if(to && isValidClinic) {
                const hours = +to.split(":")[0]
                const mins = +to.split(":")[1]
                const clinicHours = +clinic.availability.to.split(":")[0]
                const clinicMins = +clinic.availability.to.split(":")[1]
                isValidClinic = (clinicHours === hours && clinicMins <= mins) ||  clinicHours < hours
            }

            return isValidClinic
        })
        return clinics
    }
}

export default ClinicService