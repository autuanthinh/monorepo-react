import React, { useEffect, useMemo } from 'react';
import type { AppProps, AppContext } from 'next/app';
import Cookies from 'cookies';
import { useRouter } from 'next/router';
import Utils from '@app/utils';

import { wrapper } from '@app/redux/store';
import { useDispatch, useSelector } from 'react-redux';

import Provider from '@app/providers';
import PageLoading from '@app/container/PageLoading';

import * as appSelectors from '@app/container/App/selectors';
import * as appActions from '@app/container/App/actions';
import * as languageActions from '@app/providers/LanguageProvider/actions';

import 'antd/dist/antd.variable.min.css';
import '@app/styles/globals.scss';

type MyAppProps = AppProps & {
  locale: string;
};

function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props;
  const dispatch = useDispatch();

  // console.log({ props });

  const isLoading = useSelector(appSelectors.isLoadingSelector);
  const isCheckedLogin = useSelector(appSelectors.isCheckedLoginSelector);
  const authToken = useSelector(appSelectors.tokenSelector);

  const isLoggedIn = useMemo(() => !!authToken, [authToken]);

  const router = useRouter();
  const authRequired = useMemo(() => Utils.isAuthPage(router.pathname), [router.pathname]);

  useEffect(() => {
    dispatch(appActions.checkTokenExisted());
  }, [dispatch]);

  useEffect(() => {
    router.events.on('routeChangeComplete', authCheck);
    return () => {
      router.events.off('routeChangeComplete', authCheck);
    };
  }, [router, isCheckedLogin]);

  function authCheck(url: string) {
    // redirect to login page if accessing a private page and not logged in
    const path = url.split('?')[0];
    const authRequired2 = Utils.isAuthPage(path);
    if (authRequired2 && isCheckedLogin && !isLoggedIn) {
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath },
      });
    }
  }

  return (
    <Provider>
      {authRequired ? (
        isLoading ? (
          <PageLoading />
        ) : isLoggedIn ? (
          <Component {...pageProps} />
        ) : null
      ) : (
        <Component {...pageProps} />
      )}
    </Provider>
  );
}

// // Only uncomment this method if you have blocking data requirements for
// // every single page in your application. This disables the ability to
// // perform automatic static optimization, causing every page in your app to
// // be server-side rendered.
// //
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const { Component, ctx } = appContext;
//   const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

//   // Init language
//   const cookies = new Cookies(ctx.req as any, ctx.res as any);
//   let locale: string = cookies.get('language') || '';
//   ctx.store.dispatch(languageActions.setLanguage(locale));

//   return { pageProps: { ...pageProps } };
// };

MyApp.getInitialProps = wrapper.getInitialAppProps(store => async (appContext: AppContext) => {
  const { Component, ctx } = appContext;
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

  // // Init language
  // const cookies = new Cookies(ctx.req as any, ctx.res as any);
  // let locale: string = cookies.get('language') || '';
  // // store.dispatch(languageActions.setLanguage(locale));
  // (store.dispatch as any)(languageActions.setLanguage(locale));

  return { pageProps: { ...pageProps } };
});

//withRedux wrapper that passes the store to the App Component
export default wrapper.withRedux(MyApp);
