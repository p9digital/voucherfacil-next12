export const marca = {
  vermelho1: '#d7431d',
  vermelho2: '#89202b',
  azul1: '#3d71bc',
  azul2: '#406096',
  azulEscuro1: '#1f3859',
  azulEscuro2: '#162942',
};

// variaveis e tema principal do voucher
const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  greyDarker: '#3b3b3b',
  lightGrey: '#E1E1E1',
  lighterGrey: '#7b7b7b',
  lessLighterGrey: '#9e9e9e',
  offWhite: '#EDEDED',
  maxWidth: '1100px',
  boxShadow1: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
  boxShadow2: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
  marcaCor1: '#d7431d',
  borderRadius1: '10px',
  borderRadius2: '5px',
  navbarGap: '8.4rem',
  linkCor: '#0074de',
  highlightGreen: '#71d946',
  lightYellow: '#C3BC16',
  cores: {
    um: marca.vermelho1,
    dois: marca.azul1,
    tres: marca.azul2,
    quatro: marca.azulEscuro1,
    cinco: marca.vermelho2,
    seis: marca.azulEscuro2,
  },
  outrasCores: {
    verdeSucesso1: '#71da46',
    verdeSucesso2: '#5D804F',
    cinza1: '#3A3A3A',
    cinzaClaro1: '#E1E1E1',
    cinzaClaro2: '#9e9e9e',
  },
  sombras: {
    fraca1: '0 3px 4px 0 rgba(0, 0, 0, 0.04)',
  },
  marca: {
    ...marca,
  },
};

export default theme;
