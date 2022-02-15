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
  width: 6rem;
  height: 6rem;

  div {
    position: absolute;
    width: calc(6rem * 0.8);
    height: calc(6rem * 0.8);
    margin: 6px;
    border: 6px solid ${(props) => (props.color ? props.color : '#fff')};
    border-radius: 50%;

    animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${(props) => (props.color ? props.color : '#fff')} transparent
      transparent transparent;
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

const Loader = ({ color }) => (
  <CirculoLoading color={color}>
    <div />
    <div />
    <div />
    <div />
  </CirculoLoading>
);

export default Loader;
