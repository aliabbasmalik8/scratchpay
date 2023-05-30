import { IState } from './../../src/types/entitites';
import ClinicRepository from "../../src/clinic/clinic.repository";
import ClinicService from "../../src/clinic/clinic.service";
import { IClinic } from "../../src/types/entitites";

jest.mock('../../src/clinic/clinic.repository');

describe('ClinicService', () => {
  let clinicService: ClinicService;
  let mockClinicRepository: jest.Mocked<ClinicRepository>;

  beforeEach(() => {
    mockClinicRepository = new ClinicRepository() as any;
    clinicService = new ClinicService(mockClinicRepository);
  });

  it('should return all clinics if no filters are provided', async () => {
    const clinics = [{ name: 'Test Clinic', state: 'New York', availability: { to: "9:00", from: "10:00" } }];
    mockClinicRepository.getClinics.mockResolvedValue(clinics);

    const result = await clinicService.getClinics({});
    expect(result).toEqual(clinics);
  });

  it('should filter clinics by state', async () => {
    const clinics: IClinic[] = [
      { name: 'Test Clinic 1', state: 'New York', availability: { to: "9:00", from: "10:00" } },
      { name: 'Test Clinic 2', state: 'California', availability: { to: "9:00", from: "10:00" } }
    ];
    const states: IState[] = [
      { name: "California", abbreviation: "CA" }
    ]

    mockClinicRepository.getClinics.mockResolvedValue(clinics);
    mockClinicRepository.getStates.mockResolvedValue(states);

    const result = await clinicService.getClinics({ state: 'CA' });
    expect(result.length).toEqual(1);
  });
});
