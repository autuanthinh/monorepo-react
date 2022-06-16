import '../styles/globals.css';
import App from 'next/app';
import type { AppProps, AppContext } from 'next/app';
import withRedux from 'next-redux-wrapper';
import Provider from '@app/providers';

import { wrapper } from '@app/redux/store';
import { useStore } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

// // Only uncomment this method if you have blocking data requirements for
// // every single page in your application. This disables the ability to
// // perform automatic static optimization, causing every page in your app to
// // be server-side rendered.
// //
MyApp.getInitialProps = async (appContext: AppContext) => {
  const { Component, ctx } = appContext;
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

  return { pageProps };
};

//withRedux wrapper that passes the store to the App Component
export default wrapper.withRedux(MyApp);
