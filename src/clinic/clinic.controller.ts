import ClinicService from './clinic.service';
import handleError from '../handleError';
import { Service } from 'typedi';

@Service()
class ClinicController {
    constructor(
        private readonly clinicService: ClinicService
    ) {}

    getClinics = handleError(async(req, res) => {    
        const clinics = await this.clinicService.getClinics(req.query)
        res.status(200).send(clinics)
    })
}

export default ClinicController;