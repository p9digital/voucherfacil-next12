import styled from 'styled-components';

const BotoesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
`;

const Botao = styled.a`
  margin: 0.5rem 1rem;
  display: flex;
  align-items: center;
`;

const BotoesBaixe = () => (
  <BotoesWrapper>
    <Botao href="https://voucherfacil.com.br" alt="Baixe nosso aplicativo na Google Play">
      <img src="/static/img/baixar-google-play.png" alt="Baixe nosso aplicativo na Google Play" />
    </Botao>
    <Botao href="https://voucherfacil.com.br" alt="Baixe nosso aplicativo na App Store">
      <img src="/static/img/baixar-app-store.png" alt="Baixe nosso aplicativo na App Store" />
    </Botao>
  </BotoesWrapper>
);

export default BotoesBaixe;
