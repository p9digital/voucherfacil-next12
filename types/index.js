/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
// alguns propTypes foram gerados usando a ferramenta https://transform.now.sh/

const {
  shape, number, string, arrayOf, bool, any, array,
} = PropTypes;

export const clienteType = shape({
  id: number,
  nome: string,
  path: string,
});

export const cidadeType = shape({
  id: number,
  codcidade: number,
  nome: string,
  uf: string,
  prioridade: number,
  path: string,
  path_com_uf: string,
});

export const slideType = shape({
  id: number,
  cidade_id: number,
  visivel_somente_cidade: number,
  titulo: string,
  subtitulo: string,
  descricao: string,
  link: string,
  foto_original: string,
  foto_desk_xxl: string,
  foto_desk_xl: string,
  foto_desk: string,
  foto_mob: string,
  foto_mob_xs: string,
  foto_mob_xxs: string,
  status: number,
  created_at: string,
  updated_at: string,
});

export const unidadeType = shape({
  id: number,
  cliente_id: number,
  nome: string,
  path: string,
  estado_id: number,
  cidade_id: number,
  bairro: string,
  endereco: string,
  numero: string,
  complemento: any,
  telefone: string,
  telefone2: any,
  lat: string,
  lng: string,
  mapsId: any,
  facebook: string,
  instagram: string,
  created_at: string,
  updated_at: any,
  status: string,
  dias_fechados: array,
});

export const periodoType = shape({
  id: number,
  promocaounidade_id: number,
  nome: string,
  periodo: string,
  ordem: number,
  created_at: string,
  updated_at: any,
  status: string,
});

export const fotoType = shape({
  id: number,
  promocao_id: number,
  arquivo: string,
  ordem: number,
  created_at: any,
  updated_at: string,
  status: string,
  foto_desktop: string,
  foto_mob: string,
  foto_card: string,
  foto_desktop_xl: string,
  foto_mob_xs: string,
});

export const promocaoType = shape({
  id: number,
  cliente_id: number,
  titulo: string,
  path: string,
  resumo: string,
  descricao: any,
  regras: string,
  observacoes: any,
  desconto: string,
  valor: any,
  codigo: string,
  dataInicio: string,
  dataFim: string,
  dataPublicacao: string,
  pessoas: string,
  periodo: string,
  agendamento: string,
  limite: number,
  imagem: any,
  metaDescription: string,
  metaKeywords: string,
  codigosAcompanhamento: string,
  codigosConversao: string,
  mostrar: string,
  created_at: string,
  updatet_at: any,
  status: string,
  valor_de: number,
  valor_atual: number,
  numero_pessoas: number,
  carregando: bool,
  promocaounidades: arrayOf(
    shape({
      id: number,
      promocao_id: number,
      unidade_id: number,
      ordem: number,
      created_at: string,
      updated_at: any,
      status: string,
      diasDesabilitados: array,
      unidade: unidadeType,
      periodos: arrayOf(periodoType),
    }),
  ),
  fotos: arrayOf(fotoType),
});
