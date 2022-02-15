import PropTypes from 'prop-types';
import styled from 'styled-components';

import CirculoLoading from './LoadingCirculo';
import Icon from './Icon';

const Base = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 5;
`;

const Background = styled(Base)`
  background-color: rgba(10, 10, 10, 0.86);
`;

const Conteudo = styled(Base)`
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  max-height: calc(100vh - 40px);
  width: 640px;
  max-width: 95vw;
  background: #fff;
  padding: 3rem;
  box-shadow: 0 2rem 6rem rgba(0, 0, 0, 0.3);
  max-height: 70vh;
  border-radius: 10px;

  /* fazendo os roles ficarem no meio */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const BotaoFechar = styled.button`
  background-color: rgba(10, 10, 10, 0.2);
  border: none;
  border-radius: 290486px;
  cursor: pointer;
  display: inline-block;
  font-size: 0;
  height: 20px;
  outline: none;
  vertical-align: top;
  width: 20px;
  height: 40px;
  position: absolute;
  right: 20px;
  top: 20px;
  width: 40px;
  &::before,
  &::after {
    background-color: #fff;
    content: '';
    display: block;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translateX(-50%) translateY(-50%) rotate(45deg);
    transform-origin: center center;
  }
  &::before {
    height: 2px;
    width: 50%;
  }
  &::after {
    height: 50%;
    width: 2px;
  }
`;

const Topo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Meio = styled.div`
  margin-top: 2rem;
`;

const TextoWrapper = styled.div`
  margin-left: 2rem;
`;

const TextoPrincipal = styled.span`
  font-size: 2rem;
`;

const TextoCorpo = styled.p``;

const Modal = ({
  estaAtivo,
  fecharModal,
  estaCarregando,
  icon,
  iconCor,
  textoPrincipal,
  textoCorpo,
  ocultarChildren,
  children,
}) => (estaAtivo ? (
  <>
    <Background />
    <Conteudo>
      <Topo>
        <BotaoFechar onClick={fecharModal} aria-label="Botão Fechar!" />
        {!!estaCarregando && !icon && <CirculoLoading />}
        {!!icon && !estaCarregando && <Icon icon={icon} cor={iconCor} />}
        <TextoWrapper>
          <TextoPrincipal>{textoPrincipal}</TextoPrincipal>
        </TextoWrapper>
      </Topo>
      <Meio>
        <TextoCorpo>{textoCorpo}</TextoCorpo>
        {!ocultarChildren && children}
      </Meio>
    </Conteudo>
  </>
) : null);

Modal.propTypes = {
  estaAtivo: PropTypes.bool,
  icon: PropTypes.string,
  iconCor: PropTypes.string,
  textoPrincipal: PropTypes.string.isRequired,
  textoCorpo: PropTypes.string,
  fecharModal: PropTypes.func.isRequired,
  ocultarChildren: PropTypes.bool,
  estaCarregando: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  estaAtivo: false,
  iconCor: '',
  icon: '',
  textoCorpo: '',
  ocultarChildren: false,
  estaCarregando: false,
};

export default Modal;
