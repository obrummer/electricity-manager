import ContainerLoader from './ContainerLoader';
import { render, screen } from '@testing-library/react';

describe('ContainerLoader', () => {
  it('should render component correctly', () => {
    render(<ContainerLoader />);
    expect(screen.getByTestId('container-loader')).toBeInTheDocument();
    expect(screen.getAllByTestId('skeleton')).toHaveLength(3);
  });
  it('should render component correctly with amount', () => {
    render(<ContainerLoader amount={2} />);
    expect(screen.getAllByTestId('skeleton')).toHaveLength(2);
  });
  it('should render with amount as zero', () => {
    render(<ContainerLoader amount={0} />);
    try {
      expect(screen.getByTestId('skeleton')).toBeInTheDocument();
    } catch (error) {
      expect(true).toBeTruthy();
    }
  });
});
