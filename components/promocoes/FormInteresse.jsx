/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';

import { celularMask } from '../../helpers/masks';

import {
  Form, BotaoSubmit, Campos, FormWrapperStyled, Topo,
} from '../formulario/Form';

import Input from '../formulario/Input';
import Select from '../formulario/Select';
import InputMasked from '../formulario/InputMasked';
import Loader from '../formulario/Loader';
import Icon from '../ui/Icon';

import { StatusWrapper, ErroStatus } from '../formulario/Status';
import { validaTelefone, estados } from '../../helpers/formulario';

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%; 
`;

export default function FormInteresse({
  erro,
  enviando,
  interesse,
  cidades,
  handleEstado,
  handleSubmit,
  handleInput,
  valido,
}) {
  return (
    <FormWrapperStyled>
      {erro && !enviando && (
        <StatusWrapper light>
          <ErroStatus color="#162942">
            <Icon
              tamanho="5rem"
              cor="#162942"
              icon="error"
            />
            <p>Ocorreu um erro inesperado!</p>
            <Link href="/">
              <a>Clique aqui e tente novamente</a>
            </Link>
          </ErroStatus>
        </StatusWrapper>
      )}
      {!erro && enviando && (
        <StatusWrapper light>
          <p className="loader-texto">
            Enviando seu contato!
          </p>
          <Loader color="#162942" />
        </StatusWrapper>
      )}
      {!erro && !enviando && (
      <Form onSubmit={handleSubmit} light>
        <Topo desativado light>
          <strong>
            Oferta encerrada!
            {' '}
            &#128546;
          </strong>
          <br />
          Gostaria de ver esta oferta novamente ativa no Voucher Fácil?
          Deixe seu contato e nos ajude a convencer o estabelecimento.
        </Topo>
        <Campos>
          <Input
            name="nome"
            label="nome"
            placeholder="Nome completo"
            handleChange={handleInput}
            value={interesse.nome}
            type="text"
            color="claro"
            valido={!(!valido && !interesse.nome)}
          />
          <Input
            name="email"
            label="email"
            placeholder="Seu melhor e-mail"
            handleChange={handleInput}
            value={interesse.email}
            type="email"
            color="claro"
            valido={!(!valido && !interesse.email)}
          />
          <InputMasked
            name="celular"
            label="celular"
            placeholder="Celular"
            handleChange={handleInput}
            value={interesse.celular}
            type="tel"
            color="claro"
            mask={celularMask}
            valido={interesse.celular ? validaTelefone(interesse.celular) : !!valido}
          />
          <InputGroup>
            <Select
              name="uf"
              label="uf"
              placeholder="UF"
              handleChange={handleEstado}
              value={interesse.uf ? interesse.uf : ""}
              type="text"
              color="claro"
              options={estados}
              valido={!(!valido && !interesse.uf)}
              simpleValue
              tiny
            />
            <Select
              name="cidade"
              label="cidade"
              placeholder="Cidade"
              handleChange={handleInput}
              value={interesse.cidade ? interesse.cidade : ""}
              type="text"
              color="claro"
              options={cidades}
              valido={!(!valido && !interesse.cidade)}
              simpleValue
              medium
            />
          </InputGroup>
          <BotaoSubmit type="submit" light aria-label="Me avise sobre Ofertas">
            <span>
              ME AVISE SOBRE OFERTAS
            </span>
          </BotaoSubmit>
        </Campos>
      </Form>
      )}
    </FormWrapperStyled>
  );
}

FormInteresse.propTypes = {
  interesse: PropTypes.shape({
    nome: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    celular: PropTypes.string.isRequired,
    cidade: PropTypes.string,
    uf: PropTypes.string,
  }),
  handleSubmit: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleEstado: PropTypes.func.isRequired,
  valido: PropTypes.bool.isRequired,
  enviando: PropTypes.bool.isRequired,
  erro: PropTypes.bool.isRequired,
  cidades: PropTypes.arrayOf(PropTypes.string).isRequired,

};

FormInteresse.defaultProps = {
  interesse: PropTypes.shape({
    cidade: '',
    uf: '',
  }),
};
