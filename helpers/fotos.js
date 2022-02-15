/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { adicionaBaseUrl } from './assets';

// ordem correta dos tamanhos de fotos, do menor para o maior
const KEYS_TAMANHOS_ORDENADAS = [
  'mob_xxs',
  'mob_xs',
  'mob',
  'desk',
  'desk_xl',
  'desk_xxl',
  'original',
];

/**
 * Dada um tamanho desejado de foto, tenta pegar ele no objeto referenciado
 * ou entao retorna a proxima foto disponivel que seja maior que o desejado
 * @param {object} options
 */

export const pegaFotoResponsivaDisponivel = ({
  objeto,
  tamanhoDesejado,
  prefixo,
  adicionarBaseUrl,
}) => {
  // se houver o tamanho desejado, retorna ele
  const fotoTamanhoDesejado = objeto[prefixo + tamanhoDesejado];

  if (fotoTamanhoDesejado) {
    return adicionarBaseUrl ? adicionaBaseUrl(fotoTamanhoDesejado) : fotoTamanhoDesejado;
  }

  // se nao houver o tamanho desejado, percorre na ordem menor -> maior ate achar um preenchido
  // achar a posicao desejada na array ordenada
  const posicaoDesejada = KEYS_TAMANHOS_ORDENADAS.indexOf(tamanhoDesejado);
  if (posicaoDesejada < 0) return null;

  // separa a porcao da array ordenada que esta depois da desejada nao encontrada
  const posicoesDisponiveis = KEYS_TAMANHOS_ORDENADAS.filter((_, index) => index > posicaoDesejada);
  if (!posicoesDisponiveis.length) return null;

  // encontra a key da foto disponivel que eh maior que a desejada
  const posicaoEncontrada = posicoesDisponiveis.find((posicao) => objeto[prefixo + posicao]);

  const fotoTamanhoDisponivel = objeto[prefixo + posicaoEncontrada];
  if (fotoTamanhoDisponivel) {
    return adicionarBaseUrl ? adicionaBaseUrl(fotoTamanhoDisponivel) : fotoTamanhoDisponivel;
  }
};

/**
 * Retorna uma lista com as imagens disponiveis para cada tamanho da lista prefixada
 * @param {object} options
 */
export const pegaListaDeFotosResponsivas = ({
  objeto,
  prefixo,
  adicionarBaseUrl,
} = {}) => KEYS_TAMANHOS_ORDENADAS.reduce((acum, tamanhoKey) => {
  const fotoDisponivel = pegaFotoResponsivaDisponivel({
    objeto,
    prefixo,
    tamanhoDesejado: tamanhoKey,
    adicionarBaseUrl,
  });

  acum[tamanhoKey] = fotoDisponivel;
  return acum;
}, {});
