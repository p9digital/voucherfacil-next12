/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import devices from '../../styles/devices';

import { celularMask } from '../../helpers/masks';
import { validaTelefone } from '../../helpers/formulario';

import {
  BotaoSubmit, Campos,
} from '../formulario/Form';

import Input from '../formulario/Input';
import InputMasked from '../formulario/InputMasked';
import Select from '../formulario/Select';
import Loader from '../formulario/Loader';
import Icon from '../ui/Icon';

import { ErroStatus, StatusWrapperStyles } from '../formulario/Status';

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%; 
`;

const FormWrapperStyled = styled.div`
  margin: 4rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  border-radius: 3rem;
  padding: 0rem 2rem 3rem;
  max-width: 65.5rem;
  width: 100%;

  @media ${devices.mobileM} {
    padding: 3rem 1rem;
  }
`;

const Topo = styled.div`
  color: ${(props) => props.theme.black};
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 2rem;
`;

const ButtonSubmitContato = styled(BotaoSubmit)`
  color: #fff;
  font-size: 2rem;
  text-transform: uppercase;
  border-radius: 3rem;
  margin-top: 2rem;
  padding: 1rem 4rem;
  border-radius: 10px;

  span {
    padding: 0;
    font-size: 1.6rem;
  }
`;

export default function FormDivulgue({
  contato,
  atendimentos,
  estados,
  cidades,
  segmentos,
  handleSubmit,
  handleInput,
  handleEstado,
  valido,
  erro,
  enviando,
}) {
  const numberMask = createNumberMask({
    prefix: 'R$ ',
    decimalLimit: 2,
    requireDecimal: true,
    thousandsSeparatorSymbol: '.',
    decimalSymbol: ',',
  });

  return (
    <FormWrapperStyled className="form-promocao-wrapper">
      {erro && !enviando && (
        <StatusWrapperStyles>
          <ErroStatus color="#393939">
            <Icon
              tamanho="5rem"
              cor="#FF0000"
              icon="error"
            />
            <p>Ocorreu um erro inesperado!</p>
            <Link href="/">
              <a>Clique aqui e tente novamente.</a>
            </Link>
          </ErroStatus>
        </StatusWrapperStyles>
      )}
      {!erro && enviando && (
        <StatusWrapperStyles>
          <p className="loader-texto">
            Enviando seu contato!
          </p>
          <Loader color="#393939" />
        </StatusWrapperStyles>
      )}
      {!erro && !enviando && (
      <Form onSubmit={handleSubmit}>
        <Topo>
          Quer a sua empresa divulgando com o Voucher Fácil, ou saber mais sobre os benefícios da nossa plataforma? Envie uma mensagem para a equipe do Voucher Fácil.
        </Topo>
        <Campos>
          <Input
            name="nomeEmpresa"
            label="nomeEmpresa"
            placeholder="Nome da empresa"
            handleChange={handleInput}
            value={contato.nomeEmpresa}
            type="text"
            color="claro"
            valido={!(!valido && !contato.nomeEmpresa)}
          />
          <Input
            name="nome"
            label="nome"
            placeholder="Nome completo"
            handleChange={handleInput}
            value={contato.nome}
            type="text"
            color="claro"
            valido={!(!valido && !contato.nome)}
          />
          <Input
            name="email"
            label="email"
            placeholder="Seu melhor e-mail"
            handleChange={handleInput}
            value={contato.email}
            type="email"
            color="claro"
            valido={!(!valido && !contato.email)}
          />
          <InputMasked
            name="celular"
            label="celular"
            placeholder="Whatsapp"
            handleChange={handleInput}
            value={contato.celular}
            type="text"
            color="claro"
            mask={celularMask}
            valido={contato.celular ? validaTelefone(contato.celular) : !!valido}
          />
          <InputGroup>
            <Select
              name="uf"
              label="uf"
              placeholder="UF"
              handleChange={handleEstado}
              value={contato.uf}
              type="text"
              color="claro"
              options={estados}
              valido={!(!valido && !contato.uf)}
              simpleValue
              tiny
            />
            <Select
              name="cidade"
              label="cidade"
              placeholder="Cidade"
              handleChange={handleInput}
              value={contato.cidade}
              type="text"
              color="claro"
              options={cidades}
              valido={!(!valido && !contato.cidade)}
              simpleValue
              medium
            />
          </InputGroup>
          <Select
            name="segmento"
            label="segmento"
            placeholder="Segmento da Empresa"
            handleChange={handleInput}
            value={contato.segmento}
            type="text"
            color="claro"
            options={segmentos}
            valido={!(!valido && !contato.segmento)}
          />
          <Select
            name="atendimento"
            label="atendimento"
            placeholder="Capacidade de atendimento por Dia"
            handleChange={handleInput}
            value={contato.atendimento}
            type="text"
            color="claro"
            options={atendimentos}
            valido={!(!valido && !contato.atendimento)}
          />
          <InputMasked
            name="ticketMedio"
            label="ticketMedio"
            placeholder="Ticket Médio"
            handleChange={handleInput}
            value={contato.ticketMedio}
            type="text"
            color="claro"
            valido={!(!valido && !contato.ticketMedio)}
            mask={numberMask}
          />
          <ButtonSubmitContato type="submit" aria-label="Enviar contato!">
            <span>
              Enviar contato!
            </span>
          </ButtonSubmitContato>
        </Campos>
      </Form>
      )}
    </FormWrapperStyled>
  );
}

FormDivulgue.propTypes = {
  contato: PropTypes.shape({
    nome: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    celular: PropTypes.string.isRequired,
    segmento: PropTypes.string.isRequired,
    atendimento: PropTypes.string.isRequired,
    nomeEmpresa: PropTypes.string.isRequired,
    uf: PropTypes.string.isRequired,
    cidade: PropTypes.string.isRequired,
    ticketMedio: PropTypes.string.isRequired,
  }).isRequired,
  segmentos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  atendimentos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  estados: PropTypes.arrayOf(PropTypes.string).isRequired,
  cidades: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleEstado: PropTypes.func.isRequired,
  valido: PropTypes.bool.isRequired,
  enviando: PropTypes.bool.isRequired,
  erro: PropTypes.bool.isRequired,
};
