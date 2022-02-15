import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Container } from '../ui/Container';
import Icon from '../ui/Icon';
import Logo from '../ui/Logos';

const FaixaContainer = styled(Container)`
  display: flex;
  justify-content: center;
  padding: 4rem 0;
  position: relative;

  @media (max-width: 1170px) {
    padding: 4rem 2rem;
  }
`;

const FaixaWrapper = styled.div`
  background-color: ${(props) => props.theme.cores.quatro};
`;

const LogoWrapper = styled.div`
  margin-right: 3rem;
  @media (max-width: 1170px) {
    display: none;
  }
`;

const IconButton = styled.button`
  position: absolute;
  background-color: transparent;
  top: 2rem;
  right: 2rem;
`;

const TextoWrapper = styled.div`
  padding: 0 2rem;
  width: 60%;

  @media(max-width: 900px) {
    width: 90%;
  }

  p {
    color: #fff;

    @media (max-width: 1170px) {
      text-align: center;
    }
  }

  .destaque {
    font-weight: bold; 
    margin-bottom: 1.5rem;
  }
`;

export default function FaixaDefault({ textos, storageName, closeButton }) {
  const [fechado, setFechado] = useState(true);

  function close() {
    if (typeof document !== 'undefined') {
      localStorage.setItem(`@vouche-facil/faixa-${storageName}`, true);

      setFechado(true);
    }
  }

  useEffect(() => {
    async function buscaInfoStorage() {
      if (fechado) {
        const storageData = typeof document !== 'undefined'
          ? await JSON.parse(await localStorage.getItem(`@vouche-facil/faixa-${storageName}`)) : false;

        setFechado(storageData);

        return false;
      }

      setFechado(false);
    }

    buscaInfoStorage();
  }, ['umavez']);

  return (
    <>
      {!fechado && (
      <FaixaWrapper>
        <FaixaContainer maxWidth="1100px">
          <LogoWrapper>
            <Logo tamanho="10rem" />
          </LogoWrapper>
          <TextoWrapper>
            <p className="destaque">{textos.destaque}</p>
            <p className="normal">{textos.normal}</p>
          </TextoWrapper>
          {!!closeButton && (
            <IconButton onClick={() => close()} aria-label="Fechar conteúdo!">
              <Icon icon="close" cor="#fff" tamanho="2.5rem" />
            </IconButton>
          )}
        </FaixaContainer>
      </FaixaWrapper>
      )}
    </>
  );
}

FaixaDefault.propTypes = {
  textos: PropTypes.shape({
    destaque: PropTypes.string,
    normal: PropTypes.string
  }).isRequired,
  storageName: PropTypes.string.isRequired,
  closeButton: PropTypes.bool,
};

FaixaDefault.defaultProps = {
  closeButton: true,
};
