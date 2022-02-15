import styled from 'styled-components';
import PropTypes from 'prop-types';
import devices from '../../styles/devices';

// exportando tambem as partes caso sejam reaproveitadas
export const BotaoMenuIcon = styled.span`
  position: relative;
  width: 2rem;
  height: 2px;
  display: inline-block;
  background-color: ${(props) => (props.primario ? props.theme.cores.tres : '#fff')};
  transition: all 0.2s;
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    display: inline-block;
    background-color: ${(props) => (props.primario ? props.theme.cores.tres : '#fff')};
    transition: all 0.2s;
  }
  &::before {
    top: -0.6rem;
  }
  &::after {
    top: 0.6rem;
  }

  /* abrindo porque varias alteracoes acontecem */
  ${(props) => props.menuAberto
    && `
    height: 3px;
    background-color: transparent;
    opacity: 0.6;
    &::before, &::after{
      top: 0;
      height: 3px;
    }
    &::before{
      transform: rotate(135deg);
    }
    &::after{
      transform: rotate(-135deg);
    }
  `}
`;

export const BotaoMenu = styled.button`
  @media ${devices.laptop} {
    display: flex;
  }

  position: relative;
  background: none;
  height: 4rem;
  width: 4rem;
  border: none;
  outline: none;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
`;

const BotaoMenuCompleto = ({
  className, onClick, primario, menuAberto,
}) => (
  <BotaoMenu className={className} onClick={onClick} aria-label="Botão Menu">
    <BotaoMenuIcon primario={primario} menuAberto={menuAberto} />
  </BotaoMenu>
);

BotaoMenuCompleto.propTypes = {
  onClick: PropTypes.func.isRequired,
  primario: PropTypes.bool,
  menuAberto: PropTypes.bool,
  className: PropTypes.string,
};

BotaoMenuCompleto.defaultProps = {
  primario: false,
  menuAberto: false,
  className: '',
};

export default BotaoMenuCompleto;
