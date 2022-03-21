import React from 'react';
import styled from 'styled-components';
import InvoiceTemplatePage from '../components/invoice-template';

const InvoiceTemplatePageRoute: React.FC<{}> = () => {
  return (
    <Container>
      <InvoiceTemplatePage />
    </Container>
  );
};

export default InvoiceTemplatePageRoute;

const Container = styled.div``;
