import styled from 'styled-components';
import devices from '../../styles/devices';
// import { IconeWrapperParaBotao } from '../ui/Icon';
// import { animacaoGira, animacaoBounce } from '../../styles/efeitos';

export const Form = styled.form`
  background: ${(props) => (props.light ? props.theme.lessLighterGrey : props.theme.cores.quatro)};
  border-radius:3rem;
  padding: 2rem;
  max-width: 50rem;
  width: 100%;

  box-shadow: ${(props) => (props.light ? props.theme.boxShadow2 : 'none')};

  @media ${devices.mobileM} {
    padding: 3rem 1rem;
  }
`;

export const FormWrapperStyled = styled.div`
  margin: 0 0 4rem 0;
  width: 100%;  
  display: flex;
  justify-content: center;

  @media (max-width: 900px) {
    margin: 4rem 0;
  }
`;

export const Topo = styled.div`
  color: ${(props) => (props.light ? props.theme.cores.seis : '#fff')};
  text-align: center;
  font-size: 1.8rem;
  strong {
    color: ${(props) => (props.light ? props.theme.cores.seis : props.theme.highlightGreen)};
  }

  @media(max-width: 500px) {
    font-size: ${(props) => (props.desativado ? '1.5rem' : '1.8rem')};
  }
`;

export const Campos = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;

  .limite-excedido {
    color:#FF3333;
    text-align:center;
  }
`;

export const BotaoSubmit = styled.button`
  background-color: ${(props) => (props.light ? props.theme.cores.seis : '#61bb31')};
  color: #fff;
  border-radius: 3rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  font-size: ${(props) => (props.light ? '1.8rem' : '2rem')};
  margin: 1.4rem 0.5rem 0.5rem;
  transition: all 0.2s;
  align-self: center;

  /* fazendo ele ficar full de um jeito nao muito bonito */
  width: 100%;

  /* posicionando o icone */
  display: flex;
  align-items: stretch;
  justify-content: center;
  overflow: hidden;

  span {
    flex: 1;
    padding: 15px 20px;
    text-transform: uppercase;
    font-size: 1.8rem;
  }
  &:disabled {
    background-color:#CCCCCC;
  }
  &:hover {
    background-color: #fff;
    color: ${(props) => (props.light ? props.theme.cores.seis : '#61bb31')};
  }

  @media ${devices.laptop} {
    span {
      padding: 1.4rem 2rem;
    }
  }
`;
