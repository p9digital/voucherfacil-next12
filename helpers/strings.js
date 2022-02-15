export const removeTags = (string) => !(string === null || string === '') && string.replace(/<[^>]*>/g, '');

/**
 * Corta uma string para um tamanho maximo e inclui reticencias
 * @param {string} texto
 * @param {integer} tamanhoMaximo
 * @param {boolean} incluirRet se sera necessario incluir ... quando passar
 */
export const cortaTexto = (string, tamanhoMaximo, incluirRet) => (!(string === null || string === '')
  ? string.slice(0, tamanhoMaximo)
      + (string.length > tamanhoMaximo && incluirRet ? '...' : '')
  : '');
