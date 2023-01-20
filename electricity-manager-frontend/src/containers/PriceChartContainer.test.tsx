import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();
import { render, screen, waitFor } from '@testing-library/react';
import PriceChartContainer from './PriceChartContainer';
import { Provider } from 'react-redux';
import { setupApiStore } from '../utils/testUtils';
import { pricesApi } from '../features/prices/pricesAPI';
import { WrapperProps } from '../types';

beforeEach((): void => {
  fetchMock.resetMocks();
});

const wrapper = ({ children }: WrapperProps) => {
  const storeRef = setupApiStore(pricesApi);
  return <Provider store={storeRef.store}>{children}</Provider>;
};

describe('PriceChartContainer', () => {
  it('should render component after load', async () => {
    fetchMock.mockResponse(JSON.stringify([]));
    render(<PriceChartContainer />, { wrapper });
    await waitFor(() => {
      expect(screen.getByTestId('price-chart-container')).toBeInTheDocument();
    });
  });
  it('should render error message if fetching data fails', async () => {
    fetchMock.mockReject(new Error('Internal Server Error'));
    render(<PriceChartContainer />, { wrapper });
    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
    });
  });
});
