/* eslint-disable react/jsx-no-target-blank */
import styled from 'styled-components';
import Link from 'next/link';
import BuscaCidades from '../locais/BuscaCidades';
// import ListaCategorias from '../categorias/ListaCategorias';
// import BotoesBaixe from '../baixe-app-lojas/BotoesBaixe';
import Icon from '../ui/Icon';
import Logo from '../ui/Logos';

const FooterStyled = styled.footer`
  background: ${(props) => props.theme.cores.quatro};
  padding: 1.2rem 2rem;
  color: white;

  @media print {
    display: none;
  }
`;

const FooterTrechoWrapper = styled.div`
  margin: 1rem auto;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  span {
    display: block;
    text-transform: uppercase;
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: bold;
  }
  &:not(:first-of-type) {
    margin-top: 2rem;
  }
`;

// const LinksApp = styled.div`
//   margin: 2rem auto;
//   padding: 2rem 0;
//   border-top: 1px solid rgba(255, 255, 255, 0.2);
//   border-bottom: 1px solid rgba(255, 255, 255, 0.2);
//   text-align: center;
//   span {
//     font-size: 1.7rem;
//   }
// `;

const RedesSociaisWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RedeSocialIcon = styled(Icon)`
  margin: 0.5rem;
  fill: #fff;
`;

const TextoLegal = styled.p`
  color: #fff;
  margin-top: 0.2rem;
  font-size: 1.5rem;
  &:first-of-type {
    margin-top: 2.5rem;
  }
`;

const LinksLegais = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.2rem;
  cursor: pointer;
`;

const LinkLegal = styled.li`
  margin: 0 0.5rem;
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
`;

const Faixa = styled.div`
  height: 1px;
  background-color: rgba(255,255,255, 0.5);
  width: 100%;
  margin: 2rem 0;
`;

const Aviso = styled.div`
  font-size:12px;
  text-align:center;
`;

const Footer = () => (
  <FooterStyled>
    <FooterTrechoWrapper>
      <span>Cidades</span>
      <BuscaCidades />
    </FooterTrechoWrapper>
    {/* <FooterTrechoWrapper>
      <span>Categorias</span>
      <ListaCategorias />
    </FooterTrechoWrapper> */}
    {/* <LinksApp>
      <span>Baixe nosso aplicativo</span>
      <BotoesBaixe />
    </LinksApp> */}
    <Faixa />
    <Aviso>
      <p>*Aviso: Fizemos adequações em nossa plataforma para atender às diretrizes da OMS e Ministério da Saúde. Os agendamentos foram reduzidos para garantir uma experiência segura a todos os nossos parceiros e clientes.</p>
      <p>Reforçamos que a sua saúde e a sua segurança são de extrema importância para nós. E que estamos seguindo todas as medidas de prevenção recomendadas pelas autoridades de saúde.</p>
    </Aviso>
    <FooterTrechoWrapper>
      <RedesSociaisWrapper>
        <a
          href="https://www.facebook.com/VoucherFacil/"
          target="_blank"
          title="Siga o Voucher Fácil no Facebook"
          rel="noreferrer"
        >
          <RedeSocialIcon icon="facebook" tamanho="3rem" />
        </a>
        <a
          href="https://www.instagram.com/voucherfacil.com.br/"
          title="Siga o Voucher Fácil no Instagram"
          target="_blank"
          rel="noreferrer"
        >
          <RedeSocialIcon icon="instagram" tamanho="3rem" />
        </a>
      </RedesSociaisWrapper>
    </FooterTrechoWrapper>
    <FooterTrechoWrapper>
      <Logo tamanho="10rem" />
      <TextoLegal>© VOUCHER FÁCIL - CNPJ: 19.399.467/0001-84</TextoLegal>
      <TextoLegal>Todos os direitos reservados.</TextoLegal>
      <LinksLegais>
        <Link href="/">
          <LinkLegal>Termos de uso</LinkLegal>
        </Link>
        <Link href="/">
          <LinkLegal>Política de privacidade</LinkLegal>
        </Link>
        <Link href="/ajuda">
          <LinkLegal>Ajuda</LinkLegal>
        </Link>
      </LinksLegais>
    </FooterTrechoWrapper>
  </FooterStyled>
);

export default Footer;
