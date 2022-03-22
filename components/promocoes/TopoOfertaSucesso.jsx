/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import PropTypes from 'prop-types';

import { Titulo1 } from '../ui/Tipografia';

const TopoWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column; 
  align-items: center;
  width: 100%;
  margin: 1rem 0;

  @media print {
    margin: 0;
  }
`;

const TituloSucesso = styled(Titulo1)`
  font-size:2rem;
  text-align: center;
`;

const TextoTopoSucesso = styled.p`
  color: #38E32A;
  font-size: 2rem;
  font-weight: bold;
`;

const Voucher = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.highlightGreen}; 
  border-radius: 3rem;
  padding: 1.5rem 5rem;
  font-size: 2rem;

  p {
    text-transform: uppercase;
    color: #fff;
    margin-right: 0.5rem; 
  }

  span {
    font-weight: bold;
    color: #fff;
  }

  @media print {
    p, span {
      color: #000;
    }
    padding: .5rem 0;
  }
`;

const Descricao = styled.p`
  color:#1f3859;
  margin: 1rem 0;
`;

const QRCodeWrapper = styled.div`
  margin-top: 2rem;
`;

function TopoOfertaSucesso({ voucher, dia, periodo, promocao, unidade }) {
  return !!promocao && !!voucher && (
    <>
      {!!promocao && !!voucher && (
      <TopoWrapper>
        <TextoTopoSucesso>Voucher gerado com sucesso!</TextoTopoSucesso>
        <TituloSucesso grande>{promocao.cliente.nomeFantasia}</TituloSucesso>
        <TituloSucesso grande>{promocao.titulo}</TituloSucesso>
        <Descricao>Agendamento: {dia} - {periodo}</Descricao>
        <Voucher>
          <p>Voucher: </p>
          <span>{voucher}</span>
        </Voucher>
        <QRCodeWrapper>
          <QRCode value={voucher} size={240} level="H" />
        </QRCodeWrapper>
      </TopoWrapper>
      )}
    </>

  );
}

TopoOfertaSucesso.propTypes = {
  voucher: PropTypes.string,
  dia: PropTypes.string,
  periodo: PropTypes.string,
  promocao: PropTypes.object,
  unidade: PropTypes.object,
};

TopoOfertaSucesso.defaultProps = {
  voucher: "",
  dia: "",
  periodo: "",
  promocao: {},
  unidade: {}
};

export default TopoOfertaSucesso;
