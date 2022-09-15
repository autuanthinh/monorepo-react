import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import Cookies from 'cookies';
import { ServerStyleSheet } from 'styled-components';
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGE } from '@app/providers/LanguageProvider/constants';
import moment from 'moment';

type Props = DocumentInitialProps & { locale: string };

class MyDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext): Promise<Props> {
    // Create a cookies instance
    const cookies = new Cookies(ctx.req as any, ctx.res as any);
    const sheet = new ServerStyleSheet();

    // Get a cookie
    let locale: string = cookies.get('language') || '';
    // locale = SUPPORTED_LANGUAGE.includes(locale) ? locale : DEFAULT_LANGUAGE;
    locale = SUPPORTED_LANGUAGE.includes(locale) ? locale : 'vi';

    if (SUPPORTED_LANGUAGE.includes(locale)) {
      // Set a cookie
      cookies.set('language', locale, {
        httpOnly: true, // true by default
        path: '/',
        expires: moment().add(100, 'years').toDate(),
      });
    }

    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          // useful for wrapping the whole react tree
          enhanceApp: (App: any) => props => sheet.collectStyles(<App {...props} locale={locale} />),
          // useful for wrapping in a per-page basis
          enhanceComponent: Component => Component,
        });

      // Run the parent `getInitialProps`, it now includes the custom `renderPage`
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        locale,
        styles: [
          // Config style-component
          <React.Fragment key="styles">
            {initialProps.styles}
            {sheet.getStyleElement()}
          </React.Fragment>,
        ],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const { locale } = this.props;
    return (
      <Html lang={locale}>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
