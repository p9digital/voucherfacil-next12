import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';

import { promocaoType, slideType } from '../../../types';

import Slider from '../../../components/slider/Slider';
import Banner from '../../../components/banner/Banner';
import { Container } from '../../../components/ui/Container';
import { buscaPromocoes } from '../../../services/promocoes';
import { buscaDestaques } from '../../../services/slider';
import { preencherCidadeEscolhida } from '../../../store/ducks/locais';

import PrincipaisPromocoes from '../../../components/promocoes/PrincipaisPromocoes';

function CidadeOferta({
  destaques, promocoes, cidade,
}) {
  const { cidades } = useSelector(({ locais }) => locais);
  const dispatch = useDispatch();

  const {
    id, uf, path: cidadePath, nome,
  } = cidades.find(({ path }) => `${path}` === `${cidade.path}`) || {};

  const cidadePagina = {
    id, uf, path: cidadePath, nome,
  };

  const bannerCidade = [
    {
      path: '/static/banners/banner-cidade-750.png',
      type: 'png',
      maxWidth: '750',
    },
    {
      path: '/static/banners/banner-cidade-750.webp',
      type: 'webp',
      maxWidth: '750',
    },
    {
      path: '/static/banners/banner-cidade-1920.webp',
      type: 'webp',
    },
    {
      path: '/static/banners/banner-cidade-1920.png',
      type: 'png',
    },
  ];

  useEffect(() => {
    function storeCidade() {
      dispatch(preencherCidadeEscolhida(cidadePagina));
    }

    storeCidade();
  }, []);

  return (
    <>
      <Head>
        <title>{`Voucher Fácil - ${cidadePagina.nome}`}</title>
        <meta
          name="description"
          content={`Veja as melhres ofertas para ${cidadePagina.nome}, aproveite!`}
        />
        <meta
          property="og:title"
          content={`Voucher Fácil - ${cidadePagina.nome}`}
        />
        <meta
          property="og:description"
          content={`Veja as melhres ofertas para ${cidadePagina.nome}, aproveite!`}
        />
        <meta
          property="og:image"
          content="/static/og.png"
        />
        <meta property="og:url" content={`https://voucherfacil.com.br/ofertas/${cidadePagina.uf}/${cidadePagina.path}`} />
      </Head>
      {destaques && destaques.length < 1 ? (
        <Banner banner={bannerCidade} texto={cidadePagina.nome} />
      ) : (
        <Slider destaquesInitial={destaques} link />
      )}
      <Container>
        {cidade && (
          <PrincipaisPromocoes cidade={cidadePagina} promocoesInitial={promocoes} withLocation />
        )}
      </Container>
    </>
  );
}

CidadeOferta.propTypes = {
  promocoes: PropTypes.arrayOf(promocaoType).isRequired,
  destaques: PropTypes.arrayOf(slideType).isRequired,
  cidade: PropTypes.shape({
    path: PropTypes.string.isRequired,
    uf: PropTypes.string.isRequired,
  }).isRequired,
};

CidadeOferta.getInitialProps = async ({ query }) => {
  const {
    promocoes,
  } = await buscaPromocoes(query);

  const {
    destaques,
  } = await buscaDestaques({ cidadePath: query.cidadePath, uf: query.uf });

  const cidade = {
    path: query.cidadePath,
    uf: query.uf,
  };

  return {
    promocoes,
    destaques,
    cidade,
  };
};

export default CidadeOferta;
