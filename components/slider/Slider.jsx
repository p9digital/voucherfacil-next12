/* eslint-disable react/forbid-prop-types */
import { useState, useEffect } from 'react';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Destaque from './Destaque';
import FallbackSlide from './FallbackSlide';

const SliderBanner = styled(Slider)`
  height:37vw;
  max-height:700px;
  
  @media(max-width: 1100px) {
    height:55vw;
  }
`;

function SliderWrapper({ destaquesInitial, desativarSombras, link }) {
  const [primeiroDestaque] = destaquesInitial;
  const [destaques, setDestaques] = useState(
    primeiroDestaque ? [primeiroDestaque] : [],
  );

  useEffect(() => {
    // inserindo as fotos restantes
    setTimeout(() => {
      setDestaques(destaquesInitial);
    }, 3000);
  }, ['executaumavezobrigado']);

  // colocar role de limitar tamanho
  return (
    <CarouselProvider
      naturalSlideWidth={160}
      naturalSlideHeight={90}
      totalSlides={destaquesInitial.length || 1}
      className="slider__carousel-provider"
      interval={4000}
      isPlaying={!!destaques.length}
    >
      <SliderBanner>
        {destaques.length ? (
          destaques.map((destaque, index) => (
            <div key={index}>
              {link ? (
                <Link href={`/oferta/${destaque.cliente.path}/${destaque.promocao.path}`}>
                  <Slide onFocus index={index} key={destaque.id}>
                    <Destaque
                      titulo={destaque.titulo}
                      subtitulo={destaque.subtitulo}
                      descricao={destaque.descricao}
                      temSombra={desativarSombras ? !desativarSombras : destaque.sombra}
                      objeto={destaque}
                    />
                  </Slide>
                </Link>
              ) : (
                <Slide onFocus index={index} key={destaque.id}>
                  <Destaque
                    titulo={destaque.titulo}
                    subtitulo={destaque.subtitulo}
                    descricao={destaque.descricao}
                    temSombra={desativarSombras ? !desativarSombras : destaque.sombra}
                    objeto={destaque}
                  />
                </Slide>
              )}
            </div>
          ))
        ) : (
          <FallbackSlide />
        )}
      </SliderBanner>
    </CarouselProvider>
  );
}

SliderWrapper.propTypes = {
  destaquesInitial: PropTypes.array,
  desativarSombras: PropTypes.bool,
  link: PropTypes.bool,
};

SliderWrapper.defaultProps = {
  destaquesInitial: [],
  desativarSombras: false,
  link: false,
};

export default SliderWrapper;
