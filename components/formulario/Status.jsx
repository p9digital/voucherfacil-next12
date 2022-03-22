/* eslint-disable react/forbid-prop-types */
import PropTypes from "prop-types";
import styled from 'styled-components';

export const StatusWrapperStyles = styled.div`
  max-width: 50rem;
  height: 60rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  .loader-texto {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 2rem;
    color: ${(props) => props.theme.black};
  }
`;

export const StatusWrapper = styled.div`
  padding: 3rem 2rem;
  max-width: 50rem;
  height: 60rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: ${(props) => (props.light ? props.theme.lessLighterGrey : props.theme.cores.quatro)};
  border-radius: ${(props) => (props.light ? '1rem' : '3rem')};
  box-shadow: ${(props) => (props.light ? props.theme.boxShadow2 : 'none')};

  .loader-texto {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 2rem;
    color: ${(props) => (props.light ? props.theme.cores.seis : '#fff')};
    text-align: center;
  }
`;

export const ErroStatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  
  p, a {
    color: ${(props) => (props.color ? props.color : '#fff')};
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  a {
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
  }

  a:hover{
    border-bottom: 2px solid ${(props) => (props.color ? props.color : '#fff')};
  }

  p {
    margin-top: 2.5rem;
  }
`;

export function ErroStatus({ children, color }) {
  return (
    <ErroStatusWrapper color={color}>
      {children}
    </ErroStatusWrapper>
  );
}

ErroStatus.propTypes = {
  children: PropTypes.any,
  color: PropTypes.string
};

ErroStatus.defaultProps = {
  children: <></>,
  color: "#000000"
};
