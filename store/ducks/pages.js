// Action Types

const Types = {
  PREECHER_PAGINA: 'pages/PREENCHER_PAGINA',
};

const initialState = {
  page: '',
};

// Reducer

const pages = (state = initialState, action) => {
  switch (action.type) {
    case Types.PREECHER_PAGINA:
      return {
        page: action.payload.page,
      };
    default:
      return state;
  }
};

// Action Creators

export const preencherPages = (page) => ({
  type: Types.PREECHER_PAGINA,
  payload: { page },
});

export default pages;
