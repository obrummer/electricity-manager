import { NextFunction, Request, Response } from 'express';
import {
  unKnownEndpoint,
  requestLogger,
  errorLogger,
  errorResponder,
  AppError,
} from './middleware';

let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;
const nextFunction: NextFunction = jest.fn();

beforeEach(() => {
  mockRequest = {};
  mockResponse = {
    status: jest.fn(),
    json: jest.fn(),
  };
});

describe('unKnownEndpoint', () => {
  it('gives right response', () => {
    const expectedResponse = {
      error: 'Unknown endpoint',
    };
    unKnownEndpoint(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(mockResponse.status).toBeCalledWith(400);
  });
});

describe('requestLogger', () => {
  it('logs the request', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    requestLogger(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );
    expect(consoleSpy).toBeCalled();
  });
  it('logs the request body', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    mockRequest = {
      body: { test: 'test' },
    };
    requestLogger(
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );
    expect(consoleSpy).toBeCalledWith('Body if any: ', { test: 'test' });
  });
});

describe('errorLogger', () => {
  it('logs the error', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const error = new Error('test error');
    errorLogger(
      error,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );
    expect(consoleSpy).toBeCalledWith(`error ${error.message}`);
  });
});

describe('errorResponder', () => {
  it('gives right response', () => {
    const expectedResponse = {
      error: 'test error',
    };
    const error = new Error('test error');
    errorResponder(
      error as AppError,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction,
    );
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(mockResponse.status).toBeCalledWith(400);
  });
});
