import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import devices from '../../styles/devices';

import ListaPromocoes from './ListaPromocoes';
import { Container } from '../ui/Container';
import { Titulo1 } from '../ui/Tipografia';

const TituloOfertasRecomendadas = styled(Titulo1)`
  padding: 0 0 3rem;
  text-align: center;
`;

const OfertasRecomendadasWrapper = styled.div`
  position: relative;
`;

const OfertasRecomendadasContainer = styled(Container)`
  margin-top: 2rem;

  @media ${devices.tablet} {
    padding: 0;
  }
`;

export default function OfertasRecomendadas({ promocoes, promocaoAtualId }) {
  const promocoesFiltradas = promocoes.filter(
    (promocao) => !(moment().format('YYYY-MM-DD HH:mm:SS') > promocao.dataFim)
    && promocao.id !== promocaoAtualId,
  );

  return (
    <>
      {promocoesFiltradas.length >= 1 && (
        <OfertasRecomendadasWrapper>
          <OfertasRecomendadasContainer>
            <TituloOfertasRecomendadas grande>Veja mais ofertas!</TituloOfertasRecomendadas>
            <ListaPromocoes promocoes={promocoesFiltradas} />
          </OfertasRecomendadasContainer>
        </OfertasRecomendadasWrapper>
      )}
    </>
  );
}

OfertasRecomendadas.propTypes = {
  promocoes: PropTypes.arrayOf(PropTypes.object).isRequired,
  promocaoAtualId: PropTypes.number.isRequired,
};
