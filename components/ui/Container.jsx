import styled from 'styled-components';
import devices from '../../styles/devices';

export const Container = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;

  padding: 0 2rem;
`;

export const FlexContainer = styled(Container)`
  display: flex;
  align-items: ${(props) => props.align || 'stretch'};
  justify-content: ${(props) => props.justify || 'flex-start'};
  flex-direction: ${(props) => props.direction || 'row'};
`;

// deve ser combinado com um container comum
export const ContainerParaFormFixo = styled(Container)`
  padding-right: 40rem;
  @media ${devices.laptopM} {
    padding-right: 46rem;
  }
  @media ${devices.laptop} {
    /* removendo o gap lateral */
    padding: 0 1rem;
  }
`;
