import React from 'react';
import styled from 'styled-components';
import InvoicesPage from '../components/invoices-table';

const InvoicesPageRoute: React.FC<{}> = () => {
  return (
    <Container>
      <InvoicesPage />
    </Container>
  );
};

export default InvoicesPageRoute;

const Container = styled.div``;
