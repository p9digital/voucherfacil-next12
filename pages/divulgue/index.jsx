/* eslint-disable consistent-return */
import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';

import { validacaoDivulgue, validaTelefone } from '../../helpers/formulario';

import { Titulo1 } from '../../components/ui/Tipografia';
import { Container } from '../../components/ui/Container';

import FormDivulgue from '../../components/divulgue/FormDivulgue';

const PaginaContato = styled.div`
  margin: 4rem 0;
`;

const Titulo1Contato = styled(Titulo1)`
  border-bottom: 1px solid ${(props) => props.theme.lessLighterGrey};
  padding-bottom: 2rem;
  margin-bottom: 2rem;
`;

export default function Divulgue() {
  const [contato, setContato] = useState({
    segmento: '',
    atendimento: '',
    nomeEmpresa: '',
    nome: '',
    uf: '',
    cidade: '',
    email: '',
    celular: '',
    ticketMedio: '',
  });

  const [cidades, setCidades] = useState([]);

  const [formController, setFormController] = useState({
    valido: true,
    enviando: false,
    erro: false,
  });

  const router = useRouter();

  function onChange({ currentTarget: { name, value } }) {
    setContato({
      ...contato, [name]: value,
    });
  }

  async function onEstadoChange({ currentTarget: { name, value } }) {
    setCidades([]);
    setContato({ ...contato, cidade: '' });

    const response = await fetch(`${process.env.CIDADE_API_URL}/${value}.json`);
    const data = await response.json();

    setCidades(data);

    setContato({
      ...contato, [name]: value,
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const validou = validacaoDivulgue(contato);
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
      nome_completo: contato.nome,
      nome_empresa: contato.nomeEmpresa,
      email: contato.email,
      whatsapp: contato.celular,
      ticket_medio: contato.ticketMedio,
      uf: contato.uf,
      cidade: contato.cidade,
      segmento_empresa: contato.segmento,
      atendimentos: contato.atendimento,
    };

    try {
      const response = await fetch(`${process.env.API_BASE_URL}/contatoempresa`, {
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

      localStorage.setItem('@voucher/session-sucesso-divulgue', JSON.stringify(dados));

      router.push('/divulgue/sucesso');
    } catch (err) {
      setFormController({
        enviando: false,
        erro: true,
      });
    }
  }

  const atendimentos = [
    { id: 1, value: '1 até 10', name: '1 até 10' },
    { id: 2, value: '11 até 50', name: '11 até 50' },
    { id: 3, value: '51 até 100', name: '51 até 100' },
    { id: 4, value: '101 até 200', name: '101 até 200' },
    { id: 5, value: 'mais que 201', name: 'mais que 201' },
  ];

  const segmentos = [
    { id: 1, value: 'Restaurantes', name: 'Restaurantes' },
    { id: 2, value: 'Ingressos', name: 'Ingressos' },
    { id: 3, value: 'Serviços', name: 'Serviços' },
  ];

  const estados = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];

  return (
    <PaginaContato>
      <Head>
        <title>Voucher Fácil - Divulgue sua Empresa!</title>
        <meta
          name="description"
          content="Pegue seu Voucher Fácil em minutos e ganhe descontos nos restaurantes participantes!"
        />
        <meta
          property="og:title"
          content="Voucher Fácil - Voucher Fácil - Divulgue sua Empresa!"
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
        <Titulo1Contato grande>Divulgue sua empresa</Titulo1Contato>
        <FormDivulgue
          contato={contato}
          segmentos={segmentos}
          atendimentos={atendimentos}
          estados={estados}
          cidades={cidades}
          handleSubmit={onSubmit}
          handleInput={onChange}
          handleEstado={onEstadoChange}
          valido={formController.valido}
          enviando={formController.enviando}
          erro={formController.erro}
        />
      </Container>
    </PaginaContato>
  );
}
