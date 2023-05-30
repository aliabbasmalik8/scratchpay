import { IState } from './../types/entitites';
import { IKeyMaps } from './../types/common';
import { Service } from "typedi";
import { IClinic } from "../types/entitites";
import clinicsDataOne from "../data/clinics.json"
import clinicsDataTwo from "../data/clinics2.json"
import statesData from "../data/states.json";

@Service()
class ClinicRepository {
    public async getClinics(): Promise<IClinic[]> {
        const clinics = [...clinicsDataOne, ...clinicsDataTwo]
        return await this.parseClinicsData(clinics)
    }

    private async parseClinicsData(clinics: any[]): Promise<IClinic[]> {
        const parsedData: Partial<IClinic>[] = []

        clinics.forEach(clinic => {
            const parsedObject: Partial<IClinic> = {}
            Object.keys(clinic).forEach(key => {
                const desirableKey = this.getDataKey(key) as keyof IClinic;
                // @ts-ignore
                parsedObject[desirableKey] = clinic[key as keyof IClinic];
            })
            parsedData.push(parsedObject)
        })

        return parsedData as IClinic[];
    }

    private getDataKey(lookupKey: string): string {
        const keyMaps: IKeyMaps = {
            name: ["name", "clinicName"],
            state: ["state", "stateCode", "stateName"],
            availability: ["availability", "opening"]
        }
        let matchedKey = ""
        Object.keys(keyMaps).forEach(key => {
            if(keyMaps[key].includes(lookupKey)) matchedKey = key
        })
        return matchedKey
    }

    public async getStates(): Promise<IState[]> {
        return statesData as IState[];
    }
}

export default ClinicRepository