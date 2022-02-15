/* eslint-disable consistent-return */
import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Head from 'next/head';

import { Titulo1 } from '../../components/ui/Tipografia';
import { Container } from '../../components/ui/Container';
import FormContato from '../../components/contato/FormContato';
import { validacaoContato, validaTelefone } from '../../helpers/formulario';

const PaginaContato = styled.div`
  margin: 4rem 0;
`;

const Titulo1Contato = styled(Titulo1)`
  border-bottom: 1px solid ${(props) => props.theme.lessLighterGrey};
  padding-bottom: 2rem;
  margin-bottom: 2rem;
`;

export default function Contato() {
  const [contato, setContato] = useState({
    assunto: '',
    nome: '',
    email: '',
    celular: '',
    mensagem: '',
  });

  const router = useRouter();

  const [formController, setFormController] = useState({
    valido: true,
    enviando: false,
    erro: false,
  });

  function onChange({ currentTarget: { name, value } }) {
    setContato({
      ...contato, [name]: value,
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const validou = validacaoContato(contato);
    const validouTelefone = validaTelefone(contato.celular);

    if (!validou || !validouTelefone) {
      setFormController({
        ...formController,
        valido: false,
      });

      return false;
    }

    setFormController({
      ...formController,
      enviando: true,
    });

    // Preparando o Lead no Formato do Back-end

    const leadPreparado = {
      nome: contato.nome,
      email: contato.email,
      telefone: contato.celular,
      assunto: contato.assunto,
      mensagem: contato.mensagem,
    };

    try {
      const response = await fetch(`${process.env.API_BASE_URL}/contato`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...leadPreparado,
        }),
      });

      const data = await response.json();

      const dados = {
        contato: data.contato,
      };

      localStorage.setItem('@voucher/session-sucesso-contato', JSON.stringify(dados));

      router.push('/contato/sucesso');
    } catch (err) {
      setFormController({
        enviando: false,
        erro: true,
      });
    }
  }

  const assuntos = [
    { id: 1, value: 'Dúvida', name: 'Dúvida' },
    { id: 2, value: 'Contato Comercial', name: 'Contato Comercial' },
    { id: 3, value: 'Outro', name: 'Outro' },
  ];

  return (
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
      <Container maxWidth="1100px">
        <Titulo1Contato grande>Contato</Titulo1Contato>
        <FormContato
          contato={contato}
          assuntos={assuntos}
          handleSubmit={onSubmit}
          handleInput={onChange}
          valido={formController.valido}
          enviando={formController.enviando}
          erro={formController.erro}
        />
      </Container>
    </PaginaContato>
  );
}
