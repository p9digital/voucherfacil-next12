import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Titulo1 } from '../ui/Tipografia';

// const LinkMapa = styled.p``;

const OndeOfertaWrapper = styled.div``;
const OndeBtnMaps = styled.a`
  align-self: center;
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  background-color: #C3BC16;
  border-radius: 3rem;
  box-shadow: 0 3px 10px rgba(0,0,0,0.2);
  color: #fff;
  display: inline-block;
  font-size: 1.8rem;
  margin: 1.4rem 0.5rem 0.5rem;
  padding: 0.5rem 2rem;
  text-transform: uppercase;
  transition: all 0.2s;
  -webkit-transition: all 0.2s;
`;

export default function OndeOferta({
  cidade, uf, endereco, numero, bairro, complemento
}) {
  return (
    <>
      {
        endereco && cidade && numero && bairro && uf && (
          <OndeOfertaWrapper>
            <Titulo1>Onde?</Titulo1>
            <p>{`${endereco && endereco} - ${numero && numero}, ${bairro && bairro}${complemento ? `, ${complemento}` : ''}`}</p>
            <p>{`${cidade && cidade}/${uf && uf}`}</p>
            <OndeBtnMaps className="btn btn-success" href={`https://maps.google.com/maps/search/${endereco && endereco} - ${numero}, ${bairro}, ${cidade}/${uf}`} target="_blank">Ver no Google maps</OndeBtnMaps>
            <br /><br />
          </OndeOfertaWrapper>
        )
      }
    </>
  );
}

OndeOferta.propTypes = {
  cidade: PropTypes.string,
  uf: PropTypes.string,
  endereco: PropTypes.string,
  numero: PropTypes.string,
  bairro: PropTypes.string,
  complemento: PropTypes.string
};

OndeOferta.defaultProps = {
  cidade: "",
  uf: "",
  endereco: "",
  numero: "",
  bairro: "",
  complemento: ""
};
