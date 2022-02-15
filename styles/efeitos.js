import { keyframes } from 'styled-components';

// Faz um bounce rapido para baixo, util para botoes
export const animacaoBounce = keyframes`
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(1rem);
  }

  100% {
    transform: translateY(0);
  }
`;

// Gira gira
export const animacaoGira = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
