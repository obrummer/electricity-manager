import { render, screen, fireEvent } from '@testing-library/react';
import SwitchDialog from './SwitchDialog';
import { DialogMode } from '../types';

const handleClose = jest.fn();
const switchName = 'test-switch';
const setSwitchName = jest.fn();
const highLimit = 50;
const setHighLimit = jest.fn();
const createSwitch = jest.fn().mockImplementation((e) => e.preventDefault());
const editSwitch = jest.fn().mockImplementation((e) => e.preventDefault());
const nameValidator = jest.fn();

describe('SwitchDialog component', () => {
  it('should render component correctly', () => {
    render(
      <SwitchDialog
        open={true}
        handleClose={handleClose}
        dialogMode={DialogMode.create}
        setSwitchName={setSwitchName}
        switchName={switchName}
        highLimit={highLimit}
        setHighLimit={setHighLimit}
        createSwitch={createSwitch}
        editSwitch={editSwitch}
        nameValidator={nameValidator}
      />,
    );
    expect(screen.getByTestId('switch-dialog')).toBeInTheDocument();
  });
  it('should render create mode correctly', () => {
    render(
      <SwitchDialog
        open={true}
        handleClose={handleClose}
        dialogMode={DialogMode.create}
        setSwitchName={setSwitchName}
        switchName={switchName}
        highLimit={highLimit}
        setHighLimit={setHighLimit}
        createSwitch={createSwitch}
        editSwitch={editSwitch}
        nameValidator={nameValidator}
      />,
    );
    expect(screen.getByText(/Create switch/)).toBeInTheDocument();
  });
  it('should call create click event when mode is create', () => {
    render(
      <SwitchDialog
        open={true}
        handleClose={handleClose}
        dialogMode={DialogMode.create}
        setSwitchName={setSwitchName}
        switchName={switchName}
        highLimit={highLimit}
        setHighLimit={setHighLimit}
        createSwitch={createSwitch}
        editSwitch={editSwitch}
        nameValidator={nameValidator}
      />,
    );
    fireEvent.submit(
      screen.getByRole('button', {
        name: /create/i,
      }),
    );

    expect(createSwitch).toHaveBeenCalledTimes(1);
  });
  it('should render create mode correctly', () => {
    render(
      <SwitchDialog
        open={true}
        handleClose={handleClose}
        dialogMode={DialogMode.create}
        setSwitchName={setSwitchName}
        switchName={switchName}
        highLimit={highLimit}
        setHighLimit={setHighLimit}
        createSwitch={createSwitch}
        editSwitch={editSwitch}
        nameValidator={nameValidator}
      />,
    );
    expect(screen.getByText(/Create switch/)).toBeInTheDocument();
  });
  it('should call edit click event when mode is edit', () => {
    render(
      <SwitchDialog
        open={true}
        handleClose={handleClose}
        dialogMode={DialogMode.edit}
        setSwitchName={setSwitchName}
        switchName={switchName}
        highLimit={highLimit}
        setHighLimit={setHighLimit}
        createSwitch={createSwitch}
        editSwitch={editSwitch}
        nameValidator={nameValidator}
      />,
    );
    fireEvent.submit(
      screen.getByRole('button', {
        name: /edit/i,
      }),
    );

    expect(editSwitch).toHaveBeenCalledTimes(1);
  });
  it('should call handleClose correctly', () => {
    render(
      <SwitchDialog
        open={true}
        handleClose={handleClose}
        dialogMode={DialogMode.edit}
        setSwitchName={setSwitchName}
        switchName={switchName}
        highLimit={highLimit}
        setHighLimit={setHighLimit}
        createSwitch={createSwitch}
        editSwitch={editSwitch}
        nameValidator={nameValidator}
      />,
    );
    fireEvent.click(
      screen.getByRole('button', {
        name: /cancel/i,
      }),
    );

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should have correct input values', () => {
    render(
      <SwitchDialog
        open={true}
        handleClose={handleClose}
        dialogMode={DialogMode.edit}
        setSwitchName={setSwitchName}
        switchName={switchName}
        highLimit={highLimit}
        setHighLimit={setHighLimit}
        createSwitch={createSwitch}
        editSwitch={editSwitch}
        nameValidator={nameValidator}
      />,
    );
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue(
      'test-switch',
    );
    expect(screen.getByText(/50/)).toBeInTheDocument();
  });
  // TODO test input value change
});
