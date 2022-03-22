/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from 'styled-components';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

import { Container } from '../../components/ui/Container';
import { Titulo1 } from '../../components/ui/Tipografia';
import Icon from '../../components/ui/Icon';

const PaginaContato = styled.div`
  margin: 4rem 0;
`;

const Titulo1Contato = styled(Titulo1)`
  border-bottom: 1px solid ${(props) => props.theme.lessLighterGrey};
  padding-bottom: 2rem;
  margin-bottom: 2rem;
`;

const SucessoContent = styled.div`
  display: flex;
  margin-top:6rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p{
    font-size: 2.5rem;
    margin: 2rem 0; 
    font-weight: bold;
  }

  a{
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 4rem;
    border-bottom: 2px solid transparent;
    transition: all .2s;

    &:hover {
      border-color: #333;
    }

  }
`;

export default function ContatoSucesso() {
  const router = useRouter();

  useEffect(() => {
    async function getLocalStorage() {
      const localData = await JSON.parse(await localStorage.getItem('@voucher/session-sucesso-contato'));

      if (!localData) {
        router.push('/');
        return false;
      }

      await localStorage.removeItem('@voucher/session-sucesso-contato');
    }

    getLocalStorage();
  }, ['umavez']);

  return (
    <Container>
      <PaginaContato>
        <Head>
          <title>Voucher Fácil - Fale Conosco!</title>
          <meta
            name="description"
            content="Pegue seu Voucher Fácil em minutos e ganhe descontos nos restaurantes participantes!"
          />
          <meta
            property="og:title"
            content="Voucher Fácil - Voucher Fácil - Fale Conosco!"
          />
          <meta
            property="og:description"
            content="Pegue seu Voucher Fácil em minutos e ganhe descontos nos restaurantes participantes!"
          />
          <meta
            property="og:image"
            content="/static/og.png"
          />
          <meta property="og:url" content="https://voucherfacil.com.br/" />
        </Head>
        <Titulo1Contato grande>Contato</Titulo1Contato>
        <SucessoContent>
          <Icon tamanho="6rem" icon="success" cor="#7CE061" />
          <p>Contato enviado com sucesso!</p>
          <Link href="/">
            <a>Continue navegando pelo site.</a>
          </Link>
        </SucessoContent>
      </PaginaContato>
    </Container>
  );
}
