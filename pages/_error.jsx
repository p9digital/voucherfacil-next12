import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import { Container } from '../components/ui/Container';

const PaginaErro = styled.div`
  margin: 4rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ErrorCode = styled.p`
  font-size: 18rem;
  font-weight: bold;
  text-shadow: 9px 7px 1px #F47878;

  @media(max-width: 600px) {
    font-size: 15rem;
  }
`;

const ButtonVoltar = styled.button`
  margin-bottom: 6rem;
  margin-top: 4rem;
  background-color: ${(props) => props.theme.cores.quatro};
  color: #fff;
  padding: 1rem 2rem;
  font-size: 1.8rem;
  border-radius: 5px;
`;

const Textos = styled.div`
  text-align: center;

  h2 {
    font-size: 4rem;
  }

  p {
    font-size: 2rem;
  }
`;

function Error({ statusCode }) {
  return (
    <Container maxWidth="1100px">
      <PaginaErro>
        <ErrorCode>{statusCode && statusCode}</ErrorCode>
        <Textos>
          <h2>Ooops...</h2>
          <p>
            {statusCode == 404 ? 'Essa página não existe, da uma conferida ali na URl =)' : 'Ihh rapaz, alguma coisa deu errado, da uma atualizada na página =('}
          </p>
        </Textos>
        <Link href="/">
          <ButtonVoltar aria-label="Voltar para página inicial!">Voltar para página inicial!</ButtonVoltar>
        </Link>
      </PaginaErro>
    </Container>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

Error.propTypes = {
  statusCode: PropTypes.number
};

Error.defaultProps = {
  statusCode: 404
};

export default Error;
