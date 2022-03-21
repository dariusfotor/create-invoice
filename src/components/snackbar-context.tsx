import { AlertColor } from '@mui/material/Alert';
import React from 'react';
import AlertSnackbar from './reuseable-components/snack-bar';

export const SnackbarContext = React.createContext<{
  handleOpenSnackBar: (message: string, type?: AlertColor) => void;
}>({ handleOpenSnackBar: () => {} });

const SnackbarProvider: React.FC = ({ children }) => {
  const [snackBar, setSnackBar] = React.useState<{
    type?: AlertColor;
    message: string;
    time?: number;
  } | null>(null);

  const handleCloseSnackBar = () => setSnackBar(null);

  const value = React.useMemo(
    () => ({
      handleOpenSnackBar: (message: string, type?: AlertColor) =>
        setSnackBar({
          message,
          type,
        }),
    }),
    [setSnackBar]
  );

  return (
    <SnackbarContext.Provider value={value}>
      {snackBar && (
        <AlertSnackbar
          open={true}
          handleClose={handleCloseSnackBar}
          hideDurationTime={snackBar.time}
          severityMode={snackBar.type}
          message={snackBar.message}
        ></AlertSnackbar>
      )}
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
