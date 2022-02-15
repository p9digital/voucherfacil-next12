// Action Types

const Types = {
  PREENCHER_CIDADES: 'locais/PREENCHER_CIDADES',
  PREENCHER_CIDADE_ESCOLHIDA: 'locais/PREENCHER_CIDADE_ESCOLHIDA',
};

// Reducer

const initialState = {
  cidades: [],
  cidadeEscolhida: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.PREENCHER_CIDADES:
      return {
        ...state,
        cidades: action.payload.cidades,
      };
    case Types.PREENCHER_CIDADE_ESCOLHIDA:
      return {
        ...state,
        cidadeEscolhida: action.payload.cidade,
      };
    default:
      return state;
  }
};

// Action Creators

export const preencherCidades = (cidades) => ({
  type: Types.PREENCHER_CIDADES,
  payload: { cidades },
});

export const preencherCidadeEscolhida = (cidade) => ({
  type: Types.PREENCHER_CIDADE_ESCOLHIDA,
  payload: { cidade },
});

export default reducer;
