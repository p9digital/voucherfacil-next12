import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import devices from '../../styles/devices';

import Meta from './Meta';
import Logo from '../ui/Logos';
import BuscaCidades from '../locais/BuscaCidades';
import Menu from './Menu';
import BotaoMenuCompleto from '../ui/MenuIcon';

const NavbarStyled = styled.nav`
  justify-content: space-between;
  display: flex;
  align-items: center;
  padding: 1.2rem 1rem;
  background: ${(props) => props.theme.cores.um};

  /* fixando a nav */
  position: fixed;

  width: 100%;
  top: 0;
  left: 0;
  z-index: 4;

  min-height: 8.3rem;

  @media print {
    display: none;
  }
`;

const BuscaCidadesLimitado = styled(BuscaCidades)`
  @media ${devices.laptop} {
    width: 14rem;
  }
`;

function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  const { page } = useSelector(({ pages }) => pages);

  return (
    <NavbarStyled page={page}>
      <Logo tamanho="6rem" />
      <Meta />
      <BuscaCidadesLimitado />
      <BotaoMenuCompleto
        aria-label="Abrir Menu"
        menuAberto={menuAberto}
        onClick={() => setMenuAberto(true)}
      />
      <Menu visivel={menuAberto} fecharMenu={() => setMenuAberto(false)} />
    </NavbarStyled>
  );
}

export default Navbar;
