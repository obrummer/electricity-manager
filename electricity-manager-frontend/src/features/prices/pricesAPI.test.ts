/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();
import { pricesApi } from './pricesAPI';
import { indicatorResponse, pricesResponse } from '../../utils/testData';
import { setupApiStore } from '../../utils/testUtils';
import { Indicators, Price } from '../../types';

beforeEach((): void => {
  fetchMock.resetMocks();
});

describe('Get indicators', () => {
  const storeRef = setupApiStore(pricesApi);
  fetchMock.mockResponse(JSON.stringify({}));

  it('request is correct', () => {
    return storeRef.store
      .dispatch<any>(pricesApi.endpoints.getIndicators.initiate(undefined))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const { method, url } = fetchMock.mock.calls[0][0] as Request;

        expect(method).toBe('GET');
        expect(url).toBe('/api/indicators');
      });
  });
  it('successful response', () => {
    const storeRef = setupApiStore(pricesApi);
    fetchMock.mockResponse(JSON.stringify(indicatorResponse));

    return storeRef.store
      .dispatch<any>(pricesApi.endpoints.getIndicators.initiate(undefined))
      .then(
        (action: { status: string; data: Indicators; isSuccess: boolean }) => {
          const { status, data, isSuccess } = action;
          expect(status).toBe('fulfilled');
          expect(isSuccess).toBe(true);
          expect(data).toStrictEqual(indicatorResponse);
        },
      );
  });
  it('unsuccessful response', () => {
    const storeRef = setupApiStore(pricesApi);
    fetchMock.mockReject(new Error('Internal Server Error'));

    return storeRef.store
      .dispatch<any>(pricesApi.endpoints.getIndicators.initiate(undefined))
      .then(
        (action: {
          status: string;
          error: { error: string };
          isError: boolean;
        }) => {
          const {
            status,
            error: { error },
            isError,
          } = action;
          expect(status).toBe('rejected');
          expect(isError).toBe(true);
          expect(error).toBe('Error: Internal Server Error');
        },
      );
  });
});

describe('Get prices', () => {
  const storeRef = setupApiStore(pricesApi);
  fetchMock.mockResponse(JSON.stringify({}));

  it('request is correct', () => {
    return storeRef.store
      .dispatch<any>(pricesApi.endpoints.getPricesByDate.initiate({}))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const { method, url } = fetchMock.mock.calls[0][0] as Request;

        expect(method).toBe('GET');
        expect(url).toBe('/api/electricitypricebydate?');
      });
  });
  it('successful response', () => {
    const storeRef = setupApiStore(pricesApi);
    fetchMock.mockResponse(JSON.stringify(pricesResponse));

    return storeRef.store
      .dispatch<any>(pricesApi.endpoints.getPricesByDate.initiate({}))
      .then((action: { status: string; data: Price[]; isSuccess: boolean }) => {
        const { status, data, isSuccess } = action;
        expect(status).toBe('fulfilled');
        expect(isSuccess).toBe(true);
        expect(data).toStrictEqual(pricesResponse);
      });
  });
  it('unsuccessful response', () => {
    const storeRef = setupApiStore(pricesApi);
    fetchMock.mockReject(new Error('Internal Server Error'));

    return storeRef.store
      .dispatch<any>(pricesApi.endpoints.getPricesByDate.initiate({}))
      .then(
        (action: {
          status: string;
          error: { error: string };
          isError: boolean;
        }) => {
          const {
            status,
            error: { error },
            isError,
          } = action;
          expect(status).toBe('rejected');
          expect(isError).toBe(true);
          expect(error).toBe('Error: Internal Server Error');
        },
      );
  });
});
