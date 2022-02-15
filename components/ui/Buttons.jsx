import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${(props) => props.theme.cores.dois};
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  font-size: 1.6rem;
  margin: 1.4rem 0.5rem 0.5rem;
  transition: all 0.2s;
  padding: 0.6rem 2rem;
  align-self: center;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  &:focus {
    transform: translateY(0);
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
  }
`;

export const ButtonPrimary = styled(Button)`
  background-color: white;
  color: ${(props) => props.theme.cores.quatro};
`;

export const ButtonBlock = styled(Button)`
  display: block;
  text-transform: uppercase;
  width: 100vw;
  margin: 2rem auto;
  border-radius: 0;
  padding: 2rem 1rem;
  font-size: 2rem;
  background: ${(props) => props.theme.highlightGreen};
`;

export const ButtonDownload = styled(ButtonPrimary)`
  background-color: ${(props) => props.theme.lightYellow};
  color: #fff;
  font-size: 2rem;
  text-transform: uppercase;
  border-radius: 3rem;
  margin-top: 0;
  padding: 1.5rem 6rem;

  @media print {
    display: none;
  }
`;
