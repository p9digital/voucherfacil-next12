import styled from 'styled-components';

// nas listagens usar `as = "li"`
export const Card = styled.div`
  border: 1px solid ${(props) => props.theme.outrasCores.cinzaClaro1};
  border-radius: ${(props) => props.theme.borderRadius2};
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 32rem;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  transition: transform 0.2s;
  cursor: pointer;
  --border-top-conteudo: 1rem;
  min-height: ${(props) => props.minHeight || 'initial'};
`;

export const CardLink = styled.a`
  justify-content: flex-start;
  display: flex;
  flex: 1;
  flex-direction: column;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
`;

export const PromocaoImagem = styled.img`
  ${(props) => !props.full
    && `
    height: 18rem;
  `}
  object-fit: cover;
  background-color: ${(props) => props.theme.lightGrey};
`;

export const CardConteudo = styled.div`
  margin-top: var(--border-top-conteudo);
  padding: 1rem 1rem 1.5rem;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

export const DestaquesLista = styled.div`
  position: absolute;
  top: calc(var(--border-top-conteudo) * -1);
  left: 0;
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  transform: translateY(-50%);
  padding: 0 1rem;
`;

export const DestaqueCirculo = styled.span`
  background-color: ${(props) => props.theme.outrasCores.verdeSucesso1};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 50%;
  font-weight: bold;
  margin: 0 0.6rem;
  padding: 0.5rem;
  width: 5rem;
  height: 5rem;
  font-size: 1.8rem;
  z-index: ${(props) => props.zIndex || 'initial'};
  ${(props) => props.grande
    && `
    width: 9rem;
    height: 9rem;
    font-size: 3.4rem;
  `}
`;

export const TextosWrapper = styled.div`
  padding: 0.8rem 0;
`;

export const CidadeNome = styled.span`
  color: ${(props) => props.theme.cores.dois};
`;

export const Descricao = styled.div`
  margin-top: 0.5rem;
  line-height: 1.4;
  font-size: 1.5rem;
  color: ${(props) => props.theme.outrasCores.cinza1};
`;

export const PrecosWrapper = styled.div``;

export const PrecoAnterior = styled.span`
  color: ${(props) => props.theme.outrasCores.cinzaClaro2};
  font-size: 1.7rem;
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 1.4px;
    background-color: ${(props) => props.theme.outrasCores.cinzaClaro2};
    transform: translate(-50%, -50%) rotate(-10deg);
  }
`;

export const PrecoAtual = styled.strong`
  font-size: 2.2rem;
  margin-left: 1rem;
  color: ${(props) => props.theme.cores.um};
`;

export const BotaoAproveitar = styled.button`
  border-radius: 30px;
  background: ${(props) => props.theme.outrasCores.verdeSucesso1};
  font-size: 1.8rem;
  font-weight: 200;
  color: white;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  font-weight: bold;

  @media(max-width: 900px) {
    font-weight: normal;
  }
`;
