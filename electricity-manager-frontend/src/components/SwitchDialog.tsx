import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem } from '@mui/material';
import { DialogMode } from '../types';
import React from 'react';

interface SwitchDialogProps {
  handleClose: () => void;
  open: boolean;
  switchName: string;
  setSwitchName: (name: string) => void;
  highLimit: number;
  setHighLimit: (highLimit: number) => void;
  createSwitch: (e: React.FormEvent<HTMLFormElement>) => void;
  dialogMode: DialogMode;
  editSwitch: (e: React.FormEvent<HTMLFormElement>) => void;
  nameValidator: (name: string) => boolean;
}

function SwitchDialog({
  handleClose,
  open,
  switchName,
  setSwitchName,
  highLimit,
  setHighLimit,
  createSwitch,
  dialogMode,
  editSwitch,
  nameValidator,
}: SwitchDialogProps) {
  const highLimitValues = Array.from(Array(101).keys()).map((i) => ({
    value: i,
  }));
  const getMode = () => (dialogMode === DialogMode.create ? 'Create' : 'Edit');
  return (
    <div>
      <Dialog open={open} onClose={handleClose} data-testid="switch-dialog">
        <form
          onSubmit={
            dialogMode === DialogMode.create
              ? (e) => createSwitch(e)
              : (e) => editSwitch(e)
          }
        >
          <DialogTitle>{getMode()} switch</DialogTitle>
          <DialogContent>
            <TextField
              sx={{ m: 1 }}
              label="Name"
              name="switchName"
              id="switchName"
              required
              value={switchName}
              helperText={
                nameValidator(switchName) ? 'Name already exists' : ' '
              }
              error={nameValidator(switchName)}
              onChange={(e: { target: { value: string } }) =>
                setSwitchName(e.target.value)
              }
            />
            <TextField
              sx={{ m: 1, minWidth: 200 }}
              label="High Limit"
              type="number"
              name="highLimit"
              id="highLimit"
              value={highLimit}
              select
              onChange={(e) => setHighLimit(Number(e.target.value))}
              inputProps={{ type: 'number' }}
            >
              {highLimitValues.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="outlined"
              id="create-switch"
              type="submit"
              disabled={nameValidator(switchName)}
            >
              {getMode()}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default SwitchDialog;
