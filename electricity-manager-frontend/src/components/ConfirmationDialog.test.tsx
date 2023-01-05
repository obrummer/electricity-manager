import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmationDialog from './ConfirmationDialog';

const handleClose = jest.fn();
const onSubmit = jest.fn();
const header = 'Do you want to confirm?';
const closeButtonText = 'Cancel';
const submitButtonText = 'Confirm';

describe('ConfirmationDialog component', () => {
  it('should render component correctly', () => {
    render(
      <ConfirmationDialog
        open={true}
        handleClose={handleClose}
        onSubmit={onSubmit}
      />,
    );
    expect(screen.getByTestId('confirmation-dialog')).toBeInTheDocument();
  });
  it('should render component props correctly', () => {
    render(
      <ConfirmationDialog
        open={true}
        handleClose={handleClose}
        onSubmit={onSubmit}
        header={header}
        closeButtonText={closeButtonText}
        submitButtonText={submitButtonText}
      />,
    );
    expect(screen.getByText(/Do you want to confirm?/i)).toBeInTheDocument();
    expect(screen.getByText(closeButtonText)).toBeInTheDocument();
    expect(screen.getByText(submitButtonText)).toBeInTheDocument();
  });
  it('dialog click events are been called correctly', () => {
    render(
      <ConfirmationDialog
        open={true}
        handleClose={handleClose}
        onSubmit={onSubmit}
        header={header}
        closeButtonText={closeButtonText}
        submitButtonText={submitButtonText}
      />,
    );
    fireEvent.click(screen.getByText(closeButtonText));
    expect(handleClose).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByText(submitButtonText));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
