import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Titulo1 } from '../ui/Tipografia';

const ContatoOfertaWrapper = styled.div``;

export default function ContatoOferta({ telefone }) {
  return (
    <ContatoOfertaWrapper>
      <Titulo1>Contato</Titulo1>
      <p>{telefone && telefone}</p>
      <br />
    </ContatoOfertaWrapper>
  );
}

ContatoOferta.propTypes = {
  telefone: PropTypes.string
};

ContatoOferta.defaultProps = {
  telefone: ""
};
