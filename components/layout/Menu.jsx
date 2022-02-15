import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import BotaoMenuCompleto from '../ui/MenuIcon';
import Logo from '../ui/Logos';
import devices from '../../styles/devices';

const MenuStyled = styled.div`
  @media ${devices.laptop} {
    background: #fff;

    position: fixed;
    top: 0;
    width: 86vw;
    height: 100vh;
    padding: 3rem 3rem 3rem;
    box-shadow: -4px 0px 11px 4px rgba(41, 41, 41, 0.2);
    border-left: 1px solid ${(props) => props.theme.outrasCores.cinzaClaro1};

    z-index: 10;

    right: ${(props) => (props.visivel ? '0' : '-40%')};
    opacity: ${(props) => (props.visivel ? '1' : '0')};
    pointer-events: ${(props) => (props.visivel ? 'initial' : 'none')};

    transition: right 0.2s linear, opacity 0.275s ease-in-out;
  }
`;

const MenuTopo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const LogoCentralizado = styled(Logo)`
  margin-left: auto;
  margin-right: -1.4rem;
`;

const BotaoNavbar = styled(BotaoMenuCompleto)`
  margin-left: auto;
  align-self: flex-start;
`;

const MenuBrand = styled.div`
  @media ${devices.laptop} {
    display: flex;
  }

  display: none;
  width: 100%;
  justify-content: space-between; 
`;

const MenuItens = styled.div`
  display: flex;

  @media ${devices.laptop} {
    margin-top: 2rem;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
  }

`;

const MenuItem = styled.a`
  @media ${devices.laptop} {
    margin-top: 1rem;
    color: ${(props) => props.theme.cores.quatro};
    text-transform: uppercase;
    font-weight: bold;
  }

  color: #fff;

  font-size: 1.8rem;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: .3s all;
  margin: 0 1rem;

  &:hover {
    border-bottom: 2px solid #fff;

    @media ${devices.laptop} {
      border-bottom: 2px solid ${(props) => props.theme.cores.quatro};
    }
  }
`;

const Menu = ({ className, visivel: estaVisivel, fecharMenu }) => (
  <MenuStyled className={className} visivel={estaVisivel}>
    <MenuTopo>
      <MenuBrand>
        <LogoCentralizado colorido tamanho="8rem" />
        <BotaoNavbar primario menuAberto={estaVisivel} onClick={fecharMenu} aria-label="Fecher Menu" />
      </MenuBrand>
      <MenuItens onClick={fecharMenu}>
        <Link href="/">
          <MenuItem>
            Início
          </MenuItem>
        </Link>
        <Link href="/contato">
          <MenuItem>
            Contato
          </MenuItem>
        </Link>
        <Link href="/divulgue">
          <MenuItem>
            Divulgue sua empresa
          </MenuItem>
        </Link>
        <Link href="/ajuda">
          <MenuItem>
            Ajuda
          </MenuItem>
        </Link>
      </MenuItens>
    </MenuTopo>
  </MenuStyled>
);

Menu.propTypes = {
  visivel: PropTypes.bool,
  fecharMenu: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Menu.defaultProps = {
  visivel: false,
  className: '',
};

export default Menu;
