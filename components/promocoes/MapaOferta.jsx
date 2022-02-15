/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MAPS_KEY = process.env.MAPS_API_KEY;

const MapaWrapperStyled = styled.div`
  margin: 6rem auto -1rem;
  text-align: center;
  position: relative;

  @media print {
    display: none;
  }

  .fundo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 108%;
    height: 110%;
    background-image: ${(props) => `url("${props.fundoUrl}")`};
    background-size: cover;
    background-repeat: no-repeat;
    filter: brightness(0.2);
    z-index: -1;
  }

  img,
  iframe {
    border-radius: 5px;
    cursor: pointer;
    max-width: 100%;
    margin: 3rem auto;
  }
`;

// eslint-disable-next-line react/prop-types
const MapaWrapper = ({ children, fundoUrl }) => (
  <MapaWrapperStyled fundoUrl={fundoUrl}>
    <div className="fundo" />
    <div>{children}</div>
  </MapaWrapperStyled>
);

const MapaOferta = ({ lat, lng, busca }) => {
  const enderecoCompleto = `${lat},${lng}`;
  const viewWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const zoom = viewWidth >= 1000 ? 17 : 19;
  const staticImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${enderecoCompleto}&zoom=${zoom}&size=600x360&markers=anchor:center|${enderecoCompleto}&key=${MAPS_KEY}`;

  // const link = '';

  if(MAPS_KEY) {
    return (
      <MapaWrapper fundoUrl={staticImageUrl}>
        <a href={`https://www.google.com/maps?q=${busca}`} target="_blank" rel="noreferrer">
          <img
            src={staticImageUrl || ''}
            alt="Mapa Voucher Fácil"
            width="600"
            height="340"
            loading="lazy"
          />
        </a>
      </MapaWrapper>
    );
  }
  return "";
};

MapaOferta.propTypes = {
  lat: PropTypes.any,
  lng: PropTypes.any,
  busca: PropTypes.string
};

MapaOferta.defaultProps = {
  lat: 0,
  lng: 0,
  busca: ""
};

export default MapaOferta;
