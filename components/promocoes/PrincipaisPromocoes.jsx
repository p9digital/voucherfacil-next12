/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ListaPromocoes from './ListaPromocoes';
import Icon from '../ui/Icon';

import { cidadeType, promocaoType } from '../../types';
import { geraPromosVazias } from '../../helpers/promocoes';
import { buscaPromocoes } from '../../services/promocoes';

const PromocoesWrapper = styled.div`
  padding: 3rem 1rem;
`;

const Localizacao = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LocalNome = styled.p`
  color: ${(props) => props.theme.outrasCores.cinza1};
  margin-top: 1.5rem;
  font-size: 1.7rem;
`;

const LocalizacaoIcon = styled(Icon)`
  fill: ${(props) => props.theme.cores.um};
  margin: 0 auto;
  width: 4rem;
  height: 4rem;
`;

function PrincipaisPromocoes({ cidade, promocoesInitial, withLocation }) {
  const [promocoes, setPromocoes] = useState(
    promocoesInitial || geraPromosVazias(),
  );
  const [promocoesDaCidade, setPromocoesDaCidade] = useState([]);

  useEffect(() => {
    async function formataPromoLocations() {
      if (cidade) {
        const query = { cidadePath: cidade.path, uf: cidade.uf, clientePath: false };
        const data = await buscaPromocoes(query);

        setPromocoesDaCidade(data.promocoes);
      }
    }

    formataPromoLocations();
  }, []);

  return (
    <PromocoesWrapper>
      {!!cidade && withLocation && (
        <Localizacao>
          <LocalizacaoIcon icon="location" />
          <LocalNome>
            {promocoesDaCidade.length}
            {' '}
            {promocoesDaCidade.length > 1 ? 'Ofertas' : 'Oferta'}
            {' '}
            para
            <strong>
              {' '}
              {cidade.nome}
            </strong>
          </LocalNome>
        </Localizacao>
      )}
      <ListaPromocoes promocoes={cidade ? promocoesDaCidade : promocoes} />
    </PromocoesWrapper>
  );
}

PrincipaisPromocoes.propTypes = {
  cidade: cidadeType,
  promocoesInitial: PropTypes.arrayOf(promocaoType),
  withLocation: PropTypes.bool,
};

PrincipaisPromocoes.defaultProps = {
  cidade: null,
  promocoesInitial: null,
  withLocation: false,
};

export default PrincipaisPromocoes;
