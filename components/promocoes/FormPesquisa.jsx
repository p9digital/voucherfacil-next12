/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';

import { celularMask, cnpjMask, cpfMask, dataMask } from '../../helpers/masks';

import {
  Form, BotaoSubmit, Campos, FormWrapperStyled
} from '../formulario/Form';

import InputPesquisa from '../formulario/InputPesquisa';
import InputMaskedPesquisa from '../formulario/InputMaskedPesquisa';
import SelectPesquisa from '../formulario/SelectPesquisa';
import Loader from '../formulario/Loader';
import Icon from '../ui/Icon';

import { StatusWrapper, ErroStatus } from '../formulario/Status';
import { validaCpf, validaTelefone } from '../../helpers/formulario';

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
  handleAgendarOutroDia,
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
  const [focus, setFocus] = useState(0);
  const [listaEstados, setListaEstados] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipImagem, setTooltipImagem] = useState("");

  useEffect(() => {
    const lista = estados.map((est) => {
      return est.nome;
    });
    setListaEstados(lista);
  }, []);

  function handleShowTooltip(imagem) {
    setShowTooltip(true);
    setTooltipImagem(imagem);
  }

  return (
    <FormWrapperPesquisa className="form-promocao-wrapper">
      {erro && !enviando && (
        <StatusWrapper>
          <ErroStatus color="#FFFFFF">
            <Icon
              tamanho="5rem"
              cor="#fff"
              icon="error"
            />
            <p>{!repetido ? 'Ocorreu um erro inesperado!' : 'Voucher já gerado!'}</p>
            <button type="button" onClick={handleAgendarOutroDia}>
              <i>{!repetido ? 'Clique aqui e tente novamente.' : 'Agende outro dia.'}</i>
            </button>
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
          {/* <PesquisaTopo>
            Responda nossa pesquisa de satisfação e receba <strong>gratuitamente</strong> seu Voucher Fácil
          </PesquisaTopo> */}
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
                    <>
                      <Campo key={pergunta.id}>
                        {/* <label>{pergunta.pergunta}</label> */}

                        <InputPesquisa
                          name={`${pergunta.id}`}
                          label={pergunta.pergunta}
                          value={respostas[pergunta.id - 1] ? respostas[pergunta.id - 1] : ""}
                          handleChange={setRespostas}
                          placeholder={pergunta.pergunta}
                          type={pergunta.tipo}
                          valido={!(!valido && !respostas[pergunta.id - 1])}
                          icone=""
                          required={pergunta.required}
                        />
                      </Campo>
                      {pergunta.tooltip && <TooltipButton type="button" onClick={() => handleShowTooltip(pergunta.tooltip.imagem)}>{pergunta.tooltip.texto}</TooltipButton>}
                    </>
                  );
                } else if (pergunta.tipo == "cnpj") {
                  campo = (
                    <Campo key={pergunta.id}>
                      {/* <label>{pergunta.pergunta}</label> */}

                      <InputMaskedPesquisa
                        name={`${pergunta.id}`}
                        label={pergunta.pergunta}
                        placeholder={pergunta.pergunta}
                        handleChange={setRespostas}
                        value={respostas[pergunta.id - 1] ? respostas[pergunta.id - 1] : ""}
                        type="text"
                        icone=""
                        mask={cnpjMask}
                        valido={!(!valido && !respostas[pergunta.id - 1])}
                      />
                    </Campo>
                  );
                } else if (pergunta.tipo == "date") {
                  campo = (
                    <Campo key={pergunta.id}>
                      {/* <label>{pergunta.pergunta}</label> */}

                      <InputMaskedPesquisa
                        name={`${pergunta.id}`}
                        label={pergunta.pergunta}
                        placeholder={pergunta.pergunta}
                        handleChange={setRespostas}
                        value={respostas[pergunta.id - 1] ? respostas[pergunta.id - 1] : ""}
                        type="text"
                        icone=""
                        mask={dataMask}
                        valido={!(!valido && !respostas[pergunta.id - 1])}
                      />
                    </Campo>
                  );
                } else if (pergunta.tipo == "datepicker") {
                  campo = (
                    <Campo key={pergunta.id}>
                      {/* <label>{pergunta.pergunta}</label> */}

                      <DatePickerWrapper
                        valido={!(!valido && !respostas[pergunta.id - 1])}
                      >
                        <SingleDatePicker
                          date={respostas[pergunta.id - 1]}
                          onDateChange={(date) => setRespostasRadio(pergunta.id, date)}
                          focused={focus == pergunta.id}
                          onFocusChange={({ focused }) => setFocus(focused ? pergunta.id : 0)}
                          id={`${pergunta.id}`}
                          isOutsideRange={() => false}
                          numberOfMonths={1}
                          minDate={moment("1950-01-01")}
                          block
                          placeholder={pergunta.pergunta}
                          hideKeyboardShortcutsPanel
                        />
                      </DatePickerWrapper>
                    </Campo>
                  );
                } else if (pergunta.tipo == "radio") {
                  campo = (
                    <CampoRadio key={pergunta.id}>
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
                    </CampoRadio>
                  );
                } else if (pergunta.tipo == "select") {
                  campo = (
                    <Campo key={pergunta.id} className={pergunta.classes}>
                      <label>{pergunta.pergunta}</label>
                      <SelectPesquisa
                        name={`${pergunta.id}`}
                        label={pergunta.pergunta}
                        placeholder="Selecione uma opção"
                        handleChange={setRespostas}
                        value={respostas[pergunta.id - 1] ? respostas[pergunta.id - 1] : ""}
                        type="text"
                        options={pergunta.valores}
                        valido={!(!valido && !respostas[pergunta.id - 1])}
                        required={pergunta.required}
                        simpleValue
                      />
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
                        required={pergunta.required}
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
      {
        showTooltip && (
          <Tooltip onClick={() => setShowTooltip(false)}>
            <img alt="Tooltip" src={tooltipImagem} />
          </Tooltip>
        )
      }
    </FormWrapperPesquisa>
  );
}

const FormWrapperPesquisa = styled(FormWrapperStyled)`
  @media (max-width: 900px) {
    margin: 0;
  }
`;

const PesquisaForm = styled(Form)`
  background:none;
  max-width: 100%;
  padding:0;
  
  @media (max-width:420px) {
    padding: 0;
  }
`;

// const PesquisaTopo = styled(Topo)`
//   color:#333333;
// `;

const PesquisaCampos = styled(Campos)`
  padding:0;
`;

const Campo = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:space-between;

  label {
    margin:0 4px;
  }
  &.mb-40 {
    margin-bottom:40px;
  }
`;

const CampoRadio = styled(Campo)`
  margin:10px 0;
`;

const RangeItems = styled.div`
  display:flex;
  justify-content:space-between;
  gap:1rem;

  @media (max-width:460px) {
    flex-wrap:wrap;
  }
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
    opacity:0.3;
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

  @media (max-width:600px) {
    font-size:16px;
    height:45px;
    justify-content:center;
    padding:10px 30px;
  }
  @media (max-width:460px) {
    width:calc(50% - 1.5rem);
  }
`;

const PesquisaTextArea = styled(TextAreaStyled)`
  background-color:#FFFFFF;
  border:0;
  border-bottom:1px solid #333333;
  border-radius:0;
  padding:10px 0;
  transition:all ease 0.5s;
  width:100%;
`;

const DatePickerWrapper = styled.div`
  .SingleDatePickerInput__withBorder {
    border: none;
  }

  .DateInput_input {
    border-bottom: ${(props) => (props.valido ? '1px solid #333333' : '1px solid #E86262')};
    flex: 1;
    font-size: 16px;
    font-weight: normal;
    min-height: 4rem;
    outline: none;
    width: 100%;
  }
  
  .CalendarDay__default {
    background-color:rgba(113, 217, 70, 0.2);
  }
  .CalendarDay__default:hover {
    background-color: #71d946;
    border: 1px solid #e4e7e7;
    color: #fff;
  }
  .CalendarDay__blocked_out_of_range {
    background-color: #FFFFFF;
  }
  .CalendarDay__selected {
    background-color: #71d946;
    border: 1px solid #e4e7e7;
    color: #fff;
  }

  .CalendarDay__blocked_out_of_range:hover {
    background: #fff;
    border: 1px solid #e4e7e7;
    color: #cacccd;
  }

  .CalendarDay__blocked_calendar, .CalendarDay__blocked_calendar:active, .CalendarDay__blocked_calendar:hover {
    background: #fff;
    border: 1px solid #e4e7e7;
    color: #cacccd;
  }
`;

const TooltipButton = styled.button`
  background-color:#333333;
  border:0;
  border-radius:20px;
  color:#FFFFFF;
  display:inline-block;
  float:left;
  margin:auto;
  padding:0 10px;
`;

const Tooltip = styled.div`
  align-items:center;
  background-color:rgba(0,0,0,0.5);
  bottom:0;
  display:flex;
  height:100%;
  justify-content:center;
  left:0;
  position:fixed;
  right:0;
  top:0;
  width:100%;
  z-index:10;
`;

FormPesquisa.propTypes = {
  handleAgendarOutroDia: PropTypes.func.isRequired,
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
