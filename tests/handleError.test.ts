import { Request, Response, NextFunction } from 'express';
import handleError from '../src/handleError';

describe('handleError', () => {
  let mockReq: Request;
  let mockRes: Response;
  let mockNext: NextFunction;
  let mockCallback: jest.Mock;

  beforeEach(() => {
    mockReq = {} as Request;
    mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as unknown as Response;
    mockNext = jest.fn();
    mockCallback = jest.fn();
  });

  it('should call the callback and not handle any error when the callback does not throw', async () => {
    const wrappedCallback = handleError(mockCallback);

    await wrappedCallback(mockReq, mockRes, mockNext);

    expect(mockCallback).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.send).not.toHaveBeenCalled();
  });

  it('should handle validation errors correctly when the callback throws a validation error', async () => {
    const error = { name: 'ValidationError', errors: ['Test error'] };
    mockCallback.mockImplementationOnce(() => { throw error; });

    const wrappedCallback = handleError(mockCallback);

    await wrappedCallback(mockReq, mockRes, mockNext);

    expect(mockCallback).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith({ error: error.errors[0] });
  });

  it('should handle non-validation errors correctly when the callback throws a non-validation error', async () => {
    const error = new Error('Test error');
    mockCallback.mockImplementationOnce(() => { throw error; });

    const wrappedCallback = handleError(mockCallback);

    await wrappedCallback(mockReq, mockRes, mockNext);

    expect(mockCallback).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});
