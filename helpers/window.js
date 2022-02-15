/**
 * funcao para fazer mock do delay de um retorno
 * @param {integer} stallTime tempo para aguardar
 */
export async function stall(stallTime = 3000) {
  console.log(
    `⛔️ fazendo stalling de ${stallTime}ms - NAO ESQUECE ISSO LIGADO PLMDD`,
  );
  await new Promise((resolve) => setTimeout(resolve, stallTime));
}

/**
 * @returns {number} o width da viewport
 */
export function pegaViewportWidth() {
  return (
    window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth
  );
}

/**
 * retorna o offset top de um elemento
 * @param {string} selector
 * @returns {number} o scrolltop atual do user
 */
export const offsetTopElement = (selector) => document.querySelector(selector).offsetTop;

/**
 * faz o scroll para um elemento
 * @param {string} selector
 * @returns {undefined}
 */
export const scrollToElement = (selector) => {
  const elemento = document.querySelector(selector);
  if (!elemento) return false;

  if (elemento.scrollIntoView) {
    return elemento.scrollIntoView({
      behavior: 'smooth',
    });
  }
  return window.scrollTo({
    top: offsetTopElement(selector),
    left: 0,
    behavior: 'smooth',
  });
};

/**
 * vai para o topo da pagina
 */
export const scrollToTop = () => {
  if (!window.pageYOffset) return;

  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};
