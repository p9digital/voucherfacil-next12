import fetch from 'isomorphic-unfetch';

const defineUrl = ({ cidadePath, uf, clientePath } = {}) => {
  if (clientePath) {
    return `${process.env.API_BASE_URL}/clientes/${clientePath}/destaques`;
  }

  if (uf && cidadePath) {
    return `${process.env.API_BASE_URL}/estados/${uf}/cidades/${cidadePath}/destaques`;
  }

  return `${process.env.API_BASE_URL}/destaques/todos`;
};

export const buscaDestaques = async ({
  cidadePath,
  uf,
  clientePath,
} = {}) => {
  const url = defineUrl({ cidadePath, uf, clientePath });

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data || {};
  } catch (error) {
    return {};
  }
};
