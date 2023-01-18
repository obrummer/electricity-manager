import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();
import { render, screen, waitFor } from '@testing-library/react';
import IndicatorContainer from './IndicatorContainer';
import { Provider } from 'react-redux';
import { setupApiStore } from '../utils/testUtils';
import { pricesApi } from '../features/prices/pricesAPI';
import { indicatorResponse } from '../utils/testData';

interface WrapperProps {
  children: React.ReactNode;
}

beforeEach((): void => {
  fetchMock.resetMocks();
});

const wrapper = ({ children }: WrapperProps) => {
  const storeRef = setupApiStore(pricesApi);
  return <Provider store={storeRef.store}>{children}</Provider>;
};

describe('IndicatorContainer', () => {
  it('should render component correctly before and after load', async () => {
    fetchMock.mockResponse(JSON.stringify([indicatorResponse]));
    render(<IndicatorContainer />, { wrapper });
    expect(screen.getByText(/Indicators/)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId('indicator-container')).toBeInTheDocument();
      expect(screen.getByText(/Average price today/)).toBeInTheDocument();
    });
  });
  it('should render error message if fetching data fails', async () => {
    fetchMock.mockReject(new Error('Internal Server Error'));
    render(<IndicatorContainer />, { wrapper });
    await waitFor(() => {
      expect(screen.getByText(/Indicators/)).toBeInTheDocument();
      expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
    });
  });
});
