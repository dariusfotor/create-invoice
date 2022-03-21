import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';

interface Props {
  severityMode?: AlertColor;
  message: string;
  hideDurationTime?: number;
  handleClose: () => void;
  open: boolean;
}

const AlertSnackbar = (props: Props) => {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={props.hideDurationTime || 3000}
      onClose={props.handleClose}
      message="Note archived"
    >
      <Alert severity={props.severityMode} sx={{ width: '100%' }}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
