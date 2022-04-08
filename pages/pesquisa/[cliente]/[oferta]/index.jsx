import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import moment from 'moment';
import { Element, scroller } from 'react-scroll';

import FacebookPixel from '../../../../helpers/pixel';
import CodigoAnalytics from '../../../../helpers/codigoAnalytics';
import { promocaoType } from '../../../../types';
import { buscaPesquisa, buscaPromocoes } from '../../../../services/promocoes';
import { preencherCliente } from '../../../../store/ducks/clientes';
import { preencherPages } from '../../../../store/ducks/pages';
import { validacaoPesquisa, validaCpf, validaTelefone } from '../../../../helpers/formulario';

import Topo from '../../../../components/promocoes/PromocaoTopo';
import Detalhes from '../../../../components/promocoes/PromocaoDetalhes';
import Faq from '../../../../components/promocoes/PromocaoFaq';
import ClienteBrand from '../../../../components/clientes/ClienteBrand';
// import MapaOferta from '../../../../components/promocoes/MapaOferta';
import FormPesquisa from '../../../../components/promocoes/FormPesquisa';
import OndeOferta from '../../../../components/promocoes/OndeOferta';
import ContatoOferta from '../../../../components/promocoes/ContatoOferta';
import OfertasRecomendadas from '../../../../components/promocoes/OfertasRecomendadas';
import Icon from '../../../../components/ui/Icon';
import { Titulo1 } from '../../../../components/ui/Tipografia';

import { ButtonBlock } from '../../../../components/ui/Buttons';
import { Container } from '../../../../components/ui/Container';

function Pesquisa({
  promocao: promocaoInitial, cliente, oferta, promocoes, unidadeId,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { clienteAtual } = useSelector(({ clientes }) => clientes);
  const { promocaounidades } = promocaoInitial;
  const [voucher, setVoucher] = useState({
    nome: '',
    email: '',
    cpf: '',
    celular: '',
    unidade: 0,
    periodo: '',
  });
  const [formController, setFormController] = useState({
    valido: true,
    enviando: false,
    erro: false,
    repetido: false,
  });
  const [unidadeEscolhida, setUnidadeEscolhida] = useState({});
  const [unidades, setUnidades] = useState([]);
  const [unidadesFiltradas, setUnidadesFiltradas] = useState([]);
  const [estado, setEstado] = useState("");
  const [estados, setEstados] = useState([]);
  const [promocao, setPromocao] = useState({
    ...promocaoInitial,
    promocao_atualizada: false,
  });
  const [cpfExcedido, setCpfExcedido] = useState(false);
  const [emailExcedido, setEmailExcedido] = useState(false);
  const [celularExcedido, setCelularExcedido] = useState(false);
  const [timer, setTimer] = useState(null);
  const [limitePorUsuario, setLimitePorUsuario] = useState(false);
  const [validandoLimite, setValidandoLimite] = useState(false);
  const [temVouchers, setTemVouchers] = useState(true);
  const [pesquisas, setPesquisas] = useState([]);
  const [respostas, setThisRespostas] = useState({});

  function onChangeFirstUnidade(unidade) {
    console.info(unidade);
    setUnidadeEscolhida(unidade);
  }

  async function onChangeEstado({ currentTarget: { value } }) {
    setEstado(value);
    
    let filtrados = unidades;
    if(value && value != "UF") {
      filtrados = unidades.filter((unid) => {
        return unid.uf == value;
      });
    }
    setUnidadesFiltradas(filtrados);
    // setUnidadeEscolhida({});
  }

  function onChangeUnidade({ currentTarget: { value } }) {
    const unidade = unidades.find((item) => item.id == value);

    setUnidadeEscolhida(unidade);
    setVoucher({ ...voucher, unidade: unidade.id, pedido: null });
  }

  async function onChange({ currentTarget: { name, value } }) {
    if(limitePorUsuario && ["cpf", "email", "celular"].indexOf(name) !== -1) {
      setValidandoLimite(true);
      if(timer) {
        clearTimeout(timer);
      }
      setTimer(setTimeout(async function() {
        const response = await fetch(`${process.env.API_BASE_URL}/vouchers/verificaLimitePorEmailOuCelular`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            campo: name == 'cpf' || name == 'email' ? name : 'telefone',
            valor: value,
            promocao_id: promocaoInitial.id
          })
        });
        const data = await response.json();
        if(data) {
          const excedido = data.data >= promocaoInitial.limite_usuario;
          if(name == 'email') {
            setEmailExcedido(excedido);
          } else if(name == 'cpf') {
            setCpfExcedido(excedido);
          } else {
            setCelularExcedido(excedido);
          }
          setValidandoLimite(false);
        }
      }, 1500));
    }

    setVoucher({
      ...voucher, [name]: value,
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    
    const validou = validacaoPesquisa(voucher);
    const validouTelefone = validaTelefone(voucher.celular);
    
    if (!validou || !validouTelefone || emailExcedido || celularExcedido || pesquisas.length != respostas.length) {
      setFormController({
        ...formController,
        valido: false,
      });

      return false;
    }

    if (limitePorUsuario) {
      const validouCpf = validaCpf(voucher.cpf);
      if (!validouCpf || cpfExcedido) {
        setFormController({
          ...formController,
          valido: false,
        });

        return false;
      }
    }

    setFormController({
      ...formController,
      enviando: true,
    });

    // Preparando o Lead no Formato do Back-end
    const periodo = unidadeEscolhida.periodos[0];

    const leadPreparado = {
      unidade_id: unidadeEscolhida.id,
      promocao_id: promocaoInitial.id,
      nome: voucher.nome,
      email: voucher.email,
      cpf: voucher.cpf,
      telefone: voucher.celular,
      data_voucher: moment().format('YYYY-MM-DD'),
      // data_voucher: moment().format('YYYY-MM-DD').add(20, 'days'),
      horario_voucher: periodo.nome,
      periodo_id: periodo.id,
      pessoas: 1,
      form: 'A',
      pesquisas: JSON.stringify(pesquisas),
      respostas: JSON.stringify(respostas)
    };

    const queryParams = typeof window !== 'undefined' ? queryString.parse(window.location.search) : '';
    const referrer = typeof window !== 'undefined' ? document.referrer : '';

    try {
      const response = await fetch(`${process.env.API_BASE_URL}/voucherPesquisa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...leadPreparado,
          ...queryParams,
          urlorigem: referrer,
        }),
      });

      const data = await response.json();

      if (data.success === false || data.data == 'leadcriado') {
        setFormController({
          enviando: false,
          erro: true,
          repetido: true,
        });

        return false;
      }

      const dados = {
        promocao: promocaoInitial,
        voucher: data.data.voucher,
        dia: data.data.dia,
        periodo: data.data.periodo.nome,
        unidade: unidadeEscolhida,
      };

      localStorage.setItem('@voucher/session-sucesso-voucher', JSON.stringify(dados));

      router.push(`/pesquisa/${promocaoInitial.cliente.path}/${promocaoInitial.path}/agendamento`);
    } catch (err) {
      setFormController({
        enviando: false,
        erro: true,
      });
    }
  }

  function filtrandoUnidades() {
    const novasUnidades = promocaounidades.map((item) => ({
      id: item.unidade.id,
      path: item.unidade.path,
      value: item.unidade.id,
      name: item.unidade.nome,
      diasLimitados: item.diasDesabilitados,
      diasFechados: item.unidade.dias_fechados,
      diasDesativados: item.desabilitados,
      periodos: item.periodos,
      contato: item.unidade.telefone,
      complemento: item.unidade.complemento,
      endereco: item.unidade.endereco,
      numero: item.unidade.numero,
      bairro: item.unidade.bairro,
      cidade: item.unidade.cidade.nome,
      uf: item.unidade.cidade.uf,
      lng: item.unidade.lng,
      lat: item.unidade.lat,
      limite: item.vouchersRestantes,
    }));

    novasUnidades.sort((a, b) => {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    });

    const estadosTotais = promocaounidades.map((item) => ({
      id: item.unidade.cidade.uf,
      nome: item.unidade.cidade.uf,
    }));

    // Removendo os valores repetidos
    const uniq = {};
    const novosEstados = estadosTotais.filter((obj) => !uniq[obj.id] && (uniq[obj.id] = true));

    novosEstados.sort((a, b) => {
      if (a.nome < b.nome) { return -1; }
      if (a.nome > b.nome) { return 1; }
      return 0;
    });

    setEstados(novosEstados);

    if (novasUnidades.length > 1) {
      setUnidades(novasUnidades);
      setUnidadesFiltradas(novasUnidades);
    } else {
      setVoucher({
        ...voucher,
        unidade: novasUnidades[0].id,
      });

      setUnidades(novasUnidades);
      setUnidadesFiltradas(novasUnidades);
      onChangeFirstUnidade(novasUnidades[0]);
    }
  }

  function scrollToForm() {
    scroller.scrollTo('form', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  }

  const atualizarPromocao = async () => {
    const { promocao: promocaoAtualizada } = await buscaPesquisa(
      cliente,
      oferta,
    );

    setPromocao({
      ...promocaoAtualizada,
      promocao_atualizada: true,
    });
  };

  const setRespostas = ({ currentTarget: { name, value } }) => {
    const index = name - 1;
    setThisRespostas({ ...respostas, [index]: value });
    console.info(name, value, respostas);
  };

  const setRespostasRadio = (id, valor) => {
    const index = id - 1;
    setThisRespostas({ ...respostas, [index]: valor });
    console.info(id, valor, respostas);
  };

  useEffect(() => {
    setTimeout(() => {
      atualizarPromocao();
    }, 600);
    
    // console.info("promocaoInitial", promocaoInitial);

    filtrandoUnidades();
    setLimitePorUsuario(promocaoInitial.limite_usuario > 0);
    setTemVouchers(!promocaoInitial.limite_vouchers || (promocaoInitial.limite_vouchers && ((promocaoInitial.limite_vouchers - promocaoInitial.vouchersResgatados) > 0)));
    setPesquisas(JSON.parse(promocaoInitial.pesquisas));
    dispatch(preencherCliente(promocaoInitial.cliente));
    dispatch(preencherPages('oferta'));

    return function cleanup() {
      dispatch(preencherPages(''));
    };
  }, ['']);

  useEffect(() => {
    function getPathUnidade() {
      if (unidades.length > 1 && unidadeId) {
        const unidadeInitial = unidades.find((unidade) => unidade.id == unidadeId);

        if (unidadeInitial) {
          setVoucher({
            ...voucher,
            unidade: unidadeInitial.id,
          });
          onChangeFirstUnidade(unidadeInitial);
        } else {
          return false;
        }
      }
    }

    getPathUnidade();
  }, [unidades]);

  return (
    <PromocaoPagina>
      <Head>
        <title>{`Voucher Fácil - ${promocaoInitial.titulo}`}</title>
        <meta
          name="description"
          content={`${promocaoInitial.metaDescription}`}
        />
        <meta
          property="og:title"
          content={`Voucher Fácil - ${promocaoInitial.titulo}`}
        />
        <meta
          property="og:description"
          content={`${promocaoInitial.metaDescription}`}
        />
        <meta
          property="og:image"
          content={`${promocaoInitial.imagem}`}
        />
        <meta property="og:url" content={`https://voucherfacil.com.br/oferta/${promocaoInitial.cliente.path}/${promocaoInitial.path}`} />
        {
          promocaoInitial.codigosAcompanhamento
          && <FacebookPixel code={promocaoInitial.codigosAcompanhamento} />
        }
        {
          promocaoInitial.codigosAnalytics
          && <CodigoAnalytics code={promocaoInitial.codigosAnalytics} />
        }
      </Head>
      {!!clienteAtual && <ClienteBrand cliente={clienteAtual} />}
      <Topo {...promocao} />
      <ContainerPesquisa maxWidth="1100px">
        <div className="conteudo-oferta__1">
          {
            !(!temVouchers || (moment().format('YYYY-MM-DD HH:mm:SS') > promocaoInitial.dataFim))
              ? (
                <Element name="form">
                  <FormPesquisa
                    celularExcedido={celularExcedido}
                    cpfExcedido={cpfExcedido}
                    emailExcedido={emailExcedido}
                    enviando={formController.enviando}
                    erro={formController.erro}
                    estado={estado}
                    estados={estados}
                    handleEstado={onChangeEstado}
                    handleInput={onChange}
                    handleSubmit={onSubmit}
                    handleUnidade={onChangeUnidade}
                    limitePorUsuario={limitePorUsuario}
                    pesquisas={pesquisas}
                    repetido={formController.repetido ? formController.repetido : false}
                    respostas={respostas}
                    setRespostas={setRespostas}
                    setRespostasRadio={setRespostasRadio}
                    unidades={unidadesFiltradas}
                    validandoLimite={validandoLimite}
                    valido={formController.valido ? formController.valido : false}
                    voucher={voucher}
                  />
                </Element>
              )
              : (
                <Element name="form">
                  <p>Essa pesquisa se encerrou.</p>
                </Element>
              )
          }

          <Detalhes {...promocao} />
          {voucher.unidade ? (
            <OndeOferta
              cidade={unidadeEscolhida.cidade}
              uf={unidadeEscolhida.uf}
              endereco={unidadeEscolhida.endereco}
              numero={unidadeEscolhida.numero}
              bairro={unidadeEscolhida.bairro}
              complemento={unidadeEscolhida.complemento}
            />
          ) : ('')}
          {voucher.unidade && unidadeEscolhida.contato ? (
            <ContatoOferta telefone={unidadeEscolhida.contato} />
          ) : ('')}
          
          {!((moment().format('YYYY-MM-DD HH:mm:SS') > promocaoInitial.dataFim)) ? (
            <CallFormCenter onClick={() => scrollToForm()}>Quero meu voucher</CallFormCenter>
          ) : ('')}
        </div>
        <div>
          <Faq />
          <LinksCompWrapper>
            <Titulo1>Compartilhe com seus amigos</Titulo1>
            <div>
              <a rel="noreferrer" target="_blank" href={`https://api.whatsapp.com/send?text=${promocaoInitial.titulo} - PEGUE SEU VOUCHER FÁCIL: https://voucherfacil.com.br/oferta/${promocaoInitial.cliente.path}/${promocaoInitial.path}`}>
                <Icon icon="whatsapp" tamanho="2.5rem" cor="#007CE5" />
              </a>
              <a rel="noreferrer" target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=https://voucherfacil.com.br/oferta/${promocaoInitial.cliente.path}/${promocaoInitial.path}`}>
                <Icon icon="facebook" tamanho="2.5rem" cor="#007CE5" />
              </a>
            </div>
          </LinksCompWrapper>
        </div>
      </ContainerPesquisa>
      <OfertasRecomendadas promocoes={promocoes} promocaoAtualId={promocaoInitial.id} />
      
      {(moment().format('YYYY-MM-DD HH:mm:SS') > promocaoInitial.dataFim) ? ('') : (
        <ButtonAproveite onClick={() => scrollToForm()} aria-label="Quero Aproveitar">
          <div>
            <Icon tamanho="2.5rem" cor="#fff" icon="voucher" />
            <p>Quero aproveitar</p>
          </div>
        </ButtonAproveite>
      )}
    </PromocaoPagina>
  );
}

const PromocaoPagina = styled.div`
  padding: 0 1.5rem 0;
`;

const CallFormCenter = styled.div`
  background-color: ${(props) => props.theme.outrasCores.verdeSucesso1}; 
  margin: 0 auto 2rem auto;
  padding: 1rem 2rem;
  border-radius: 5px;
  text-align: center;
  max-width: 280px;
  cursor: pointer;
  color: #fff;
`;

const LinksCompWrapper = styled.div`
  margin: 2rem 0;

  p {
    font-weight: bold;
  }

  div {
    display: flex;

    a {
      margin: 1rem 1rem 0 0;
    }
  }
`;

const ContainerPesquisa = styled(Container)`
  display: flex;
  justify-content: space-between;
  padding:0;

  @media(max-width: 1000px) {
    flex-direction: column;
  }

  .conteudo-oferta {
    &__1 {
      flex:1 0 auto;
      margin-right: 4rem;
      max-width: 65rem;
      
      @media (max-width:992px) {
        margin-right: 0;
      }
    }
  }
`;

const ButtonAproveite = styled(ButtonBlock)`
  margin: 2rem -1.5rem 0;
  z-index: 99;

  display: none;
  justify-content: center;

  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  padding: 1.5rem 1rem;

  @media(max-width: 800px){
    display: flex; 
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.outrasCores.verdeSucesso2};
    padding: 1rem;
    border-radius: .5rem;

    p {
      margin-left: 1rem;
    }
  }

  &:hover {
    transform: translateY(0px);
  }
`;

Pesquisa.propTypes = {
  promocao: promocaoType.isRequired,
  cliente: PropTypes.string.isRequired,
  oferta: PropTypes.string.isRequired,
  promocoes: PropTypes.arrayOf(PropTypes.object).isRequired,
  unidadeId: PropTypes.number
};

Pesquisa.defaultProps = {
  unidadeId: null
};

Pesquisa.getInitialProps = async ({ res, query }) => {
  const { cliente, oferta, unidade } = query;
  const { promocao } = await buscaPesquisa(cliente, oferta);
  const { promocoes } = await buscaPromocoes({ clientePath: cliente });
  
  if(res && (!promocao || promocao.length == 0 || !promocao.pesquisas)) {
    res.writeHead(307, { Location: '/' });
    res.end();
  }

  const unidadeId = unidade;

  return {
    promocoes, promocao, cliente, oferta, unidadeId,
  };
};

export default Pesquisa;
