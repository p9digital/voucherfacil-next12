import styled from 'styled-components';
import PropTypes from 'prop-types';
import Head from 'next/head';

import { promocaoType, slideType } from '../types';

import { preencherCidadeEscolhida } from '../store/ducks/locais';
import { preencherCliente } from '../store/ducks/clientes';

import PrincipaisPromocoes from '../components/promocoes/PrincipaisPromocoes';
import Slider from '../components/slider/Slider';
import FaixaDefault from '../components/faixas/FaixaDefault';

import { Container } from '../components/ui/Container';
import { buscaPromocoes } from '../services/promocoes';
import { buscaDestaques } from '../services/slider';

const HomeStyled = styled.div``;

const faixaConteudo = {
  textos: {
    destaque: 'Com o Voucher Fácil, você tem acesso às melhores ofertas, e o melhor de tudo: você só paga depois de consumir!',
    normal: 'Nossa plataforma permite que você acesse promoções em restaurantes, lojas e serviços, e garanta a reserva nesses locais, tudo de forma rápida e simples.',
  },
  storageName: 'home',
};

function Home({
  destaques, promocoes,
}) {
  return (
    <HomeStyled>
      <Head>
        <title>Voucher Fácil</title>
        <meta name="description" content="Pegue seu Voucher Fácil em minutos e ganhe descontos nos restaurantes participantes!" />
        <meta name="keywords" content="voucherfacil,voucher facil,voucher,l'entrecote de paris,lentrecote de paris,desconto,restaurante comida francesa,comida francesa" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/static/og.png" />
        <meta property="og:title" content="Voucher Fácil" />
        <meta property="og:description" content="Pegue seu Voucher Fácil em minutos e ganhe descontos nos restaurantes participantes!" />
        <meta property="og:url" content="https://voucherfacil.com.br" />
      </Head>
      <FaixaDefault {...faixaConteudo} />
      <Slider destaquesInitial={destaques} link />
      <Container>
        <PrincipaisPromocoes promocoesInitial={promocoes} />
      </Container>
    </HomeStyled>
  );
}

Home.propTypes = {
  promocoes: PropTypes.arrayOf(promocaoType).isRequired,
  destaques: PropTypes.arrayOf(slideType).isRequired,
};

Home.getInitialProps = async ({ query, reduxStore }) => {
  const {
    promocoes,
    cidade: cidadePromos,
    cliente: clientePromos,
  } = await buscaPromocoes(query);

  const {
    destaques,
    cidade: cidadeDestaques,
    cliente: clienteDestaques,
  } = await buscaDestaques(query);

  const cidade = cidadePromos || cidadeDestaques || null;
  const cliente = clientePromos || clienteDestaques || null;

  // setar na store a cidade e cliente e <escolhidos></escolhidos>
  if (cidade) {
    reduxStore.dispatch(preencherCidadeEscolhida(cidade));
  }

  if (cliente) {
    reduxStore.dispatch(preencherCliente(cliente));
  }

  return {
    promocoes,
    destaques,
    cidade,
    cliente,
  };
};

export default Home;
