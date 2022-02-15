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
import devices from '../../../../styles/devices';

import FacebookPixel from '../../../../helpers/pixel';
import CodigoAnalytics from '../../../../helpers/codigoAnalytics';
import { promocaoType } from '../../../../types';
import { buscaPromocao, buscaPromocoes } from '../../../../services/promocoes';
import { preencherCliente } from '../../../../store/ducks/clientes';
import { preencherPages } from '../../../../store/ducks/pages';
import { validacao, validacaoInteresse, validaCpf, validaTelefone } from '../../../../helpers/formulario';

import Topo from '../../../../components/promocoes/PromocaoTopo';
import Detalhes from '../../../../components/promocoes/PromocaoDetalhes';
import Faq from '../../../../components/promocoes/PromocaoFaq';
import ClienteBrand from '../../../../components/clientes/ClienteBrand';
// import MapaOferta from '../../../../components/promocoes/MapaOferta';
import FormOferta from '../../../../components/promocoes/FormOferta';
import FormInteresse from '../../../../components/promocoes/FormInteresse';
import OndeOferta from '../../../../components/promocoes/OndeOferta';
import ContatoOferta from '../../../../components/promocoes/ContatoOferta';
import OfertasRecomendadas from '../../../../components/promocoes/OfertasRecomendadas';
import Icon from '../../../../components/ui/Icon';
import { Titulo1 } from '../../../../components/ui/Tipografia';

import { ButtonBlock } from '../../../../components/ui/Buttons';
import { Container } from '../../../../components/ui/Container';

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

const ContainerOferta = styled(Container)`
  display: flex;
  justify-content: space-between;

  @media(max-width: 1000px) {
    flex-direction: column;
  }

  .conteudo-oferta {
    &__1 {
      flex:1 0 auto;
      margin-right: 4rem;
      max-width: 65rem;

      @media ${devices.laptop} {
        margin-right: 0;
      }
    }
  }

  @media ${devices.tablet} {
    padding: 0;
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

function Oferta({
  promocao: promocaoInitial, cliente, oferta, promocoes, unidadeId,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { clienteAtual } = useSelector(({ clientes }) => clientes);
  const { promocaounidades } = promocaoInitial;
  const [focus, setFocus] = useState(false);
  const [cidades, setCidades] = useState([]);
  const [voucher, setVoucher] = useState({
    nome: '',
    email: '',
    cpf: '',
    celular: '',
    unidade: 0,
    periodo: '',
  });
  const [date, setDate] = useState(null);
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
  const [periodos, setPeriodos] = useState([]);
  const [promocao, setPromocao] = useState({
    ...promocaoInitial,
    promocao_atualizada: false,
  });
  const [diasBloqueados, setDiasBloqueados] = useState({});
  const [limites, setLimites] = useState(0);
  const [cpfExcedido, setCpfExcedido] = useState(false);
  const [emailExcedido, setEmailExcedido] = useState(false);
  const [celularExcedido, setCelularExcedido] = useState(false);
  const [timer, setTimer] = useState(null);
  const [limitePorUsuario, setLimitePorUsuario] = useState(false);
  const [limiteVouchers, setLimiteVouchers] = useState(0);
  const [validandoLimite, setValidandoLimite] = useState(false);
  const [temVouchers, setTemVouchers] = useState(true);

  function filtrandoPeriodos(dados, periodoBloqueado) {
    let novosPeriodos = [];

    if (periodoBloqueado) {
      const habilitados = dados.filter((periodo) => periodo.periodo !== periodoBloqueado.periodo);

      novosPeriodos = habilitados.map((periodo) => (
        {
          id: periodo.ordem,
          value: periodo.id,
          name: periodo.nome,
        }
      ));
    } else {
      novosPeriodos = dados.map((periodo) => (
        {
          id: periodo.ordem,
          value: periodo.id,
          name: periodo.nome,
        }
      ));
    }

    const periodosReordenados = novosPeriodos.sort((a, b) => a.id - b.id);

    if (periodosReordenados.length === 1) {
      setVoucher({
        ...voucher, periodo: periodosReordenados[0].value,
      });
    }

    return periodosReordenados;
  }

  async function onSingleDayPromo() {
    if (unidadeEscolhida && promocaoInitial.dias_range === 1) {
      const singleDay = moment(promocaoInitial.dataInicio);

      const weekDay = moment(promocaoInitial.dataInicio).format('e');
      const periodoBloqueado = diasBloqueados.fechados && diasBloqueados.fechados.length > 0 ? diasBloqueados.fechados.find((fechado) => fechado.diasemana == weekDay) : false;
      const periodosFiltrados = filtrandoPeriodos(unidadeEscolhida.periodos, periodoBloqueado);

      try {
        const response = await (await fetch(`${process.env.API_BASE_URL}/promocao/limite-vouchers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            promocaoId: promocaoInitial.id,
            unidadeId: unidadeEscolhida.id,
            dataVoucher: moment(singleDay).format('YYYY-MM-DD'),
          }),
        })).json();

        setDate(singleDay);
        setPeriodos(periodosFiltrados);
        setLimites(response.limite);
      } catch (error) {
        setDate(singleDay);
        setPeriodos(periodosFiltrados);
      }
    }
  }

  function onChangeFirstUnidade(unidade) {
    setDiasBloqueados({
      limitados: unidade.diasLimitados,
      fechados: unidade.diasFechados,
      desativados: unidade.diasDesativados,
    });

    // console.info(unidade);
    setUnidadeEscolhida(unidade);
  }

  async function onEstadoChange({ currentTarget: { name, value } }) {
    setCidades([]);
    setVoucher({ ...voucher, cidade: '' });

    const response = await fetch(`${process.env.CIDADE_API_URL}/${value}.json`);
    const data = await response.json();

    setCidades(data);

    setVoucher({
      ...voucher, [name]: value,
    });
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
    setDate(null);
  }

  function onChangeUnidade({ currentTarget: { value } }) {
    const unidade = unidades.find((item) => item.id == value);

    setDiasBloqueados({
      limitados: unidade.diasLimitados,
      fechados: unidade.diasFechados,
      desativados: unidade.diasDesativados,
    });
    setUnidadeEscolhida(unidade);
    setVoucher({ ...voucher, unidade: unidade.id, pedido: null });
    setDate(null);
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

  async function onChageData(day) {
    const weekDay = moment(day).format('e');
    const periodoBloqueado = diasBloqueados.fechados && diasBloqueados.fechados.length > 0 ? diasBloqueados.fechados.find((fechado) => fechado.diasemana == weekDay) : false;
    const periodosFiltrados = filtrandoPeriodos(unidadeEscolhida.periodos, periodoBloqueado);

    try {
      const response = await (await fetch(`${process.env.API_BASE_URL}/promocao/limite-vouchers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          promocaoId: promocaoInitial.id,
          unidadeId: unidadeEscolhida.id,
          dataVoucher: moment(day).format('YYYY-MM-DD'),
        }),
      })).json();

      setPeriodos(periodosFiltrados);
      setDate(day);
      setLimites(response.limite);
    } catch (error) {
      setPeriodos(periodosFiltrados);
      setDate(day);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();

    const validou = validacao(voucher, date);
    const validouTelefone = validaTelefone(voucher.celular);
    
    if (!validou || !validouTelefone || emailExcedido || celularExcedido) {
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

    const periodoNumero = periodos.find((item) => item.value == voucher.periodo);

    const leadPreparado = {
      unidade_id: unidadeEscolhida.id,
      promocao_id: promocaoInitial.id,
      nome: voucher.nome,
      email: voucher.email,
      cpf: voucher.cpf,
      telefone: voucher.celular,
      data_voucher: date.format('YYYY-MM-DD'),
      horario_voucher: periodoNumero.name,
      periodo_id: voucher.periodo,
      pessoas: 1,
      form: 'A',
    };

    const queryParams = typeof window !== 'undefined' ? queryString.parse(window.location.search) : '';
    const referrer = typeof window !== 'undefined' ? document.referrer : '';

    try {
      const response = await fetch(`${process.env.API_BASE_URL}/voucher`, {
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

      router.push(`/oferta/${promocaoInitial.cliente.path}/${promocaoInitial.path}/agendamento`);
    } catch (err) {
      setFormController({
        enviando: false,
        erro: true,
      });
    }
  }

  async function onInteresseSubmit(e) {
    e.preventDefault();

    const validou = validacaoInteresse(voucher);
    const validouTelefone = validaTelefone(voucher.celular);

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

    const queryParams = typeof window !== 'undefined' ? queryString.parse(window.location.search) : '';
    const referrer = typeof window !== 'undefined' ? document.referrer : '';

    try {
      const response = await fetch(`${process.env.API_BASE_URL}/interesse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...voucher,
          ...queryParams,
          promocao_id: promocaoInitial.id,
          referrer,
        }),
      });

      const data = await response.json();

      if (data.data == 'erro') {
        setFormController({
          enviando: false,
          erro: true,
        });

        return false;
      }

      const dados = {
        promocao: promocaoInitial,
      };

      localStorage.setItem('@voucher/session-interesse-voucher', JSON.stringify(dados));

      router.push(`/oferta/${promocaoInitial.cliente.path}/${promocaoInitial.path}/interesse`);
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

  function handleDiasBloqueados(day) {
    if (diasBloqueados.limitados && diasBloqueados.limitados.length > 0 && diasBloqueados.limitados.filter((d) => d == day.format('YYYY-MM-DD')).length > 0) {
      return diasBloqueados.limitados.filter((d) => d == day.format('YYYY-MM-DD')).length > 0;
    }

    if (diasBloqueados.desativados && diasBloqueados.desativados.length > 0 && diasBloqueados.desativados.filter((d) => d.dia == day.format('YYYY-MM-DD')).length > 0) {
      return diasBloqueados.desativados.filter((d) => d.dia == day.format('YYYY-MM-DD')).length > 0;
    }

    if (diasBloqueados.fechados && diasBloqueados.fechados.length > 0) {
      return diasBloqueados.fechados.filter((d) => !d.periodo && d.diasemana == day.format('e')).length > 0;
    }

    if (moment().add(20, 'days') < day) {
      return true;
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
    const { promocao: promocaoAtualizada } = await buscaPromocao(
      cliente,
      oferta,
    );

    setPromocao({
      ...promocaoAtualizada,
      promocao_atualizada: true,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      atualizarPromocao();
    }, 600);
    
    // console.info("promocaoInitial", promocaoInitial);

    filtrandoUnidades();
    setLimitePorUsuario(promocaoInitial.limite_usuario > 0);
    setLimiteVouchers(promocaoInitial.limite_vouchers);
    setTemVouchers(!promocaoInitial.limite_vouchers || (promocaoInitial.limite_vouchers && ((promocaoInitial.limite_vouchers - promocaoInitial.vouchersResgatados) > 0)));
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

  useEffect(() => {
    onSingleDayPromo();
  }, [unidadeEscolhida]);

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
        <FacebookPixel code={promocaoInitial.codigosAcompanhamento} />
        <CodigoAnalytics code={promocaoInitial.codigosAnalytics} />
      </Head>
      {!!clienteAtual && <ClienteBrand cliente={clienteAtual} />}
      <Topo {...promocao} />
      <ContainerOferta maxWidth="1100px">
        <div className="conteudo-oferta__1">
          {!((moment().format('YYYY-MM-DD HH:mm:SS') > promocaoInitial.dataFim)) ? (
            <CallFormCenter onClick={() => scrollToForm()}>Agendar agora!</CallFormCenter>
          ) : ('')}
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
        </div>
        <div>
          {
            !(!temVouchers || (moment().format('YYYY-MM-DD HH:mm:SS') > promocaoInitial.dataFim) || (unidades.length < 1 && limites < 1))
              ? (
                <Element name="form">
                  <FormOferta
                    voucher={voucher}
                    focus={focus}
                    date={date}
                    limite={limites}
                    limitePorUsuario={limitePorUsuario}
                    limiteVouchers={limiteVouchers}
                    unidades={unidadesFiltradas}
                    periodos={periodos}
                    estado={estado}
                    estados={estados}
                    unidadeEscolhida={unidadeEscolhida}
                    handleDiasBloqueados={handleDiasBloqueados}
                    handleEstado={onChangeEstado}
                    handleUnidade={onChangeUnidade}
                    handleDate={onChageData}
                    handleSubmit={onSubmit}
                    handleInput={onChange}
                    setFocus={setFocus}
                    valido={formController.valido ? formController.valido : false}
                    enviando={formController.enviando}
                    erro={formController.erro}
                    diasRange={promocaoInitial.dias_range}
                    repetido={formController.repetido ? formController.repetido : false}
                    dataInicio={promocaoInitial.dataInicio}
                    dataFim={promocaoInitial.dataFim}
                    cpfExcedido={cpfExcedido}
                    emailExcedido={emailExcedido}
                    celularExcedido={celularExcedido}
                    validandoLimite={validandoLimite}
                  />
                </Element>
              )
              : (
                <Element name="form">
                  <FormInteresse
                    interesse={voucher}
                    handleSubmit={onInteresseSubmit}
                    handleEstado={onEstadoChange}
                    handleInput={onChange}
                    valido={formController.valido ? formController.valido : false}
                    enviando={formController.enviando}
                    erro={formController.erro}
                    cidades={cidades}
                  />
                </Element>
              )
          }
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
      </ContainerOferta>
      <OfertasRecomendadas promocoes={promocoes} promocaoAtualId={promocaoInitial.id} />
      {/* {voucher.unidade ? (
        <MapaOferta
          tipo="static"
          lat={unidadeEscolhida.lat}
          lng={unidadeEscolhida.lng}
          busca={`${promocaoInitial.cliente.nomeFantasia},${unidadeEscolhida.endereco},${unidadeEscolhida.numero},${unidadeEscolhida.bairro},${unidadeEscolhida.cidade}`}
        />
      ) : ('')} */}
      {(moment().format('YYYY-MM-DD HH:mm:SS') > promocaoInitial.dataFim) || (unidadeEscolhida && limites < 1) ? ('') : (
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

Oferta.propTypes = {
  promocao: promocaoType.isRequired,
  cliente: PropTypes.string.isRequired,
  oferta: PropTypes.string.isRequired,
  promocoes: PropTypes.arrayOf(PropTypes.object).isRequired,
  unidadeId: PropTypes.number
};

Oferta.defaultProps = {
  unidadeId: null
};

Oferta.getInitialProps = async ({ res, query }) => {
  const { cliente, oferta, unidade } = query;
  const { promocao } = await buscaPromocao(cliente, oferta);
  const { promocoes } = await buscaPromocoes({ clientePath: cliente });

  if(res && (!promocao || promocao.length == 0)) {
    res.writeHead(307, { Location: '/' });
    res.end();
  }

  const unidadeId = unidade;

  return {
    promocoes, promocao, cliente, oferta, unidadeId,
  };
};

export default Oferta;
