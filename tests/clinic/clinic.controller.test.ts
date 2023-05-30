import { Request, Response } from 'express'
import ClinicController from '../../src/clinic/clinic.controller'
import ClinicRepository from '../../src/clinic/clinic.repository'
import ClinicService from '../../src/clinic/clinic.service'

jest.mock('../../src/clinic/clinic.service')

describe('ClinicController', () => {
  let clinicController: ClinicController
  let mockClinicService: jest.Mocked<ClinicService>

  beforeEach(() => {
    const mockClinicRepository = {} as ClinicRepository
    mockClinicService = new ClinicService(mockClinicRepository) as jest.Mocked<ClinicService>;
    clinicController = new ClinicController(mockClinicService)
  });

  it('should get clinics and send them in the response', async () => {
    const clinics = [{ id: 1, name: 'Test Clinic', state: 'NY', availability: { to: "9:00", from: "10:00" } }]
    mockClinicService.getClinics.mockResolvedValue(clinics)

    const mockReq = {
      query: { state: 'NY' }
    } as unknown as Request;
    
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as unknown as Response;

    const mockNext = jest.fn()

    await clinicController.getClinics(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith(clinics);
  });

  it('should pass req.query to clinicService.getClinics', async () => {
    const clinics = [{ id: 1, name: 'Test Clinic', state: 'NY', availability: { to: "9:00", from: "10:00" } }];  // Replace with real clinic objects
    jest.spyOn(mockClinicService, 'getClinics').mockResolvedValue(clinics);

    const query = { state: 'NY' };
    const mockReq = {
      query: query
    } as unknown as Request;
    
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as unknown as Response;

    const mockNext = jest.fn()

    await clinicController.getClinics(mockReq, mockRes, mockNext);

    // Check that getClinics was called with req.query
    expect(mockClinicService.getClinics).toHaveBeenCalledWith(query);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith(clinics);
  });
});
