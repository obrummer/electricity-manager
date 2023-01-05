import { render, screen } from '@testing-library/react';
import Copyright from './Copyright';

describe('Copyright component', () => {
  it('should render Copyright component correctly', () => {
    render(<Copyright />);
    expect(screen.getByText(/Copyright © Olli Brummer/)).toBeInTheDocument();
    expect(screen.getByText(/20/i)).toBeInTheDocument();
  });
});
