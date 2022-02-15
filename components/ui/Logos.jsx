import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

const Archor = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const LogoSVG = styled.svg`
  width: ${(props) => props.tamanho};
  height: ${(props) => props.tamanho};
  fill: ${(props) => props.cor};
`;

const Logo = ({
  tamanho, cor, para, paraTitulo, colorido, className,
}) => (
  <Link href={para}>
    <Archor className={className} title={paraTitulo}>
      <LogoSVG tamanho={tamanho} cor={cor}>
        <use xlinkHref={`/static/logos/symbol-defs.svg#icon-${colorido ? 'colorido' : 'cinza'}`} />
      </LogoSVG>
    </Archor>
  </Link>
);

Logo.propTypes = {
  para: PropTypes.string,
  paraTitulo: PropTypes.string,
  colorido: PropTypes.bool,
  tamanho: PropTypes.string,
  cor: PropTypes.string,
  className: PropTypes.string,
};

Logo.defaultProps = {
  para: '/',
  paraTitulo: 'Ir para a página inicial do Voucher Fácil',
  colorido: false,
  tamanho: '6rem',
  cor: '#fff',
  className: '',
};

export default Logo;
