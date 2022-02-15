import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { clienteType } from '../../types/index';

const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bgColor || '#000'};
  border-radius: 3rem;
  box-shadow: ${(props) => props.theme.boxShadow1};
  color: ${(props) => props.corFonte || '#fff'};
  display: flex;
  font-size: 1.4rem;
  padding: 0.7rem 1.4rem;
`;

const Logo = styled.img`
  width: 8rem;
`;

const Texto = styled.p`
  margin-left: 1rem;
`;

// path => estava sendo tirado do cliente porém sem uso

const BulletCliente = ({
  cliente: {
    bgcolor, corfonte, nomeFantasia, logo,
  },
  className,
}) => (
  <Wrapper bgColor={bgcolor} corFonte={corfonte} className={className}>
    <Logo
      src={`https://voucherfacil.com.br/storage/${logo}`}
      alt={nomeFantasia}
    />
    <Texto>
      Vendo ofertas de
      {' '}
      <strong className="nome">{nomeFantasia}</strong>
    </Texto>
  </Wrapper>
);

BulletCliente.propTypes = {
  cliente: clienteType.isRequired,
  className: PropTypes.string,
};

BulletCliente.defaultProps = {
  className: '',
};

export default BulletCliente;
