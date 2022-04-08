import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconSVG = styled.svg`
  width: ${(props) => props.tamanho};
  height: ${(props) => props.tamanho};
  fill: ${(props) => props.cor};
`;

export const IconeWrapperParaBotao = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  width: 18%;
  background-color: #52a028;
  transition: all 0.2s;
`;

const Icon = ({
  tamanho, cor, icon, className,
}) => (
  <IconSVG tamanho={tamanho} cor={cor} className={className}>
    <use xlinkHref={`/static/icons/symbol-defs.svg#icon-${icon}`} />
  </IconSVG>
);

Icon.propTypes = {
  tamanho: PropTypes.string,
  cor: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string,
};

Icon.defaultProps = {
  tamanho: '6rem',
  cor: '#fff',
  className: '',
  icon: ''
};

export default Icon;
