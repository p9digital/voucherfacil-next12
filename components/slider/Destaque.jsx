/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { pegaListaDeFotosResponsivas } from '../../helpers/fotos';

const DestaqueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  height: 37vw;
  max-height:700px;
  cursor: pointer;
  
  @media(max-width: 1100px) {
    height:55vw;
  }
`;

const TextoWrapper = styled.div`
  max-width: 96rem;
  padding: 1rem 2rem;
  z-index: 2;
  color: #fff;
  text-align: center;
  position: absolute;
`;

const TextoOnde = styled.span`
  text-transform: uppercase;
  font-weight: 300;
  font-size: 1.7rem;
`;

const TextoTitulo = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0.5rem 0;
`;

const Sombra = styled.div`
  width: 100%;
  height: 36.3vw;
  max-height: 700px;
  position: absolute;
  background: black;
  opacity: 0.6;
  z-index: 1;
  top: 0;
  left: 0;
  z-index: 1;
  
  @media(max-width: 1100px) {
    height:54vw;
  }
`;

const Img = styled.img`
  width: 100%;
  object-fit: cover;
`;

const Destaque = ({
  titulo, descricao, subtitulo, temSombra, objeto,
}) => {
  const fotos = pegaListaDeFotosResponsivas({
    objeto,
    prefixo: 'foto_',
    adicionarBaseUrl: true,
  });

  return (
    <DestaqueWrapper>
      <picture>
        {/* fotos.mob */}
        <source
          media="(max-width: 750px)"
          type="image/webp"
          srcSet={`${fotos.mob}.webp`}
        />
        <source
          media="(max-width: 750px)"
          srcSet={`${fotos.mob}.png`}
        />

        {/* fotos.desk */}
        <source
          media="(max-width: 1100px)"
          type="image/webp"
          srcSet={`${fotos.desk}.webp`}
        />
        <source
          media="(max-width: 1100px)"
          srcSet={`${fotos.desk}.png`}
        />

        {/* desk_xl */}
        <source
          media="(max-width: 1920px)"
          type="image/webp"
          srcSet={`${fotos.desk_xl}.webp`}
        />
        <source
          media="(max-width: 1920px)"
          srcSet={`${fotos.desk_xl}.png`}
        />
        <Img src={`${fotos.desk_xl}.png`} alt={titulo} />
      </picture>
      <TextoWrapper>
        <TextoOnde>{subtitulo && subtitulo}</TextoOnde>
        <TextoTitulo>{titulo && titulo}</TextoTitulo>
        <p>{descricao}</p>
      </TextoWrapper>
      {temSombra ? (<Sombra />) : ''}
    </DestaqueWrapper>
  );
};

Destaque.propTypes = {
  titulo: PropTypes.string,
  descricao: PropTypes.string,
  subtitulo: PropTypes.string,
  link: PropTypes.string,
  objeto: PropTypes.object.isRequired,
  temSombra: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

Destaque.defaultProps = {
  titulo: '',
  descricao: '',
  subtitulo: '',
  link: '',
  temSombra: false,
};

export default Destaque;
