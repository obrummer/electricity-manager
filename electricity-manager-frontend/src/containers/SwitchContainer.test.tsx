import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();
import { render, screen, waitFor } from '@testing-library/react';
import SwitchContainer from './SwitchContainer';
import { Provider } from 'react-redux';
import { setupApiStore } from '../utils/testUtils';
import { switchesApi } from '../features/switches/switchesAPI';

interface WrapperProps {
  children: React.ReactNode;
}

beforeEach((): void => {
  fetchMock.resetMocks();
});

const wrapper = ({ children }: WrapperProps) => {
  const storeRef = setupApiStore(switchesApi);
  return <Provider store={storeRef.store}>{children}</Provider>;
};

describe('SwitchContainer', () => {
  it('should render component correctly after load', async () => {
    fetchMock.mockResponse(JSON.stringify([]));
    render(<SwitchContainer />, { wrapper });
    await waitFor(() => {
      expect(screen.getByText(/Create/)).toBeInTheDocument();
    });
  });
  it('should render error message if fetching data fails', async () => {
    fetchMock.mockReject(new Error('Internal Server Error'));
    render(<SwitchContainer />, { wrapper });
    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
    });
  });
});
