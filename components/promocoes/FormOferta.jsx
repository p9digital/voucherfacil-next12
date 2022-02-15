/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Link from 'next/link';
import styled from 'styled-components';

import { SingleDatePicker } from 'react-dates';

import { celularMask, cpfMask } from '../../helpers/masks';

import {
  Form, BotaoSubmit, Campos, FormWrapperStyled, Topo,
} from '../formulario/Form';

import Input from '../formulario/Input';
import InputMasked from '../formulario/InputMasked';
import Select from '../formulario/Select';
import Loader from '../formulario/Loader';
import Icon from '../ui/Icon';

import { StatusWrapper, ErroStatus } from '../formulario/Status';
import { DatePickerWrapper } from '../formulario/DatePickerInput';
import { validaCpf, validaTelefone } from '../../helpers/formulario';

import 'react-dates/initialize';

// const InformacaoVouchers = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 1rem;

//   svg {
//     @media(max-width: 600px) {
//       display: none;
//     }
//   }

//   p {
//     color: #fff;
//     font-size: 1.8rem;
//     font-weight: bold; 
//     margin-left: 1rem;
//     text-align: center;

//     @media(max-width: 600px) {
//       font-size: 1.6rem;
//       margin-left: 0;
//     }
//   }
// `;

moment.locale('pt-br');

export default function FormOferta({
  estado,
  voucher,
  focus,
  date,
  limite,
  limitePorUsuario,
  limiteVouchers,
  unidades,
  estados,
  periodos,
  unidadeEscolhida,
  handleSubmit,
  handleInput,
  handleUnidade,
  handleEstado,
  setFocus,
  valido,
  erro,
  enviando,
  diasRange,
  handleDiasBloqueados,
  handleDate,
  repetido,
  dataInicio,
  dataFim,
  emailExcedido,
  cpfExcedido,
  celularExcedido,
  validandoLimite
}) {
  const [listaEstados, setListaEstados] = useState([]);
  
  useEffect(() => {
    const lista = estados.map((est) => {
      return est.nome;
    });
    setListaEstados(lista);
  }, []);

  function isToday(day) {
    const DatepickerData = day.format('YYYY-MM-DD');
    const InitialPromoData = moment(dataInicio).format('YYYY-MM-DD');
    const MomentTodayData = moment().format('YYYY-MM-DD');

    const CompareData = MomentTodayData > InitialPromoData ? MomentTodayData : InitialPromoData;

    return DatepickerData < CompareData;
  }
  function verifyStartDate(dataVerificar) {
    return (moment(dataVerificar).year() == moment().year() && moment(dataVerificar).month() > moment().month())
    || (moment(dataVerificar).year() > moment().year());
  }

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
      <Form onSubmit={handleSubmit}>
        <Topo>
          Preencha o formulário e receba
          {' '}
          <strong>gratuitamente</strong>
          {' '}
          seu Voucher Fácil
        </Topo>
        <Campos>
          <Input
            name="nome"
            label="nome"
            placeholder="Nome completo"
            handleChange={handleInput}
            value={voucher.nome}
            type="text"
            color="escuro"
            valido={!(!valido && !voucher.nome)}
          />
          <Input
            name="email"
            label="email"
            placeholder="Seu melhor e-mail"
            handleChange={handleInput}
            value={voucher.email}
            type="email"
            color="escuro"
            valido={!(!valido && !voucher.email) && !emailExcedido}
          />
          {
            limitePorUsuario && (
              <InputMasked
                name="cpf"
                label="cpf"
                placeholder="CPF"
                handleChange={handleInput}
                value={voucher.cpf}
                type="tel"
                color="escuro"
                mask={cpfMask}
                valido={!(!valido && (voucher.cpf ? !validaCpf(voucher.cpf) : !valido)) && !cpfExcedido}
              />
            )
          }
          <InputMasked
            name="celular"
            label="celular"
            placeholder="Celular"
            handleChange={handleInput}
            value={voucher.celular}
            type="tel"
            color="escuro"
            mask={celularMask}
            valido={!(!valido && (voucher.celular ? !validaTelefone(voucher.celular) : !valido)) && !celularExcedido}
          />
          {
            listaEstados.length > 1 ? (
              <Select
                name="estado"
                label="estado"
                placeholder="UF"
                handleChange={handleEstado}
                value={estado}
                type="text"
                color="escuro"
                options={listaEstados}
                valido
                simpleValue
              />
            ) : (
              <></>
            )
          }
          <Select
            name="unidade"
            label="unidade"
            placeholder="Unidade"
            handleChange={handleUnidade}
            value={voucher.unidade}
            type="text"
            color="escuro"
            options={unidades}
            groups={estados}
            groupsFiltrado={estado != "" && estado != "UF"}
            valido={!(!valido && !voucher.unidade)}
          />
          {unidadeEscolhida && unidadeEscolhida.name && (
            <DatePickerWrapper
              valido={!(!valido && !date)}
            >
              <SingleDatePicker
                date={date}
                onDateChange={handleDate}
                focused={focus}
                onFocusChange={({ focused }) => setFocus(focused)}
                id="your_unique_id"
                numberOfMonths={1}
                block
                placeholder="Data do agendamento"
                isOutsideRange={!diasRange ? () => diasRange === 0 : (day) => isToday(day, diasRange) || day.isAfter(moment(dataInicio).add(diasRange, 'days')) || day.isAfter(moment(dataFim))}
                initialVisibleMonth={() => verifyStartDate(dataInicio) ? moment(dataInicio) : moment()}
                isDayBlocked={handleDiasBloqueados}
                hideKeyboardShortcutsPanel
                readOnly
              />
            </DatePickerWrapper>
          )}
          {date && unidadeEscolhida && (
            <Select
              name="periodo"
              label="periodo"
              placeholder="Periodo"
              handleChange={handleInput}
              value={voucher.periodo}
              type="text"
              color="escuro"
              options={periodos}
              valido={!(!valido && !voucher.periodo)}
            />
          )}
          {/* {unidadeEscolhida && date && (
            <InformacaoVouchers>
              <Icon
                tamanho="3rem"
                cor="#fff"
                icon="voucher"
              />
              <p>
                {limite > 1 ? `Restam apenas ${limite} vouchers para essa Oferta!` : 'Último voucher disponível para essa Oferta!'}
              </p>
            </InformacaoVouchers>
          )} */}
          {(cpfExcedido || emailExcedido || celularExcedido) && (
            <label className="limite-excedido">Voucher já gerado para o {cpfExcedido && 'CPF '}{celularExcedido && 'celular '}{emailExcedido && 'email '}cadastrado</label>
          )}
          <BotaoSubmit type="submit" aria-label="Quero meu voucher!" disabled={validandoLimite}>
            <span>Quero meu voucher</span>
          </BotaoSubmit>
        </Campos>
      </Form>
      )}
    </FormWrapperStyled>
  );
}

FormOferta.propTypes = {
  estado: PropTypes.string,
  voucher: PropTypes.shape({
    nome: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    cpf: PropTypes.string,
    celular: PropTypes.string.isRequired,
    unidade: PropTypes.number.isRequired,
    periodo: PropTypes.string.isRequired,
  }).isRequired,
  focus: PropTypes.bool.isRequired,
  date: PropTypes.any,
  limite: PropTypes.number.isRequired,
  limitePorUsuario: PropTypes.bool.isRequired,
  limiteVouchers: PropTypes.number.isRequired,
  dataInicio: PropTypes.string.isRequired,
  dataFim: PropTypes.string.isRequired,
  unidades: PropTypes.arrayOf(PropTypes.object).isRequired,
  periodos: PropTypes.arrayOf(PropTypes.object).isRequired,
  unidadeEscolhida: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleUnidade: PropTypes.func.isRequired,
  handleEstado: PropTypes.func.isRequired,
  setFocus: PropTypes.func.isRequired,
  handleDate: PropTypes.func.isRequired,
  valido: PropTypes.bool.isRequired,
  enviando: PropTypes.bool.isRequired,
  erro: PropTypes.bool.isRequired,
  repetido: PropTypes.bool.isRequired,
  diasRange: PropTypes.number.isRequired,
  handleDiasBloqueados: PropTypes.func.isRequired,
  estados: PropTypes.arrayOf(PropTypes.object),
  cpfExcedido: PropTypes.bool,
  emailExcedido: PropTypes.bool,
  celularExcedido: PropTypes.bool,
  validandoLimite: PropTypes.bool
};

FormOferta.defaultProps = {
  date: '',
  estado: "UF",
  estados: [],
  emailExcedido: false,
  celularExcedido: false,
  cpfExcedido: false,
  validandoLimite: false
};
