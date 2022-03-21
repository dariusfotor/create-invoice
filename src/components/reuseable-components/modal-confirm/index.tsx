import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SnackbarContext } from '../../snackbar-context';

interface Props {
  open: boolean;
  handleClose: () => void;
  label: string;
  deleteInvoice: () => Promise<void>;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalConfirm = (props: Props) => {
  const { handleOpenSnackBar } = React.useContext(SnackbarContext);
  const deleteInv = async () => {
    try {
      await props.deleteInvoice();
      props.handleClose();
    } catch (error) {
      handleOpenSnackBar('Klaida, bandykita dar kartą', 'error');
      return;
    }
  };

  return (
    <Modal
      keepMounted
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          {props.label}
        </Typography>
        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
          <Button onClick={props.handleClose}>Atšaukti</Button>
          <Button onClick={deleteInv}>Ištrinti</Button>
        </Typography>
      </Box>
    </Modal>
  );
};

export default ModalConfirm;
