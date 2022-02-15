import fetch from 'isomorphic-unfetch';

const defineUrl = ({
  cidadePath, uf, clientePath,
} = {}) => {
  if (clientePath && cidadePath) {
    return `${process.env.API_BASE_URL}/clientes/${clientePath}/cidade/${cidadePath}/promocoes`;
  }

  if (clientePath) {
    return `${process.env.API_BASE_URL}/clientes/${clientePath}/promocoes`;
  }

  if (uf && cidadePath) {
    return `${process.env.API_BASE_URL}/estados/${uf}/cidades/${cidadePath}/promocoes`;
  }

  return `${process.env.API_BASE_URL}/promocoes/todas`;
};

/**
 * pega lista de promocoes
 */
export const buscaPromocoes = async ({
  cidadePath,
  uf,
  clientePath,
} = {}) => {
  const url = defineUrl({
    cidadePath, uf, clientePath,
  });

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data || {};
  } catch (error) {
    return {};
  }
};

export const buscaPromocao = async (clientePath, promocaoPath) => {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/clientes/${clientePath}/promocoes/${promocaoPath}`,
    );
    const data = await response.json();

    return data || {};
  } catch (error) {
    return {};
  }
};

export const buscaPesquisa = async (clientePath, promocaoPath) => {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/pesquisa/${clientePath}/${promocaoPath}`,
    );
    const data = await response.json();

    return data || {};
  } catch (error) {
    return {};
  }
};
