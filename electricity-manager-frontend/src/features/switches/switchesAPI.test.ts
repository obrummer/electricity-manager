/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();
import { switchesApi } from './switchesAPI';
import {
  newSwitch,
  switchesResponse,
  switchToUpdate,
} from '../../utils/testData';
import { setupApiStore } from '../../utils/testUtils';
import { Indicators, SwitchPoint } from '../../types';
import { pricesApi } from '../prices/pricesAPI';

beforeEach((): void => {
  fetchMock.resetMocks();
});

describe('Get switches', () => {
  const storeRef = setupApiStore(switchesApi);
  fetchMock.mockResponse(JSON.stringify({}));

  it('request is correct', () => {
    return storeRef.store
      .dispatch<any>(switchesApi.endpoints.getSwitches.initiate(undefined))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const { method, url } = fetchMock.mock.calls[0][0] as Request;

        expect(method).toBe('GET');
        expect(url).toBe('/api/switches');
      });
  });
  it('successful response', () => {
    const storeRef = setupApiStore(switchesApi);
    fetchMock.mockResponse(JSON.stringify(switchesResponse));

    return storeRef.store
      .dispatch<any>(switchesApi.endpoints.getSwitches.initiate(undefined))
      .then(
        (action: { status: string; data: Indicators; isSuccess: boolean }) => {
          const { status, data, isSuccess } = action;
          expect(status).toBe('fulfilled');
          expect(isSuccess).toBe(true);
          expect(data).toStrictEqual(switchesResponse);
        },
      );
  });
  it('unsuccessful response', () => {
    const storeRef = setupApiStore(switchesApi);
    fetchMock.mockReject(new Error('Internal Server Error'));

    return storeRef.store
      .dispatch<any>(switchesApi.endpoints.getSwitches.initiate(undefined))
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

describe('Create Switch', () => {
  it('request is correct', () => {
    const storeRef = setupApiStore(switchesApi);
    fetchMock.mockResponse(JSON.stringify({}));
    return storeRef.store
      .dispatch<any>(switchesApi.endpoints.createSwitch.initiate(newSwitch))
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const request = fetchMock.mock.calls[0][0] as Request;
        const { method, url } = request;

        void request.json().then((data) => {
          expect(data).toStrictEqual(newSwitch);
        });

        expect(method).toBe('POST');
        expect(url).toBe('/api/switches');
      });
  });
  it('successful response', () => {
    const storeRef = setupApiStore(pricesApi);
    fetchMock.mockResponse(JSON.stringify(switchesResponse));

    return storeRef.store
      .dispatch<any>(switchesApi.endpoints.createSwitch.initiate(newSwitch))
      .then((action: { data: SwitchPoint }) => {
        const { data } = action;
        expect(data).toStrictEqual(switchesResponse);
      });
  });
  it('unsuccessful response', () => {
    const storeRef = setupApiStore(switchesApi);
    fetchMock.mockReject(new Error('Internal Server Error'));

    return storeRef.store
      .dispatch<any>(switchesApi.endpoints.createSwitch.initiate(newSwitch))
      .then((action: { error: { error: string; status: string } }) => {
        const {
          error: { error, status },
        } = action;

        expect(status).toBe('FETCH_ERROR');
        expect(error).toBe('Error: Internal Server Error');
      });
  });
});

describe('Edit Switch', () => {
  it('request is correct', () => {
    const storeRef = setupApiStore(switchesApi);
    fetchMock.mockResponse(JSON.stringify({}));

    return storeRef.store
      .dispatch<any>(
        switchesApi.endpoints.updateSwitch.initiate(switchToUpdate),
      )
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const request = fetchMock.mock.calls[0][0] as Request;
        const { method, url } = request;

        void request.json().then((data) => {
          expect(data).toStrictEqual(newSwitch);
        });

        expect(method).toBe('PUT');
        expect(url).toBe(`/api/switches/${switchToUpdate._id}`);
      });
  });
  test('successful response', () => {
    const storeRef = setupApiStore(pricesApi);
    fetchMock.mockResponse(JSON.stringify(switchesResponse));

    return storeRef.store
      .dispatch<any>(
        switchesApi.endpoints.updateSwitch.initiate(switchToUpdate),
      )
      .then((action: { data: SwitchPoint }) => {
        const { data } = action;
        expect(data).toStrictEqual(switchesResponse);
      });
  });
  it('unsuccessful response', () => {
    const storeRef = setupApiStore(switchesApi);
    fetchMock.mockReject(new Error('Internal Server Error'));

    return storeRef.store
      .dispatch<any>(
        switchesApi.endpoints.updateSwitch.initiate(switchToUpdate),
      )
      .then((action: { error: { error: string; status: string } }) => {
        const {
          error: { error, status },
        } = action;

        expect(status).toBe('FETCH_ERROR');
        expect(error).toBe('Error: Internal Server Error');
      });
  });
});

describe('Delete Switch', () => {
  it('request is correct', () => {
    const storeRef = setupApiStore(switchesApi);
    fetchMock.mockResponse(JSON.stringify({}));

    return storeRef.store
      .dispatch<any>(
        switchesApi.endpoints.deleteSwitch.initiate(switchToUpdate._id),
      )
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const request = fetchMock.mock.calls[0][0] as Request;
        const { method, url } = request;

        expect(method).toBe('DELETE');
        expect(url).toBe(`/api/switches/${switchToUpdate._id}`);
      });
  });

  it('unsuccessful response', () => {
    const storeRef = setupApiStore(switchesApi);
    fetchMock.mockReject(new Error('Internal Server Error'));

    return storeRef.store
      .dispatch<any>(
        switchesApi.endpoints.deleteSwitch.initiate(switchToUpdate._id),
      )
      .then((action: { error: { error: string; status: string } }) => {
        const {
          error: { error, status },
        } = action;

        expect(status).toBe('FETCH_ERROR');
        expect(error).toBe('Error: Internal Server Error');
      });
  });
});
