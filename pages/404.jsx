import Head from 'next/head';
import { Container } from '../components/ui/Container';
import { Titulo1 } from '../components/ui/Tipografia';

export default function Error404Page() {
  return (
    <>
      <Head>
        <title>Voucher Fácil - Página não encontrada</title>
        <meta
          name="description"
          content="Ops, tivemos um erro"
        />
        <meta
          property="og:title"
          content="Voucher Fácil - Página não encontrada"
        />
        <meta
          property="og:description"
          content="Ops, tivemos um erro"
        />
        <meta
          property="og:image"
          content="/static/og.png"
        />
        <meta property="og:url" content="https://voucherfacil.com.br/404" />
      </Head>
      <Container>
        <Titulo1>Página não encontrada</Titulo1>
      </Container>
    </>
  );
}
