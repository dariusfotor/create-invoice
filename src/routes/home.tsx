import React from 'react';
import styled from 'styled-components';
import HomePage from '../components/home-page';

const HomePageRoute: React.FC<{}> = () => {
  return (
    <Container>
      <HomePage />
    </Container>
  );
};

export default HomePageRoute;

const Container = styled.div`
  padding: 40px;
`;
