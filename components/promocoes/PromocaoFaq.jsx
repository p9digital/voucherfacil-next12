import styled from 'styled-components';
import { Titulo1 } from '../ui/Tipografia';

const FaqStyled = styled.div`
  /* margin-top: 3rem; */
`;

const Duvida = styled.p`
  margin-top: 2rem;
  .titulo {
    display: block;
    font-weight: bold;
  }
`;

const Faq = () => (
  <FaqStyled>
    <Titulo1>Dúvidas Frequentes</Titulo1>
    <Duvida>
      <strong className="titulo">Como pagar o voucher?</strong>
      Gerar o Voucher Fácil é gratuito! Você pagará seu consumo direto no
      estabelecimento, no dia e hora agendado.
    </Duvida>
    <Duvida>
      <strong className="titulo">
        Um único Voucher vale para duas pessoas?
      </strong>
      Não. O Voucher Fácil é individual. Peça ao seu acompanhante para gerar
      também um Voucher Fácil e selecionar o mesmo dia/horário que você.
    </Duvida>
  </FaqStyled>
);

export default Faq;
