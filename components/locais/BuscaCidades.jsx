/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Icon from '../ui/Icon';

import { preencherCidadeEscolhida } from '../../store/ducks/locais';

const BuscaWrapper = styled.div`
  position: relative;
  max-width: 40rem;
  width: 100%;
`;

const IconBusca = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  fill: ${(props) => props.theme.cores.um};
`;

const SelectCidades = styled.select`
  background: #fff;
  border-radius: 20px;
  border: none;
  padding: 0.8rem 0.6rem;
  padding-left: 3rem;
  color: ${(props) => props.theme.grey};
  font-size: 16px;
  width: 100%;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  transition: all 0.2s;
  outline: none;
`;

function BuscaCidades({ className }) {
  const { cidades, cidadeEscolhida } = useSelector(({ locais }) => locais);
  const [estadosFiltrados, setEstadosFiltrados] = useState([]);

  const dispatch = useDispatch();

  const router = useRouter();

  const onCidadeSelecionada = ({ currentTarget: { value } }) => {
    if (value === 'geral') {
      router.push('/');
      dispatch(preencherCidadeEscolhida('geral'));
      return false;
    }

    const { uf, path, nome } = cidades.find(({ id }) => `${id}` === `${value}`) || {};

    const cidade = {
      id: value, uf, path, nome,
    };

    dispatch(preencherCidadeEscolhida(cidade));

    router.push(`/ofertas/${cidade.uf.toLowerCase()}/${cidade.path}`);
  };

  useEffect(() => {
    function montandoEstadosAtivos() {
      const estados = cidades.map((cidade) => ({
        id: cidade.uf,
        uf: cidade.uf,
        nome: cidade.estado ? cidade.estado.nome : "",
      }));

      // Removendo os valores repetidos
      const uniq = {};
      const novosEstados = estados.filter((obj) => !uniq[obj.id] && (uniq[obj.id] = true));

      setEstadosFiltrados(novosEstados);
    }

    montandoEstadosAtivos();
  }, [cidadeEscolhida]);

  return (
    <BuscaWrapper className={className}>
      <IconBusca icon="location" tamanho="2rem" />
      <SelectCidades aria-label="Selecionar Cidades" onChange={onCidadeSelecionada} value={cidadeEscolhida.id}>
        <option value="geral">Brasil</option>
        {estadosFiltrados.map((estado) => (
          <optgroup label={estado.nome} key={estado.id}>
            {cidades.length ? (
              cidades.map(({ id, nome, uf }) => {
                if (estado.uf === uf) {
                  return (
                    <option key={id} value={id}>
                      {nome}
                    </option>
                  );
                }
              })
            ) : (
              <option disabled>Buscando...</option>
            )}
          </optgroup>
        ))}
      </SelectCidades>
    </BuscaWrapper>
  );
}

BuscaCidades.propTypes = {
  className: PropTypes.string,
};

BuscaCidades.defaultProps = {
  className: '',
};

export default BuscaCidades;
