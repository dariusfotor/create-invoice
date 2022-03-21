import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import { InvoiceType } from '../../models/invoice';

interface Props {
  invoice: InvoiceType;
}

const ProductTable = (props: Props) => {
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Produktas</TableCell>
              <TableCell align="center">Kiekis</TableCell>
              <TableCell align="center">PVM</TableCell>
              <TableCell align="center">Mokėtina suma</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{props.invoice.product}</TableCell>
              <TableCell align="center">{props.invoice.quantity}</TableCell>
              <TableCell align="center">
                {props.invoice.vat + ' ' + '%'}
              </TableCell>
              <TableCell align="center">{props.invoice.tax}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ProductTable;

const Container = styled.div``;
