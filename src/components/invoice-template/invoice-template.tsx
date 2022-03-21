import React, { useEffect } from 'react';
import styled from 'styled-components';
import { InvoiceType } from '../../models/invoice';
import { getInvoiceByIdApi } from '../server/controller';
import { SnackbarContext } from '../snackbar-context';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ProductTable from './product-table';

const InvoiceTemplate = () => {
  const { handleOpenSnackBar } = React.useContext(SnackbarContext);
  const [invoice, setInvoice] = React.useState<InvoiceType>();

  const params = useParams();
  const getInvoice = React.useCallback(async () => {
    try {
      const response = await getInvoiceByIdApi(params.id ? +params.id : 0);
      setInvoice(response.data);
    } catch (error) {
      handleOpenSnackBar('Klaida, bandykite dar kartą', 'error');
    }
  }, [setInvoice, handleOpenSnackBar, params.id]);

  useEffect(() => {
    getInvoice();
  }, [getInvoice]);

  return (
    <Container>
      {invoice ? (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            '& > :not(style)': {
              m: 1,
              width: 800,
              height: '100%',
              padding: '35px',
            },
          }}
        >
          <Paper elevation={5}>
            <div className="title">
              <h2>PVM Sąskaita faktūra</h2>
              <h4>Serijos nr. {invoice?.id}</h4>
              <h4>{invoice?.createdAt}</h4>
            </div>
            <div className="supplier-client-info-container">
              <div className="supplier-column">
                <div className="supplier-name">Tiekėjas:</div>
                <div className="text">{invoice?.supplier}</div>
                <div className="text">{invoice?.supplierCountry.name}</div>
              </div>

              <div className="client-column">
                <div className="client-name">Klientas:</div>
                <div className="text">{invoice?.client}</div>
                <div className="text">{invoice?.clientCountry.name}</div>
              </div>
            </div>
            <div className="product-table">
              <ProductTable invoice={invoice} />
            </div>
          </Paper>
        </Box>
      ) : (
        <div style={{ textAlign: 'center' }}>Sąskaita nerasta</div>
      )}
    </Container>
  );
};

export default InvoiceTemplate;

const Container = styled.div`
  .title {
    text-align: center;
    margin-bottom: 60px;
  }
  .supplier-client-info-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .supplier-column,
  .client-column {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .supplier-name,
  .client-name {
    font-weight: 600;
  }
  .text {
    margin-top: 10px;
    width: 200px;
    border-bottom: 1px solid black;
    text-align: center;
  }
  .product-table {
    margin-top: 30px;
  }
`;
