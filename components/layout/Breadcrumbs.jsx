import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';

import devices from '../../styles/devices';

import { ArchorUnderline } from '../ui/Anchor';

const BreadcrumbsStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.theme.lighterGrey};
  font-size: 14px;
`;

const Caminho = styled.ol`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  color: inherit;
  &:not(:first-of-type) {
    padding-left: 1.5rem;
    position: relative;
    margin-left: 0.5rem;
    &::before {
      content: '>';
      position: absolute;
      top: 50%;
      left: 0;
      line-height: 1;
      transform: translateY(-50%);
    }

    @media ${devices.tablet} {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 200px;
    }
  }
`;

const Breadcrumbs = ({ caminho }) => (
  <BreadcrumbsStyled>
    <Caminho>
      {caminho.map(({ titulo, uri }) => (uri ? (
        <Item key={titulo}>
          <Link href={uri}>
            <ArchorUnderline cor="#7b7b7b" title={titulo}>
              {titulo}
            </ArchorUnderline>
          </Link>
        </Item>
      ) : (
        <Item ponta key={titulo}>
          {titulo}
        </Item>
      )))}
    </Caminho>
  </BreadcrumbsStyled>
);

Breadcrumbs.propTypes = {
  caminho: PropTypes.arrayOf(
    PropTypes.shape({
      uri: PropTypes.string,
      titulo: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Breadcrumbs;
