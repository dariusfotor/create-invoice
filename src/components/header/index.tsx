import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../routes';

const Header = () => {
  return (
    <Container>
      <StyledLink
        to={ROUTES.HomePage}
        className={({ isActive }) => (isActive ? 'active' : 'inactive')}
      >
        Pildymo forma
      </StyledLink>
      <StyledLink
        to={ROUTES.InvoicesPage}
        className={({ isActive }) => (isActive ? 'active' : 'inactive')}
      >
        Sąskaitos faktūros
      </StyledLink>
    </Container>
  );
};

export default Header;

const StyledLink = styled(NavLink)`
  margin: 0 20px;
  text-decoration: none;
  color: white;

  &.active {
    border: 1px solid white;
    padding: 18px;
    border-radius: 10px;
  }

  &:hover {
    color: #797474;
    transition: 0.3s;
    transform: translateY(-2px);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  width: 100%;
  height: 80px;
  background-color: #40495a;
`;
