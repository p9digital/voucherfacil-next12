import PropTypes from 'prop-types';
import styled from 'styled-components';
import CardPromocao from './CardPromocao';

const ListaWrapper = styled.div`
  position: relative;
  margin: ${({ vertical }) => (vertical ? '1rem 0' : '1rem -3rem')};

  ${({ vertical }) => !vertical
    && `
    ::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 2.5rem;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.6) 10%,
      transparent 40%,
      transparent
    );
    left: 0;
    z-index: 1;
    `}
`;

const ListaPromocoesStyled = styled.ul`
  padding: 0;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  overflow-x: scroll;

  ${({ vertical }) => vertical
    && `
    flex-direction: column;
    align-items: center;
    `}
`;

const CardWrapper = styled.li`
  min-width: 30rem;
  display: flex;
  padding: 0.5rem;
  ${({ vertical }) => (!vertical
    ? `
    :first-child {
      margin-left: 1.5rem;
    }
    `
    : `
    :not(:first-child) {
      margin-top: 2rem;
    }
    `)}
`;

const ListaPromocoes = ({ promocoes, forcarVertical }) => {
  const vertical = forcarVertical || (promocoes && promocoes.length < 2);

  return (
    <ListaWrapper vertical={vertical}>
      <ListaPromocoesStyled vertical={vertical}>
        {promocoes.length ? promocoes.map((promocao) => (
          <CardWrapper key={promocao.id} vertical={vertical}>
            <CardPromocao promocao={promocao} cidade={{ nome: 'cidade top' }} as="li" />
          </CardWrapper>
        )) : null}
      </ListaPromocoesStyled>
    </ListaWrapper>
  );
};

ListaPromocoes.propTypes = {
  promocoes: PropTypes.arrayOf(PropTypes.object),
  cidade: PropTypes.shape({
    id: PropTypes.number,
    nome: PropTypes.string,
  }),
  forcarVertical: PropTypes.bool,
};

ListaPromocoes.defaultProps = {
  promocoes: [],
  cidade: null,
  forcarVertical: false,
};

export default ListaPromocoes;
