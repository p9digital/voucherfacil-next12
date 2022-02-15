/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable no-useless-escape */
export function validacao(dados, data) {
  if (!dados.nome || !dados.email || !dados.celular || !data || !dados.unidade || !dados.periodo) {
    return false;
  }

  if (dados.celular.length < 14) {
    return false;
  }

  return true;
}

export function validacaoPesquisa(dados) {
  if (!dados.nome || !dados.email || !dados.celular || !dados.unidade) {
    return false;
  }

  if (dados.celular.length < 14) {
    return false;
  }

  return true;
}

export function validacaoInteresse(dados) {
  if (!dados.nome || !dados.email || !dados.celular || !dados.uf || !dados.cidade) {
    return false;
  }

  if (dados.celular.length < 14) {
    return false;
  }

  return true;
}

export function validacaoContato(dados) {
  if (!dados.nome || !dados.email || !dados.celular || !dados.assunto) {
    return false;
  }

  if (dados.celular.length < 14) {
    return false;
  }

  return true;
}

export function validacaoDivulgue(dados) {
  if (!dados.segmento || !dados.atendimento || !dados.nomeEmpresa || !dados.nome || !dados.uf || !dados.cidade || !dados.email || !dados.celular || !dados.ticketMedio) {
    return false;
  }

  if (dados.celular.length < 14) {
    return false;
  }

  return true;
}

export const validaTelefone = (telefone) => {
  const valido = /^(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/.test(
    telefone,
  );

  const valido2 = /^(?:\(?([1-9][0-9])\)?\s?)?(?:((?:[9]?[9][9][9][9]))\-?([9][9][9][9]))$/.test(
    telefone,
  );

  return valido && !valido2;
};

export const estados = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];

export const validaCpf = (strCPF) => {
  let Soma = 0;
  let Resto;
  strCPF = strCPF
    .replace("-", "")
    .replace(".", "")
    .replace(".", "")
    .replace("/", "");

  if (
    strCPF == "00000000000"
    || strCPF == "11111111111"
    || strCPF == "22222222222"
    || strCPF == "33333333333"
    || strCPF == "44444444444"
    || strCPF == "55555555555"
    || strCPF == "66666666666"
    || strCPF == "77777777777"
    || strCPF == "88888888888"
    || strCPF == "99999999999"
  ) {
    return false;
  }

  for (let i = 1; i <= 9; i++) {
    Soma += parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  }
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) {
    Resto = 0;
  }
  if (Resto != parseInt(strCPF.substring(9, 10))) {
    return false;
  }

  Soma = 0;
  for (let i = 1; i <= 10; i++) {
    Soma += parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  }
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) {
    Resto = 0;
  }
  if (Resto != parseInt(strCPF.substring(10, 11))) {
    return false;
  }
  return true;
};

export const validaCnpj = (cnpj) => {
  cnpj = cnpj.replace(/[^\d]+/g, "");

  if (cnpj == "") {
    return false;
  }

  if (cnpj.length != 14) {
    return false;
  }

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj == "00000000000000"
    || cnpj == "11111111111111"
    || cnpj == "22222222222222"
    || cnpj == "33333333333333"
    || cnpj == "44444444444444"
    || cnpj == "55555555555555"
    || cnpj == "66666666666666"
    || cnpj == "77777777777777"
    || cnpj == "88888888888888"
    || cnpj == "99999999999999"
  ) {
    return false;
  }

  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) {
    return false;
  }

  tamanho += 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) {
    return false;
  }

  return true;
};
