/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { removeTags } from '../../helpers/strings';
import { centavosParaReais } from '../../helpers/valores';
import {
  DestaqueCirculo,
  PrecoAnterior,
  PrecosWrapper,
  PrecoAtual,
  Descricao,
} from './styles';
import { Titulo1 } from '../ui/Tipografia';
import Slider from '../slider/Slider';
import { Container } from '../ui/Container';
import { SkeletonElemento } from '../loadings/SkeletonBase';
import Breadcrumbs from '../layout/Breadcrumbs';

const TitleContainer = styled(Container)`
  padding: 0;
`;

const TopoStyled = styled.div`
  margin-bottom: 2rem;

  .detalhes {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 1rem;
  }

  ${DestaqueCirculo} {
    margin-top: -2.9rem;
  }

  ${Titulo1} {
    margin-top: 1rem;
    max-width: 90vw;

    @media (max-width:600px) {
      font-size:2.5rem;
      line-height:3rem;
    }
  }
`;

const FotosWrapper = styled.div`
  margin-left: -1.5rem;
  margin-right: -1.5rem;
  min-width: 100vw;
`;

const Topo = ({
  fotos,
  desconto,
  valor_atual,
  valor_de,
  titulo,
  descricao,
  resumo,
  promocao_atualizada: atualizado,
  cliente,
}) => (
  <TopoStyled>
    <FotosWrapper>
      <Slider destaquesInitial={fotos} desativarSombras />
    </FotosWrapper>
    <div className="detalhes">
      {!!desconto && desconto && (
      <DestaqueCirculo zIndex="1" grande>
        {desconto}
      </DestaqueCirculo>
      )}
      {atualizado && !!valor_de && !!valor_atual && (
      <PrecosWrapper>
        {atualizado ? (
          <>
            <PrecoAnterior>
              R$
              {centavosParaReais(valor_de)}
            </PrecoAnterior>
            <PrecoAtual>
              R$
              {centavosParaReais(valor_atual)}
            </PrecoAtual>
          </>
        ) : (
          <>
            <SkeletonElemento
              height="2.5rem"
              width="7rem"
              display="inline-block"
            />
            <SkeletonElemento
              height="2.5rem"
              width="9rem"
              display="inline-block"
              marginLeft="0.8rem"
            />
          </>
        )}
      </PrecosWrapper>
      )}
    </div>
    <Breadcrumbs
      caminho={[
        { titulo: cliente.nomeFantasia, uri: `/ofertas/marca/${cliente.path}` },
        { titulo },
      ]}
    />
    <TitleContainer maxWidth="1100px">
      <Titulo1 grande as="h1">
        {titulo}
      </Titulo1>
      <Descricao>{removeTags(descricao || resumo)}</Descricao>
    </TitleContainer>
  </TopoStyled>
);

Topo.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  fotos: PropTypes.array.isRequired,
  titulo: PropTypes.string.isRequired,
  desconto: PropTypes.string,
  valor_atual: PropTypes.number,
  valor_de: PropTypes.number,
  descricao: PropTypes.string,
  resumo: PropTypes.string,
  promocao_atualizada: PropTypes.bool,
  cliente: PropTypes.shape({
    nomeFantasia: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};

Topo.defaultProps = {
  desconto: '',
  valor_atual: 0,
  valor_de: 0,
  descricao: '',
  resumo: '',
  promocao_atualizada: false,
};

export default Topo;
