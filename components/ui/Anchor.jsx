import styled from 'styled-components';

export const ArchorUnderline = styled.a`
  color: ${(props) => props.cor || props.theme.linkCor};
  position: relative;
  padding-bottom: 0.2rem;
  cursor: pointer;
  &::after {
    content: '';
    background: ${(props) => props.corBarra || props.cor || props.theme.linkCor};
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.4s cubic-bezier(0.86, 0, 0.07, 1);
    width: 25%;
    height: 2px;
    opacity: 0;
  }
  &:hover {
    &::after {
      width: 100%;
      opacity: 1;
    }
  }
`;
