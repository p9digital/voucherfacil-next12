/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
// import devices from '../../styles/devices';

export const InputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InputStyled = styled.input`
  padding: 0.5rem 2rem;
  background-color: ${(props) => props.theme.lightGrey};
  border-radius: 10px;

  /* eh interessante manter no minimo 16px para evitar o zoom do Safari iOS */
  border: none;
  border: ${(props) => (props.valido ? '1px solid #ffffff36' : '1px solid #E86262')};
  font-size: 16px;
  outline: none;
  min-height: ${(props) => (props.size ? props.size : '4rem')};
  margin: 0.5rem 0;
  flex: 1;
`;

export const TextAreaStyled = styled.textarea`
  padding: 1.5rem 2rem;
  background-color: ${(props) => props.theme.lightGrey};
  border-radius: 10px;

  /* eh interessante manter no minimo 16px para evitar o zoom do Safari iOS */
  border: none;
  border: ${(props) => (props.valido ? '1px solid #ffffff36' : '1px solid #E86262')};
  font-size: 16px;
  outline: none;
  min-height: 15rem;
  resize: none;
  margin: 0.5rem 0;
  flex: 1; 
`;

export const InputStyledPesquisa = styled.input`
  background-color:#FFFFFF;
  border:0;
  border-bottom: ${(props) => (props.valido ? '1px solid #333333' : '1px solid #E86262')};
  border-radius:0;
  flex: 1;
  font-size: 16px;
  margin: 0.5rem 0;
  min-height: ${(props) => (props.size ? props.size : '4rem')};
  outline: none;
  padding: ${(props) => (props.icone ? '10px 15px 10px 30px' : '10px 0')};
  width:100%;
`;

export const SelectStyled = styled.select`
  -webkit-appearance: none;
  padding: 0.5rem 2rem;
  background-color: ${(props) => props.theme.lightGrey};
  border-radius: 10px;

  /* eh interessante manter no minimo 16px para evitar o zoom do Safari iOS */
  border: none;
  border: ${(props) => (props.valido ? '1px solid #ffffff36' : '1px solid #E86262')};
  font-size: 16px;
  outline: none;
  min-height: 4rem;
  margin: 0.5rem 0;
  flex: ${(props) => (!props.medium && !props.tiny ? 1 : 'none')}; 
  width: 100%;
`;

export const SelectStyledPesquisa = styled.select`
  background-color:transparent;
  border:0;
  border-bottom: ${(props) => (props.valido ? '1px solid #333333' : '1px solid #E86262')};
  border-radius:0;
  flex: ${(props) => (!props.medium && !props.tiny ? 1 : 'none')}; 
  font-size: 16px;
  margin: 0.5rem 0;
  min-height: 4rem;
  outline: none;
  padding: ${(props) => (props.icone ? '10px 15px 10px 30px' : '10px 0')};
  width: 100%;
`;

export const InputEscuro = styled(InputStyled)`
  background-color: ${(props) => props.theme.marca.azulEscuro2};
  border-radius: 3rem;
  color: white;
  padding: 15px;
  width: 100%;
  border: ${(props) => (props.valido ? '1px solid #ffffff36' : '1px solid #E86262')};

  &::placeholder {
    color: white;
  }
`;

export const TextAreaEscuro = styled(TextAreaStyled)`
  background-color: ${(props) => props.theme.marca.azulEscuro2};
  border-radius: 3rem;
  color: white;
  padding: 15px;
  width: 100%;
  border: ${(props) => (props.valido ? '1px solid #ffffff36' : '1px solid #E86262')};

  &::placeholder {
    color: white;
  }
`;

export const SelectEscuro = styled(SelectStyled)`
  background-color: ${(props) => props.theme.marca.azulEscuro2};
  border-radius: 3rem;
  color: white;
  padding: 15px;
  border: ${(props) => (props.valido ? '1px solid #ffffff36' : '1px solid #E86262')};

  &::placeholder {
    color: white;
  }
`;
