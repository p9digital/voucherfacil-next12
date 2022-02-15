/**
 * gera objetos de promos vazias
 * @param {integer} quantidade
 */
export const geraPromosVazias = (quantidade = 3, carregando = true) => Array(quantidade)
  .fill({
    carregando,
  })
  .map((promoVazia) => ({
    ...promoVazia,
    id: Math.floor(Math.random() * 99 * quantidade),
  }));

/**
 *
 * @param {object} cliente
 * @param {string} promoPath
 */
export const geraPathPromocao = (cliente, promoPath) => (cliente && cliente.path && promoPath
  ? `/oferta/${cliente.path}/${promoPath}`
  : '/');

/**
 * Retorna a foto que tiver o menor campo 'ordem'
 * @param {array} fotos
 */
export const pegaFotoPrincipal = (fotos) => {
  const [fotoPrincipal] = fotos.sort(({ ordem: a }, { ordem: b }) => (a > b ? 1 : -1));
  return fotoPrincipal || null;
};
