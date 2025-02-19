/* eslint-disable react/prop-types */
import React from 'react';
import { initializeStore } from '.';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState) {
  if (isServer) {
    return initializeStore(initialState);
  }

  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }

  return window[__NEXT_REDUX_STORE__];
}

const AppReduxed = (App) => class AppWithRedux extends React.Component {
  static async getInitialProps(appContext) {
    const reduxStore = getOrCreateStore();

    appContext.ctx.reduxStore = reduxStore;

    let appProps = {};

    if (typeof App.getInitialProps === 'function') {
      appProps = await App.getInitialProps(appContext);
    }

    return {
      ...appProps,
      initialReduxState: reduxStore.getState(),
    };
  }

  constructor(props) {
    super(props);
    this.reduxStore = getOrCreateStore(props.initialReduxState);
  }

  render() {
    return <App {...this.props} reduxStore={this.reduxStore} />;
  }
};

export default AppReduxed;
