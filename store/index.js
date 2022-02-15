import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './rootReducer';

export function initializeStore(initialState) {
  const isClient = typeof window !== 'undefined';
  let store;

  if (isClient) {
    const persistConfig = {
      key: 'root',
      storage,
      blacklist: ['clientes', 'pages'],
    };

    store = createStore(
      persistReducer(persistConfig, rootReducer),
      initialState,
      composeWithDevTools(applyMiddleware(thunk)),
    );

    store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore(
      rootReducer,
      initialState,
      composeWithDevTools(applyMiddleware(thunk)),
    );
  }

  return store;
}
