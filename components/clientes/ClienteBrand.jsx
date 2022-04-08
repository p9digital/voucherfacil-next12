import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { clienteType } from '../../types/index';

import Menu from '../layout/Menu';
import BotaoMenuCompleto from '../ui/MenuIcon';
import Logo from '../ui/Logos';

const Wrapper = styled.div`
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.bgColor || '#000'};
  box-shadow: ${(props) => props.theme.boxShadow1};
  color: ${(props) => props.corFonte || '#fff'};
  display: flex;
  font-size: 1.4rem;
  padding: 1rem 2rem;

  margin: 0 -1.5rem;
  width:calc(100% + 3rem);
`;

const LogoCliente = styled.img`
  max-height: 65px;
`;

const LogoClienteWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Texto = styled.p`
  margin-left: 2rem;

  @media(max-width: 600px){
    display: none;
  }
`;

// path => estava sendo tirado do cliente porém sem uso

const ClienteBrand = ({
  cliente: {
    bgcolor, corfonte, nomeFantasia, logo,
  },
  className,
}) => {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <Wrapper bgColor={bgcolor} corFonte={corfonte} className={className}>
      <Logo tamanho="6rem" />
      <LogoClienteWrapper>
        <LogoCliente
          src={`${process.env.STORAGE_BASE_URL}/${logo}`}
          alt={nomeFantasia}
        />
        <Texto>
          Ofertas
          {' '}
          <strong className="nome">{nomeFantasia}</strong>
        </Texto>
      </LogoClienteWrapper>
      <BotaoMenuCompleto
        aria-label="Abrir Menu"
        menuAberto={menuAberto}
        onClick={() => setMenuAberto(true)}
      />
      <Menu visivel={menuAberto} fecharMenu={() => setMenuAberto(false)} />
    </Wrapper>
  );
};

ClienteBrand.propTypes = {
  cliente: clienteType.isRequired,
  className: PropTypes.string,
};

ClienteBrand.defaultProps = {
  className: '',
};

export default ClienteBrand;
