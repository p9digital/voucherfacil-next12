import styled from 'styled-components';

const MockCategorias = [
  'Restaurantes',
  'Ingressos',
  'Serviços',
  'Restaurantes',
  'Ingressos',
  'Serviços',
  'Restaurantes',
  'Ingressos',
  'Serviços',
].map((titulo, index) => ({
  id: `${titulo}${index}`,
  titulo,
}));

const CategoriasStyled = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  list-style: none;
`;

const CategoriaItem = styled.li`
  padding: 0.8rem 1.2rem;
  background-color: rgba(255, 255, 255, 0.15);
  color: #fff;
  margin: 0.5rem;
  border-radius: 50px;
`;

/**
 * List de categorias que provavelmente vao ativar um filtro na store
 */
const ListaCategorias = () => (
  <CategoriasStyled>
    {!!MockCategorias
      && MockCategorias.map(({ id, titulo }) => <CategoriaItem key={id}>{titulo}</CategoriaItem>)}
  </CategoriasStyled>
);

export default ListaCategorias;
