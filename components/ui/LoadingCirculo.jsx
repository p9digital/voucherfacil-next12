import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const CirculoLoading = styled.div`
  display: inline-block;
  position: relative;
  width: ${(props) => props.tamanho};
  height: ${(props) => props.tamanho};
  div {
    position: absolute;
    width: ${(props) => `calc(${props.tamanho} * 0.8)`};
    height: ${(props) => `calc(${props.tamanho} * 0.8)`};
    margin: 6px;
    border: 6px solid #fff;
    border-radius: 50%;
    animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${(props) => props.cor || props.theme.cores.um} transparent transparent transparent;
    &:nth-child(1) {
      animation-delay: -0.45s;
    }
    &:nth-child(2) {
      animation-delay: -0.3s;
    }
    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
`;

const Circulo = ({ tamanho, cor, className }) => (
  <CirculoLoading className={className} cor={cor} tamanho={tamanho}>
    <div />
    <div />
    <div />
    <div />
  </CirculoLoading>
);

Circulo.propTypes = {
  tamanho: PropTypes.string,
  cor: PropTypes.string,
  className: PropTypes.string,
};

Circulo.defaultProps = {
  tamanho: '6rem',
  cor: '',
  className: '',
};

export default Circulo;
