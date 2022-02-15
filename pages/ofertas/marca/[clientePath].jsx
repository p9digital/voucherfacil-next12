/* eslint-disable react/forbid-prop-types */
import Head from 'next/head';
import PropTypes from 'prop-types';

import { buscaPromocoes } from '../../../services/promocoes';
import { Container } from '../../../components/ui/Container';

import Banner from '../../../components/banner/Banner';
import PrincipaisPromocoes from '../../../components/promocoes/PrincipaisPromocoes';

export default function Cliente({ clientePath, promocoes, cliente }) {
  const bannerCliente = [
    {
      path: `${process.env.STORAGE_BASE_URL}/${clientePath}/banner750.png`,
      type: 'png',
      maxWidth: '750',
    },
    {
      path: `${process.env.STORAGE_BASE_URL}/${clientePath}/banner750.webp`,
      type: 'webp',
      maxWidth: '750',
    },
    {
      path: `${process.env.STORAGE_BASE_URL}/${clientePath}/banner1920.png`,
      type: 'png',
    },
    {
      path: `${process.env.STORAGE_BASE_URL}/${clientePath}/banner1920.webp`,
      type: 'webp',
    },
  ];

  return (
    <>
      <Head>
        <title>{`Voucher Fácil - ${cliente.nomeFantasia}`}</title>
        <meta
          name="description"
          content={`Veja as melhres ofertas oferecidas por ${cliente.nomeFantasia}, aproveite!`}
        />
        <meta
          property="og:title"
          content={`Voucher Fácil - ${cliente.nomeFantasia}`}
        />
        <meta
          property="og:description"
          content={`Veja as melhres ofertas oferecidas por ${cliente.nomeFantasia}, aproveite!`}
        />
        <meta
          property="og:image"
          content={`${process.env.STORAGE_BASE_URL}/${clientePath}/banner750.png`}
        />
        <meta property="og:url" content={`https://voucherfacil.com.br/ofertas/marca/${clientePath}`} />
      </Head>
      <Banner banner={bannerCliente} />
      <Container maxWidth="1100px">
        <PrincipaisPromocoes promocoesInitial={promocoes} />
      </Container>
    </>
  );
}

Cliente.getInitialProps = async ({ query }) => {
  const { clientePath } = query;
  const { promocoes, cliente } = await buscaPromocoes({
    clientePath: query.clientePath,
    cidadePath: query.cidade,
  });

  return { clientePath, promocoes, cliente };
};

Cliente.propTypes = {
  promocoes: PropTypes.array.isRequired,
  cliente: PropTypes.shape({
    nomeFantasia: PropTypes.string.isRequired,
  }).isRequired,
  clientePath: PropTypes.string.isRequired,
};
