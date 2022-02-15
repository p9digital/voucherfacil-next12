/**
 * Adiciona o prefixo de url do storage
 * @param {string} assetPath
 */
export const adicionaBaseUrl = (assetPath) => `${process.env.STORAGE_BASE_URL}/${assetPath}`;
