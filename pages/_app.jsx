import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import TagManager from 'react-gtm-module';
import fetch from 'isomorphic-unfetch';
import { PersistGate } from 'redux-persist/integration/react';

import withReduxStore from '../store/withReduxStore';
import Layout from '../components/layout/Layout';
import GlobalStyle from '../styles/GlobalStyle';
import NProgress from '../components/layout/NProgress';

import theme from '../styles/theme';

import { preencherCidades } from '../store/ducks/locais';

import 'react-dates/lib/css/_datepicker.css';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    const response = await fetch(`${process.env.API_BASE_URL}/promocoes/cidades`);
    const { success, data: cidades } = await response.json();

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { cidades: success ? cidades : [], pageProps };
  }

  componentDidMount() {
    TagManager.initialize({
      gtmId: 'GTM-TZQQSL3',
    });
  }

  render() {
    const {
      Component, pageProps, reduxStore, cidades,
    } = this.props;

    reduxStore.dispatch(preencherCidades(cidades));

    return (
      <ThemeProvider theme={theme}>
        <Provider store={reduxStore}>
          <PersistGate
            persistor={reduxStore.__PERSISTOR}
            loading={(
              <>
                <GlobalStyle />
                <Layout>
                  <NProgress />
                  <Component {...pageProps} />
                </Layout>
              </>
            )}
          >
            <GlobalStyle />
            <Layout>
              <NProgress />
              <Component {...pageProps} />
            </Layout>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default withReduxStore(MyApp);
