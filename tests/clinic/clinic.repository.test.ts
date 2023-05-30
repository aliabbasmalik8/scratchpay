import ClinicRepository from "../../src/clinic/clinic.repository";

describe("ClinicRepository", () => {
    let clinicRepository: ClinicRepository;

    beforeEach(() => {
      clinicRepository = new ClinicRepository();
    });
  
    it('should return all clinics data', async () => {
      const result = await clinicRepository.getClinics();
      expect(result.length).toBeGreaterThan(0);
    });
})