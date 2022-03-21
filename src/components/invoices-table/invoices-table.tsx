import React, { useEffect } from 'react';
import { ClientPerson, InvoiceType } from '../../models/invoice';
import {
  deleteInvoiceApi,
  getInvoicesApi,
  updateInvoiceApi,
} from '../server/controller';
import { SnackbarContext } from '../snackbar-context';
import ModalConfirm from '../reuseable-components/modal-confirm';
import { generatePath, useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { ROUTES } from '../../routes';
import styled from 'styled-components';

const InvoicesTable = () => {
  const { handleOpenSnackBar } = React.useContext(SnackbarContext);
  const [invoices, setInvoices] = React.useState<InvoiceType[]>();
  const [openModal, setOpenModal] = React.useState(false);
  const [rowId, setRowId] = React.useState<number>(0);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const navigate = useNavigate();

  useEffect(() => {
    getInvoices();
  }, []);

  const getInvoices = async () => {
    try {
      const response = await getInvoicesApi();
      setInvoices(response.data);
    } catch (error) {
      handleOpenSnackBar('Klaida, bandykite dar kartą', 'error');
    }
  };

  const deleteInv = async (id: number) => {
    try {
      await deleteInvoiceApi(id);
      const updatedArr = invoices?.filter((inv) => inv.id !== id);
      setInvoices(updatedArr);
      handleOpenSnackBar('Sėkmingai ištrinta');
    } catch (error) {
      handleOpenSnackBar('Klaida, bandykite dar kartą', 'error');
    }
  };

  const updateInv = async (id: number, row: InvoiceType) => {
    try {
      await updateInvoiceApi(id, row);
    } catch (error) {
      handleOpenSnackBar('Klaida, bandykite dar kartą', 'error');
    }
  };

  const clickOnOpenModal = (id: number) => {
    setRowId(id);
    handleOpen();
  };

  const openInvoice = async (row: InvoiceType) => {
    if (row.notTouched) {
      row.notTouched = false;
      await updateInv(row.id, row);
      if (invoices?.length) {
        const index = invoices.indexOf(row);
        const newArr = invoices.splice(index, 1, row);
        setInvoices(newArr);
      }
    }
    const url = generatePath(ROUTES.InvoiceTemplate, { id: row.id.toString() });
    window.open(url);
  };

  return (
    <Container>
      {invoices ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">Data</TableCell>
                <TableCell align="center">Sąskaitos fak. nr.</TableCell>
                <TableCell align="center">Tiekėjas</TableCell>
                <TableCell align="center">Tiekėjo šalis</TableCell>
                <TableCell align="center">Tiekėjas PVM mokėtojas</TableCell>
                <TableCell align="center">Klientas</TableCell>
                <TableCell align="center">Kliento šalis</TableCell>
                <TableCell align="center">Klientas kaip asmuo</TableCell>
                <TableCell align="center">Klientas PVM mokėtojas</TableCell>
                <TableCell align="center">PVM</TableCell>
                <TableCell align="center">Mokestis</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    {row.notTouched ? (
                      <span className="not-touched">Neperžiūrėta</span>
                    ) : (
                      ''
                    )}
                    <Button variant="text" onClick={() => openInvoice(row)}>
                      <ZoomInIcon />
                    </Button>
                  </TableCell>
                  <TableCell align="center">{row.createdAt}</TableCell>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.supplier}</TableCell>
                  <TableCell align="center">
                    {row.supplierCountry?.name}
                  </TableCell>
                  <TableCell align="center">
                    {row.isSupplierVatPayer ? 'Taip' : 'Ne'}
                  </TableCell>
                  <TableCell align="center">{row.client}</TableCell>
                  <TableCell align="center">
                    {row.clientCountry?.name}
                  </TableCell>
                  <TableCell align="center">
                    {row.clientPerson === ClientPerson.JURIDICAL
                      ? 'Juridinis'
                      : 'Fizinis'}
                  </TableCell>
                  <TableCell align="center">
                    {row.isClientVatPayer ? 'Taip' : 'Ne'}
                  </TableCell>
                  <TableCell align="center">{row.vat + ' ' + '%'}</TableCell>
                  <TableCell align="center">{row.tax}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="text"
                      onClick={() => clickOnOpenModal(row.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ModalConfirm
            open={openModal}
            label={`Ar tikrai norite ištrinti sąskaitą faktūrą nr. ${rowId} ?`}
            handleClose={handleClose}
            deleteInvoice={() => deleteInv(rowId)}
          />
        </TableContainer>
      ) : (
        <div style={{ textAlign: 'center' }}>Šiuo metu įrašų nėra</div>
      )}
    </Container>
  );
};

export default InvoicesTable;

const Container = styled.div`
  .not-touched {
    color: red;
  }
`;
