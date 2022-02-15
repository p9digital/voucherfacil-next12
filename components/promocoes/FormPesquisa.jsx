/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Link from 'next/link';
import styled from 'styled-components';

import { celularMask, cpfMask } from '../../helpers/masks';

import {
  Form, BotaoSubmit, Campos, FormWrapperStyled, Topo,
} from '../formulario/Form';

import InputPesquisa from '../formulario/InputPesquisa';
import InputMaskedPesquisa from '../formulario/InputMaskedPesquisa';
import SelectPesquisa from '../formulario/SelectPesquisa';
import Loader from '../formulario/Loader';
import Icon from '../ui/Icon';

import { StatusWrapper, ErroStatus } from '../formulario/Status';
import { validaCpf, validaTelefone } from '../../helpers/formulario';

import 'react-dates/initialize';
import { TextAreaStyled } from '../formulario/InputsStyles';

moment.locale('pt-br');

export default function FormPesquisa({
  celularExcedido,
  cpfExcedido,
  emailExcedido,
  enviando,
  erro,
  estado,
  estados,
  handleEstado,
  handleInput,
  handleSubmit,
  handleUnidade,
  limitePorUsuario,
  pesquisas,
  repetido,
  respostas,
  setRespostas,
  setRespostasRadio,
  unidades,
  validandoLimite,
  valido,
  voucher
}) {
  const [listaEstados, setListaEstados] = useState([]);

  useEffect(() => {
    const lista = estados.map((est) => {
      return est.nome;
    });
    setListaEstados(lista);
  }, []);

  return (
    <FormWrapperStyled className="form-promocao-wrapper">
      {erro && !enviando && (
        <StatusWrapper>
          <ErroStatus>
            <Icon
              tamanho="5rem"
              cor="#fff"
              icon="error"
            />
            <p>{!repetido ? 'Ocorreu um erro inesperado!' : 'Voucher já gerado!'}</p>
            <Link href="/">
              <i>{!repetido ? 'Clique aqui e tente novamente.' : 'Agende outro dia.'}</i>
            </Link>
          </ErroStatus>
        </StatusWrapper>
      )}

      {!erro && enviando && (
        <StatusWrapper>
          <p className="loader-texto">
            Reservando o seu Voucher
          </p>
          <Loader />
        </StatusWrapper>
      )}

      {!erro && !enviando && (
        <PesquisaForm onSubmit={handleSubmit}>
          <PesquisaTopo>
            Responda nossa pesquisa de satisfação e receba <strong>gratuitamente</strong> seu Voucher Fácil
          </PesquisaTopo>
          <PesquisaCampos>
            {
              listaEstados.length > 1 ? (
                <SelectPesquisa
                  name="estado"
                  label="estado"
                  placeholder="UF"
                  handleChange={handleEstado}
                  value={estado}
                  type="text"
                  color="escuro"
                  options={listaEstados}
                  icone="marker"
                  valido
                  simpleValue
                />
              ) : (
                <></>
              )
            }
            <SelectPesquisa
              name="unidade"
              label="unidade"
              placeholder="Unidade"
              handleChange={handleUnidade}
              value={voucher.unidade}
              type="text"
              icone="marker"
              options={unidades}
              groups={estados}
              groupsFiltrado={estado != "" && estado != "UF"}
              valido={!(!valido && !voucher.unidade)}
            />
            <InputPesquisa
              name="nome"
              label="nome"
              placeholder="Nome completo"
              handleChange={handleInput}
              value={voucher.nome}
              type="text"
              icone="user"
              valido={!(!valido && !voucher.nome)}
            />
            <InputPesquisa
              name="email"
              label="email"
              placeholder="Seu melhor e-mail"
              handleChange={handleInput}
              value={voucher.email}
              type="email"
              icone="messenger"
              valido={!(!valido && !voucher.email) && !emailExcedido}
            />
            {
              limitePorUsuario && (
                <InputMaskedPesquisa
                  name="cpf"
                  label="cpf"
                  placeholder="CPF"
                  handleChange={handleInput}
                  value={voucher.cpf}
                  type="tel"
                  icone="lock"
                  mask={cpfMask}
                  valido={!(!valido && (voucher.cpf ? !validaCpf(voucher.cpf) : !valido)) && !cpfExcedido}
                />
              )
            }
            <InputMaskedPesquisa
              name="celular"
              label="celular"
              placeholder="Celular"
              handleChange={handleInput}
              value={voucher.celular}
              type="tel"
              icone="cellphone"
              mask={celularMask}
              valido={!(!valido && (voucher.celular ? !validaTelefone(voucher.celular) : !valido)) && !celularExcedido}
            />

            {
              pesquisas && pesquisas.map((pergunta) => {
                let campo = "";
                if (pergunta.tipo == "text") {
                  campo = (
                    <Campo key={pergunta.id}>
                      <label>{pergunta.pergunta}</label>

                      <InputPesquisa
                        name={pergunta.pergunta}
                        value={respostas[pergunta.id - 1]}
                        onChange={setRespostas}
                        placeholder={pergunta.pergunta}
                      />
                    </Campo>
                  );
                } else if (pergunta.tipo == "radio") {
                  campo = (
                    <Campo key={pergunta.id}>
                      <label>{pergunta.pergunta}</label>

                      <RangeItems>
                        {pergunta.valores.map((valor, index) => (
                          <RangeItem
                            className={`item${index + 1}${respostas[pergunta.id - 1] && respostas[pergunta.id - 1] == valor ? ' checked' : ''}${respostas[pergunta.id - 1] && respostas[pergunta.id - 1] != valor ? ' unchecked' : ''}`}
                            key={index}
                            htmlFor={`${pergunta.id}-${index + 1}`}
                          >
                            <input
                              type="radio"
                              name={pergunta.id}
                              id={`${pergunta.id}-${index + 1}`}
                              value={respostas[pergunta.id - 1]}
                              onChange={() => setRespostasRadio(pergunta.id, valor)}
                            />
                            {valor}
                          </RangeItem>
                        ))}
                      </RangeItems>
                    </Campo>
                  );
                } else if (pergunta.tipo == "textarea") {
                  campo = (
                    <Campo key={pergunta.id}>
                      <label>{pergunta.pergunta}</label>

                      <PesquisaTextArea
                        type="radio"
                        name={pergunta.id}
                        value={respostas[pergunta.id - 1]}
                        onChange={setRespostas}
                      />
                    </Campo>
                  );
                } else {
                  campo = "";
                }

                return campo;
              })
            }

            {(cpfExcedido || emailExcedido || celularExcedido) && (
              <label className="limite-excedido">Voucher já gerado para o {cpfExcedido && 'CPF '}{celularExcedido && 'celular '}{emailExcedido && 'email '}cadastrado</label>
            )}
            <BotaoSubmit type="submit" aria-label="Quero meu voucher!" disabled={validandoLimite}>
              <span>Quero meu voucher</span>
            </BotaoSubmit>
          </PesquisaCampos>
        </PesquisaForm>
      )}
    </FormWrapperStyled>
  );
}

const PesquisaForm = styled(Form)`
  background:none;
  max-width: 100%;
  padding:0;
`;

const PesquisaTopo = styled(Topo)`
  color:#333333;
`;

const PesquisaCampos = styled(Campos)`
  padding:0;
`;

const Campo = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  margin:10px 0;
`;

const RangeItems = styled.div`
  display:flex;
  justify-content:space-between;
`;

const RangeItem = styled.label`
  align-items:center;
  background-color:#F5F5F5;
  border-radius:5px;
  color:#FFFFFF;
  cursor:pointer;
  display:flex;
  font-size:20px;
  font-weight:bold;
  height:60px;
  justify-content:center;
  padding:20px;
  min-width:60px;

  input {
    visibility:hidden;
    position:absolute;
  }
  &.unchecked {
    opacity:0.5;
  }
  &.checked {
    opacity:1;
  }
  &.item1 {
    background-color:#B62824;
  }
  &.item2 {
    background-color:#ED3631;
  }
  &.item3 {
    background-color:#F5AC41;
  }
  &.item4 {
    background-color:#69E164;
  }
  &.item5 {
    background-color:#57BC45;
  }
`;

const PesquisaTextArea = styled(TextAreaStyled)`
  background-color:#FFFFFF;
  border:0;
  border-bottom:1px solid #333333;
  border-radius:0;
  transition:all ease 0.5s;
  width:100%;

  &:focus {
    box-shadow:1px 1px 20px rgba(0,0,0,0.2);
  }
`;

FormPesquisa.propTypes = {
  celularExcedido: PropTypes.bool,
  cpfExcedido: PropTypes.bool,
  emailExcedido: PropTypes.bool,
  enviando: PropTypes.bool.isRequired,
  erro: PropTypes.bool.isRequired,
  estado: PropTypes.string,
  estados: PropTypes.arrayOf(PropTypes.object),
  handleEstado: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleUnidade: PropTypes.func.isRequired,
  limitePorUsuario: PropTypes.bool.isRequired,
  pesquisas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    pergunta: PropTypes.string.isRequired,
    tipo: PropTypes.string.isRequired,
    valores: PropTypes.any.isRequired
  })).isRequired,
  repetido: PropTypes.bool.isRequired,
  respostas: PropTypes.object.isRequired,
  setRespostas: PropTypes.func.isRequired,
  setRespostasRadio: PropTypes.func.isRequired,
  unidades: PropTypes.arrayOf(PropTypes.object).isRequired,
  validandoLimite: PropTypes.bool,
  valido: PropTypes.bool.isRequired,
  voucher: PropTypes.shape({
    nome: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    cpf: PropTypes.string,
    celular: PropTypes.string.isRequired,
    unidade: PropTypes.number.isRequired,
    periodo: PropTypes.string.isRequired,
  }).isRequired
};

FormPesquisa.defaultProps = {
  estado: "UF",
  estados: [],
  emailExcedido: false,
  celularExcedido: false,
  cpfExcedido: false,
  validandoLimite: false
};
