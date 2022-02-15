/* eslint-disable camelcase */
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { promocaoType } from '../../types';
import { cortaTexto, removeTags } from '../../helpers/strings';
import { centavosParaReais } from '../../helpers/valores';
import { geraPathPromocao, pegaFotoPrincipal } from '../../helpers/promocoes';
import { pegaFotoResponsivaDisponivel } from '../../helpers/fotos';

import CardPromocaoSkeleton from './CardPromocaoSkeleton';

// separando estilos somente por ser muito grande
import {
  Card,
  CardConteudo,
  CardLink,
  PromocaoImagem,
  DestaqueCirculo,
  DestaquesLista,
  TextosWrapper,
  CidadeNome,
  Descricao,
  PrecoAnterior,
  PrecoAtual,
  PrecosWrapper,
  BotaoAproveitar,
} from './styles';

import { Titulo1 } from '../ui/Tipografia';

const CardPromocao = ({
  promocao: {
    path,
    cliente,
    fotos,
    titulo,
    descricao,
    resumo,
    desconto,
    cidade,
    valor_de,
    valor_atual,
    carregando,
  },
}) => {
  const pathPromocao = geraPathPromocao(cliente, path);

  const fotoPrincipalUrl = pegaFotoResponsivaDisponivel({
    objeto: pegaFotoPrincipal(fotos),
    tamanhoDesejado: 'card',
    prefixo: 'foto_',
    adicionarBaseUrl: true,
  });

  return !carregando ? (
    <Card>
      <Link href={pathPromocao}>
        <CardLink title={titulo}>
          <picture>
            <source
              type="image/webp"
              srcSet={`${fotoPrincipalUrl}.webp`}
            />
            <source
              srcSet={`${fotoPrincipalUrl}.png`}
            />
            <PromocaoImagem loading="lazy" src={`${fotoPrincipalUrl}.png`} alt={titulo} />
          </picture>
          <CardConteudo>
            {!!desconto && (
            <DestaquesLista>
              <DestaqueCirculo>{desconto}</DestaqueCirculo>
            </DestaquesLista>
            )}
            <TextosWrapper>
              <Titulo1>{titulo}</Titulo1>
              <CidadeNome>{cidade && cidade.nome}</CidadeNome>
              <Descricao>{cortaTexto(removeTags(descricao || resumo), 100, true)}</Descricao>
            </TextosWrapper>
            <PrecosWrapper>
              {!!valor_de && (
              <PrecoAnterior>
                R$
                {centavosParaReais(valor_de)}
              </PrecoAnterior>
              )}
              {valor_atual != null && (
              <PrecoAtual>
                {
                  valor_atual === 0 ?
                  "Grátis" :
                  ("R$" + centavosParaReais(valor_atual))
                }
              </PrecoAtual>
              )}
            </PrecosWrapper>
            <BotaoAproveitar aria-label="Pegar voucher!">Pegar voucher</BotaoAproveitar>
          </CardConteudo>
        </CardLink>
      </Link>
    </Card>
  ) : (
    <CardPromocaoSkeleton />
  );
};

CardPromocao.propTypes = {
  promocao: promocaoType,
};

CardPromocao.defaultProps = {
  promocao: {
    carregando: true,
  },
};

export default CardPromocao;
