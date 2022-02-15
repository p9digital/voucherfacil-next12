import { useState } from 'react';
import styled from 'styled-components';

import { Container } from '../components/ui/Container';
import { Titulo1 } from '../components/ui/Tipografia';

import { comoFunciona, faq } from '../helpers/ajuda';

const PainelOpcoes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-left: 1px solid #333;
  max-width: 100rem;
  width: 30%;
  margin-top: 8rem;

  @media(max-width: 900px) {
    border: none;
    flex-direction: row;
    width: 100%;
    margin-top: 0;
    margin-bottom: 4rem;
  }
`;

const Opcao = styled.button`
  background-color: ${(props) => (props.active ? props.theme.cores.quatro : props.theme.offWhite)};
  color: ${(props) => (props.active ? '#fff' : '#333')};
  width: 100%;
  text-align: start;
  cursor: pointer;
  padding: 1rem 2rem;
  font-size: 1.6rem;

  @media(max-width: 365px) {
    padding: 1rem .9rem;
  }
`;

const ConteudoInterno = styled.div`
  width: 60%;
  height: 80vh;

  @media(max-width: 900px){
    width: 80%;
    height: auto;
  }
`;

const ParagrafosWrapper = styled.div`
  margin-top: 4rem;
`;

const Paragrafo = styled.div`
  .paragrafo {
    &__title {
      margin-bottom: .5rem;
      background-color: ${(props) => props.theme.offWhite};
      color: ${(props) => props.theme.cores.quatro};
      border: 1px solid ${(props) => props.theme.offWhite};
      border-radius: 5px;
      padding: 1rem;
      cursor: pointer;
    }

    &__text {
      display: ${(props) => (props.active ? 'flex' : 'none')};
      border: 1px solid ${(props) => props.theme.offWhite};
      padding: 2rem 2rem;
      margin-top: -1rem;
      margin-bottom: .5rem;
      border-radius: 5px;
    }
  }
`;

const AjudaContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  padding: 4rem 0;

  @media(max-width: 1110px) {
    padding: 4rem 2rem;
  }

  @media(max-width: 900px) {
    flex-direction: column-reverse;
    align-items: center;
    padding: 0 0 4rem 0;
  }
`;

export default function Ajuda() {
  const [painelControllers, setPainelControllers] = useState({
    conteudo: 'como-funciona',
    paragrafoId: '',
  });

  function handleContentChange(opcao) {
    setPainelControllers({
      conteudo: opcao,
    });
  }

  function handleParagraphChange(id) {
    setPainelControllers({
      ...painelControllers,
      paragrafoId: id,
    });
  }

  return (
    <AjudaContainer maxWidth="1100px">
      <ConteudoInterno>
        {painelControllers.conteudo === 'como-funciona' ? (
          <>
            <Titulo1 grande>{comoFunciona.tituloPrincipal}</Titulo1>
            <ParagrafosWrapper>
              {comoFunciona.paragrafos.map((paragrafo) => (
                <Paragrafo
                  className="paragrafo"
                  key={paragrafo.id}
                  active={paragrafo.id === painelControllers.paragrafoId}
                >
                  <p
                    className="paragrafo__title"
                    onClick={() => handleParagraphChange(paragrafo.id)}
                  >
                    {paragrafo.titulo}
                  </p>
                  <p className="paragrafo__text">{paragrafo.texto}</p>
                </Paragrafo>
              ))}
            </ParagrafosWrapper>
          </>
        ) : (
          <>
            <Titulo1 grande>{faq.tituloPrincipal}</Titulo1>
            <ParagrafosWrapper>
              {faq.paragrafos.map((paragrafo) => (
                <Paragrafo
                  className="paragrafo"
                  key={paragrafo.id}
                  active={paragrafo.id === painelControllers.paragrafoId}
                >
                  <p
                    className="paragrafo__title"
                    onClick={() => handleParagraphChange(paragrafo.id)}
                  >
                    {paragrafo.titulo}
                  </p>
                  <p className="paragrafo__text">{paragrafo.texto}</p>
                </Paragrafo>
              ))}
            </ParagrafosWrapper>
          </>
        )}
      </ConteudoInterno>
      <PainelOpcoes>
        <Opcao
          active={painelControllers.conteudo === 'como-funciona'}
          onClick={() => handleContentChange('como-funciona')}
        >
          Como funciona
        </Opcao>
        <Opcao
          active={painelControllers.conteudo === 'faq'}
          onClick={() => handleContentChange('faq')}
        >
          Perguntas frequentes
        </Opcao>
      </PainelOpcoes>
    </AjudaContainer>
  );
}
