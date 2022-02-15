import { useEffect } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { buscaPromocao, buscaPromocoes } from '../../../../services/promocoes';
import { ButtonDownload } from '../../../../components/ui/Buttons';
import { Container } from '../../../../components/ui/Container';
import { Titulo1 } from '../../../../components/ui/Tipografia';

import OfertasRecomendadas from '../../../../components/promocoes/OfertasRecomendadas';
import Gtag from '../../../../helpers/gtag';
import FacebookPixel from '../../../../helpers/pixel';
import CodigoAnalytics from '../../../../helpers/codigoAnalytics';

const SucessoPagina = styled.div`
  padding: 4rem 1.5rem;
`;

const TituloInteresse = styled(Titulo1)`
  text-align: center;
`;

const Descricao = styled.div`
  padding: 2rem 0 6rem;

  p {
    text-align: center;
    font-size: 2rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export default function Interesse({ promocao, promocoes }) {
  useEffect(() => {
    async function getLocalStorage() {
      const localData = await JSON.parse(await localStorage.getItem('@voucher/session-interesse-voucher'));

      if (!localData) {
        Router.push('/');
        return false;
      }

      await localStorage.removeItem('@voucher/session-interesse-voucher');
    }

    getLocalStorage();
  }, []);

  return (
    <SucessoPagina id="sucesso-print-page">
      <Head>
        <title>{`Voucher Fácil - ${promocao.titulo}`}</title>
        <meta
          name="description"
          content={`${promocao.metaDescription}`}
        />
        <meta
          property="og:title"
          content={`Voucher Fácil - ${promocao.titulo}`}
        />
        <meta
          property="og:description"
          content={`${promocao.metaDescription}`}
        />
        <meta
          property="og:image"
          content={`${promocao.imagem}`}
        />
        <meta property="og:url" content={`https://voucherfacil.com.br/oferta/${promocao.cliente.path}/${promocao.path}`} />
        <FacebookPixel code={promocao.codigosAcompanhamento} />
        <CodigoAnalytics code={promocao.codigosAnalytics} />
        <Gtag code={promocao.codigosConversao} />
      </Head>
      <Container maxWidth="1100px">
        <TituloInteresse grande>Interesse cadastrado com sucesso!</TituloInteresse>
        <Descricao>
          <p>
            Foi registrado o interesse na promoção
            {' '}
            {' '}
            <strong>{promocao.titulo}</strong>
            , assim que a promoção estiver disponível, estraremos em contato.
          </p>
        </Descricao>
        <ButtonWrapper>
          <Link href="/">
            <ButtonDownload aria-label="Confira outras ofertas!">Confira outras ofertas!</ButtonDownload>
          </Link>
        </ButtonWrapper>
      </Container>
      <OfertasRecomendadas promocoes={promocoes} promocaoAtualId={promocao.id} />
    </SucessoPagina>
  );
}

Interesse.getInitialProps = async ({ query }) => {
  const { cliente, oferta } = query;
  const { promocao } = await buscaPromocao(cliente, oferta);
  const { promocoes } = await buscaPromocoes({ clientePath: cliente });

  return {
    promocao, cliente, oferta, promocoes,
  };
};

Interesse.propTypes = {
  promocao: PropTypes.shape({
    id: PropTypes.number.isRequired,
    codigosAcompanhamento: PropTypes.string.isRequired,
    codigosConversao: PropTypes.string.isRequired,
    codigosAnalytics: PropTypes.string,
    titulo: PropTypes.string.isRequired,
    metaDescription: PropTypes.string.isRequired,
    imagem: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    cliente: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  promocoes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    codigosAcompanhamento: PropTypes.string.isRequired,
    codigosConversao: PropTypes.string.isRequired,
    codigosAnalytics: PropTypes.string,
    titulo: PropTypes.string.isRequired,
    metaDescription: PropTypes.string.isRequired,
    imagem: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    cliente: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
  }))
};

Interesse.defaultProps = {
  promocoes: []
};
