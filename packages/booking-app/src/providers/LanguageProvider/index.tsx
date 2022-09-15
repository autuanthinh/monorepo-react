import React, { FC, PropsWithChildren, ReactElement, useEffect, useMemo } from 'react';
// import Head from 'next/head';

import { useSelector } from 'react-redux';

import { IntlProvider } from 'react-intl';

import { translationMessages } from 'src/translations';

import * as languageSelectors from './selectors';

export interface LanguageProviderProps extends PropsWithChildren<any> {}

const LanguageProvider: FC<LanguageProviderProps> = ({ children }): ReactElement => {
  const language = useSelector(languageSelectors.languageSelector);

  const messages = useMemo<any>(() => {
    const translateData: any = translationMessages;
    return translateData[language] || {};
  }, [language]);

  return (
    <IntlProvider locale={language} messages={messages}>
      {children}
    </IntlProvider>
  );
};

export default LanguageProvider;
