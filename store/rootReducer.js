import { combineReducers } from 'redux';

import clientes from './ducks/clientes';
import locais from './ducks/locais';
import pages from './ducks/pages';

const rootReducer = combineReducers({ clientes, locais, pages });

export default rootReducer;
