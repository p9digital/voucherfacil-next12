import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Titulo1 } from '../ui/Tipografia';
import Icon from '../ui/Icon';

const DetalhesStyled = styled.div``;

const RegrasCurtas = styled.div`
  p {
    display: flex;
    margin-top: 1rem;
    &:first-of-type {
      margin-top: 2rem;
    }
    span {
      margin-left: 2rem;
      font-size: 1.7rem;
    }
  }
`;

const RegrasCorpo = styled.div`
  margin-top: 2rem;
  font-size: 1.7rem;
  strong {
    font-size: ${(props) => (props.grande ? '3rem' : '1.7rem')};
    color: ${(props) => props.theme.cores.quatro};
  }
`;

const IconRegra = styled(Icon)`
  fill: ${(props) => props.theme.greyDarker};
  width: 2.8rem;
  min-width: 2.8rem;
  height: 2.8rem;
`;

const Aviso = styled.div`
  background-color:#EEEEEE;
  border-radius:5px;
  margin-bottom:20px;
  padding:10px 20px;
  p {
    margin:10px 0;
    strong {
      color: ${(props) => props.theme.cores.quatro};
    }
  }
`;

function Detalhes({
  pessoas, periodo, regras, agendamento,
}) {
  return (
    <DetalhesStyled>
      <RegrasCurtas>
        <Titulo1>Regras da Promoção</Titulo1>
        {!!pessoas && (
          <p>
            <IconRegra icon={pessoas.includes('uma') ? 'user' : 'users'} />
            <span>{pessoas}</span>
          </p>
        )}
        {!!periodo && (
          <p>
            <IconRegra icon="calendar" />
            <span>{periodo}</span>
          </p>
        )}
        <p>
          <IconRegra icon="clock" />
          <span>
            {agendamento}
          </span>
        </p>
      </RegrasCurtas>
      <RegrasCorpo dangerouslySetInnerHTML={{ __html: regras }} />
      <br />

      <Aviso>
        <p><strong>⚠️ Aviso Importante! ⚠️</strong>: Nossas lojas estão funcionando com o cuidado redobrado e seguindo todas as orientações do Ministério da Saúde contra a Covid-19. Conforme a necessidade, mudanças podem acontecer sem aviso prévio.</p>
        <p>Entre em contato com a loja para confirmar o horário de funcionamento.</p>
        <p>Proteja você e as pessoas ao seu redor: use máscara quando for resgatar o seu Voucher Fácil.</p>
      </Aviso>
    </DetalhesStyled>
  );
}

Detalhes.propTypes = {
  pessoas: PropTypes.string,
  periodo: PropTypes.string,
  agendamento: PropTypes.string,
  regras: PropTypes.string,
};

Detalhes.defaultProps = {
  pessoas: '',
  periodo: '',
  regras: '',
  agendamento: '',
};

export default Detalhes;
