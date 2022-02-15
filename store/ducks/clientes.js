// Action Types

const Types = {
  PREENCHER_CLIENTE: 'clientes/PREENCHER_CLIENTE',
};

const initialState = {
  clienteAtual: null,
};

// Reducer
const clientes = (state = initialState, action) => {
  switch (action.type) {
    case Types.PREENCHER_CLIENTE:
      return {
        clienteAtual: action.payload.cliente,
      };
    default:
      return state;
  }
};

// Action Creators
export const preencherCliente = (cliente) => ({
  type: Types.PREENCHER_CLIENTE,
  payload: { cliente },
});

export default clientes;
