import styled from 'styled-components';
import PropTypes from 'prop-types';

const BannerWrapper = styled.div`
  position: relative;
  cursor: pointer;
  height: 50rem;

  @media(max-width: 550px) {
    height: 30rem;
  }
`;

const BannerImagem = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BannerTexto = styled.p`
  position: absolute;
  color: #fff;
  font-size: 6rem;
  font-weight: bold;
  width: 100%;
  text-align: center;
  top: 50%;
  transform: translate(50%, -50%);
  right: 50%;

  @media(max-width: 550px) {
    font-size: 3rem;
  }
`;

const Banner = ({ banner, texto }) => (
  <BannerWrapper>
    {!!banner && (
      <picture>
        {banner && banner.map(({ path, type, maxWidth }) => (
          <source
            media={maxWidth ? `(max-width: ${maxWidth}px)` : ''}
            type={`image/${type}`}
            srcSet={path}
            key={path}
          />
        ))}
        <BannerImagem loading="lazy" alt={banner.titulo} />
        {texto && (
          <BannerTexto>{texto}</BannerTexto>
        )}
      </picture>
    )}
  </BannerWrapper>
);

Banner.propTypes = {
  banner: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      maxWidth: PropTypes.string,
      titulo: PropTypes.string,
    }).isRequired,
  ).isRequired,
  texto: PropTypes.string,
};

Banner.defaultProps = {
  texto: '',
};

export default Banner;
