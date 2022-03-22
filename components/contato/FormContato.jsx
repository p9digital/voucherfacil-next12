/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
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

export default function FormOferta({
  contato, assuntos, handleSubmit, handleInput, valido, erro, enviando,
}) {
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
          Envie uma mensagem para a equipe do Voucher Fácil.
        </Topo>
        <Campos>
          <Select
            name="assunto"
            label="assunto"
            placeholder="Assuntos"
            handleChange={handleInput}
            value={contato.assunto}
            type="text"
            color="claro"
            options={assuntos}
            valido={!(!valido && !contato.assunto)}
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
            placeholder="Celular"
            handleChange={handleInput}
            value={contato.celular}
            type="text"
            color="claro"
            mask={celularMask}
            valido={contato.celular ? validaTelefone(contato.celular) : !!valido}
          />
          <Input
            name="mensagem"
            label="mensagem"
            placeholder="Mensagem"
            handleChange={handleInput}
            value={contato.mensagem}
            type="text"
            color="text"
            valido={!(!valido && !contato.mensagem)}
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

FormOferta.propTypes = {
  contato: PropTypes.shape({
    nome: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    assunto: PropTypes.string.isRequired,
    celular: PropTypes.string.isRequired,
    mensagem: PropTypes.string.isRequired,
  }).isRequired,
  assuntos: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  valido: PropTypes.bool.isRequired,
  enviando: PropTypes.bool.isRequired,
  erro: PropTypes.bool.isRequired,
};
