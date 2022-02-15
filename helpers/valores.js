/**
 * converte um valor em centavos para reais
 * @param {any} valor
 * @param {boolean} cortarDecimal remove a virgula e os centavos se verdadeiro
 */
export const centavosParaReais = (valor, cortarDecimal = false) => {
  let tmp = `${valor}`;
  tmp = tmp.replace(/([0-9]{2})$/g, ',$1');
  if (tmp.length > 6) tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, '.$1,$2');

  return cortarDecimal ? tmp.slice(0, tmp.length - 3) : tmp;
};

/**
 * converte um valor em reais com centavos para centavos somente
 * @param {string} valor
 */
export const reaisParaCentavos = (valor) => Math.round(parseFloat(valor.replace(',', '.')) * 100);
