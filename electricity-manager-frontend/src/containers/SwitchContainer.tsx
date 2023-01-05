import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@material-ui/icons/Add';
import {
  useGetSwitchesQuery,
  useCreateSwitchMutation,
  useUpdateSwitchMutation,
  useDeleteSwitchMutation,
} from '../features/switches/switchesAPI';
import SwitchDialog from '../components/SwitchDialog';
import ConfirmationDialog from '../components/ConfirmationDialog';
import SwitchTable from '../components/SwitchTable';
import { DialogMode } from '../types';
import { toast } from 'react-toastify';
import ContainerLoader from '../components/ContainerLoader';

function SwitchContainer() {
  const [open, setOpen] = useState(false);
  const [switchName, setSwitchName] = useState('');
  const [highLimit, setHighLImit] = useState<number>(50);
  const [dialogMode, setDialogMode] = useState<DialogMode>(DialogMode.create);
  const [activeId, setActiveId] = useState('');
  const [openConfirmation, setOpenConfirmation] = useState(false);

  // Use queries and mutations
  const { data, isLoading, isError } = useGetSwitchesQuery();
  const [
    createSwitch,
    {
      isLoading: isLoadingCreateSwitch,
      isSuccess: isSuccessCreateSwitch,
      isError: isErrorCreateSwitch,
    },
  ] = useCreateSwitchMutation();
  const [
    deleteSwitch,
    {
      isLoading: isLoadingDeleteSwitch,
      isSuccess: isSuccessDeleteSwitch,
      isError: isErrorDeleteSwitch,
    },
  ] = useDeleteSwitchMutation();
  const [
    updateSwitch,
    {
      isLoading: isLoadingEditSwitch,
      isSuccess: isSuccessEditSwitch,
      isError: isErrorEditSwitch,
    },
  ] = useUpdateSwitchMutation();

  // Handle success and error communication to user
  useEffect(() => {
    if (isSuccessCreateSwitch) {
      toast.success('Switch created successfully!');
    }
    if (isErrorCreateSwitch) {
      toast.error('Error, something went wrong.');
    }
  }, [isLoadingCreateSwitch]);

  useEffect(() => {
    if (isSuccessEditSwitch) {
      toast.success('Switch edited successfully!');
    }
    if (isErrorEditSwitch) {
      toast.error('Error, smomething went wrong.');
    }
  }, [isLoadingEditSwitch]);

  useEffect(() => {
    if (isSuccessDeleteSwitch) {
      toast.success('Switch deleted successfully!');
    }
    if (isErrorDeleteSwitch) {
      toast.error('Error, smomething went wrong.');
    }
  }, [isLoadingDeleteSwitch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSwitchName('');
    setHighLImit(0);
  };

  const closeConfirmation = () => {
    setOpenConfirmation(false);
  };

  // Stage and create switch
  const stageCreateSwitch = () => {
    handleClickOpen();
    setDialogMode(DialogMode.create);
  };

  const handleCreateSwitch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createSwitch({ name: switchName, highLimit: highLimit, isActive: true });
    setSwitchName('');
    setHighLImit(50);
    setOpen(false);
  };

  // Stage and edit switch
  const stageEditSwitch = (id: string) => {
    if (data) {
      const editableSwitch = data.find((item) => {
        return item._id === id;
      });
      if (editableSwitch) {
        setSwitchName(editableSwitch.name);
        setHighLImit(editableSwitch.highLimit);
        setActiveId(editableSwitch._id);
      }
    }
    handleClickOpen();
    setDialogMode(DialogMode.edit);
  };

  const handleEditSwitch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      _id: activeId,
      ...{ name: switchName, highLimit: highLimit, isActive: true },
    };
    updateSwitch(data);
    handleClose();
  };

  // Stage and delete switch
  const stageDeleteSwitch = (id: string) => {
    setActiveId(id);
    setOpenConfirmation(true);
  };

  const handleDeleteSwitch = () => {
    deleteSwitch(activeId);
    setOpenConfirmation(false);
  };

  // Check if switch name is unique
  const isSwitchNameUnique = (switchNameToCompare: string) => {
    if (data) {
      const filteredData = data.filter((item) => {
        return item._id !== activeId;
      });
      const switchNameExists = filteredData.find((item) => {
        return item.name === switchNameToCompare;
      });

      if (switchNameExists) {
        return true;
      }
    }
    return false;
  };

  const renderTable = () => {
    if (isLoading) {
      return <ContainerLoader />;
    }

    if (isError || !data) {
      return <div>Something went wrong</div>;
    }
    return (
      <>
        <SwitchTable
          data={data}
          stageEdit={stageEditSwitch}
          stageDelete={stageDeleteSwitch}
        />
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={stageCreateSwitch}
        >
          Create
        </Button>
      </>
    );
  };

  return (
    <>
      <ConfirmationDialog
        open={openConfirmation}
        handleClose={closeConfirmation}
        onSubmit={handleDeleteSwitch}
        header="Do you want to delete switch?"
        closeButtonText="Cancel"
        submitButtonText="Delete"
      />
      <SwitchDialog
        handleClose={handleClose}
        open={open}
        switchName={switchName}
        setSwitchName={setSwitchName}
        highLimit={highLimit}
        setHighLimit={setHighLImit}
        createSwitch={handleCreateSwitch}
        dialogMode={dialogMode}
        editSwitch={handleEditSwitch}
        nameValidator={isSwitchNameUnique}
      />
      {renderTable()}
    </>
  );
}

export default SwitchContainer;
