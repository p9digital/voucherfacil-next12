import styled from 'styled-components';
import BotoesBaixe from './BotoesBaixe';

const ChamadaCompletaStyled = styled.div`
  padding: 1rem 0;
`;

const ChamadaCompleta = () => (
  <ChamadaCompletaStyled>
    <BotoesBaixe />
  </ChamadaCompletaStyled>
);

export default ChamadaCompleta;
