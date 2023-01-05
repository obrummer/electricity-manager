import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

interface ConfirmationDialogProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: () => void;
  header?: string;
  closeButtonText?: string;
  submitButtonText?: string;
}

function ConfirmationDialog({
  open,
  handleClose,
  onSubmit,
  header,
  closeButtonText,
  submitButtonText,
}: ConfirmationDialogProps) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        data-testid="confirmation-dialog"
      >
        <DialogTitle id="alert-dialog-title">{header ?? ''}</DialogTitle>
        <DialogActions>
          <Button id="alert-close" variant="outlined" onClick={handleClose}>
            {closeButtonText ?? ''}
          </Button>
          <Button
            id="alert-confirm"
            variant="outlined"
            onClick={onSubmit}
            autoFocus
          >
            {submitButtonText ?? ''}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmationDialog;
