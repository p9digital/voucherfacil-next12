import styled from 'styled-components';

import { SkeletonElemento } from '../loadings/SkeletonBase';
import { Card, CardLink } from './styles';

const CardSkeletonConteudo = styled.div`
  margin-top: var(--border-top-conteudo);
  padding: 1rem 1rem 1.5rem;
`;

const CardSkeleton = () => (
  <Card minHeight="43rem">
    <CardLink as="div">
      <SkeletonElemento width="100%" height="18rem" marginTop="0" />
      <CardSkeletonConteudo>
        <SkeletonElemento width="90%" height="2rem" />
        <SkeletonElemento width="80%" height="2rem" />
        <SkeletonElemento width="60%" height="2rem" marginTop="3rem" />
        <SkeletonElemento width="40%" height="2rem" />
      </CardSkeletonConteudo>
    </CardLink>
  </Card>
);

export default CardSkeleton;
