import styled from 'styled-components';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Footer from './Footer';

const LayoutStyled = styled.div`
  min-height: 100vh;
  --navbar-gap: 8.3rem;
`;

const Main = styled.main`
  padding-top: ${(props) => (props.page !== 'oferta' ? '8.3rem' : '0')};
`;

const Layout = ({ children }) => {
  const { page } = useSelector(({ pages }) => pages);
  return (
    <LayoutStyled className="layout">
      {page !== 'oferta' && (
        <Navbar />
      )}
      <Main page={page}>{children}</Main>
      <Footer />
    </LayoutStyled>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
