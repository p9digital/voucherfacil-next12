import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import Head from 'next/head';
import PropTypes from 'prop-types';

import { buscaPesquisa } from '../../../../services/promocoes';

import Detalhes from '../../../../components/promocoes/PromocaoDetalhes';
import Faq from '../../../../components/promocoes/PromocaoFaq';
import TopoOfertaSucesso from '../../../../components/promocoes/TopoOfertaSucesso';
import MapaOferta from '../../../../components/promocoes/MapaOferta';
import OndeOferta from '../../../../components/promocoes/OndeOferta';
import ContatoOferta from '../../../../components/promocoes/ContatoOferta';
import { ButtonDownload } from '../../../../components/ui/Buttons';
import { Container } from '../../../../components/ui/Container';
import { Titulo1 } from '../../../../components/ui/Tipografia';
import Icon from '../../../../components/ui/Icon';

import Gtag from '../../../../helpers/gtag';
import FacebookPixel from '../../../../helpers/pixel';
import CodigoAnalytics from '../../../../helpers/codigoAnalytics';

export default function Agendamento({ promocao }) {
  const [data, setData] = useState({});

  function printGeneratedVoucher() {
    if (typeof document !== 'undefined') {
      window.print();
    }
  }

  useEffect(() => {
    async function getLocalStorage() {
      const localData = await JSON.parse(await localStorage.getItem('@voucher/session-sucesso-voucher'));

      if (!localData) {
        Router.push('/');
        return false;
      }

      await localStorage.removeItem('@voucher/session-sucesso-voucher');
      setData(localData);
    }

    getLocalStorage();
  }, ['']);

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
        <TopoOfertaSucesso {...data} />
        <TextoDownload>Tire um print ou salve seu voucher!</TextoDownload>
        <ButtonWrapper>
          <ButtonDownload
            aria-label="Download PDF"
            onClick={() => printGeneratedVoucher()}
          >
            Download PDF
          </ButtonDownload>
        </ButtonWrapper>
        <LinksCompWrapper>
          <Titulo1>Compartilhe com seus amigos</Titulo1>
          <div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://api.whatsapp.com/send?text=https://voucherfacil.com.br/oferta/${promocao.cliente.path}/${promocao.path}`}
            >
              <Icon
                icon="whatsapp"
                tamanho="2.5rem"
                cor="#007CE5"
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.facebook.com/sharer/sharer.php?u=https://voucherfacil.com.br/oferta/${promocao.cliente.path}/${promocao.path}`}
            >
              <Icon
                icon="facebook"
                tamanho="2.5rem"
                cor="#007CE5"
              />
            </a>
          </div>
        </LinksCompWrapper>
        <OndeOferta
          cidade={data.unidade && data.unidade.cidade}
          uf={data.unidade && data.unidade.uf}
          endereco={data.unidade && data.unidade.endereco}
          numero={data.unidade && data.unidade.numero}
          bairro={data.unidade && data.unidade.bairro}
        />
        <ContatoOferta telefone={data.unidade && data.unidade.contato} />
        <Detalhes {...data.promocao} />
        <Faq />
      </Container>
      {
        data.unidade && data.unidade.lat && data.unidade.lng
        && (
          <MapaOferta
            lat={data.unidade && data.unidade.lat}
            lng={data.unidade && data.unidade.lng}
            busca={data.unidade && data.promocao && `${data.promocao.cliente.nomeFantasia},${data.unidade.endereco},${data.unidade.numero},${data.unidade.bairro},${data.unidade.cidade}`}
          />
        )
      }
    </SucessoPagina>
  );
}

const SucessoPagina = styled.div`
  padding: 0 1.5rem 3rem;
`;

const TextoDownload = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  @media print {
    display: none;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const LinksCompWrapper = styled.div`
  margin: 2rem 0;
  padding: 2rem 0;
  border-top: .5px solid lightgray;
  border-bottom: .5px solid lightgray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 270px;
  margin: 4rem auto;

  @media print {
    display: none;
  }

  p {
    font-weight: bold;
  }

  div {
    display: flex;

    a {
      margin: 1rem 0.5rem;
    }
  }
`;

Agendamento.propTypes = {
  promocao: PropTypes.isRequired,
};

Agendamento.getInitialProps = async ({ query }) => {
  const { cliente, oferta } = query;
  const { promocao } = await buscaPesquisa(cliente, oferta);

  return { promocao, cliente, oferta };
};
