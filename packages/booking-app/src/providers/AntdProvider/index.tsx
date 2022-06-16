import React, { FC, PropsWithChildren, ReactElement, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ConfigProvider } from 'antd';
import { Locale } from 'antd/lib/locale-provider';
import { LanguageType } from '@app/types/index';
import * as languageSelectors from '../LanguageProvider/selectors';

import { antdLocales } from '../../translations/index';

export interface AntdProviderProps extends PropsWithChildren<any> {}

const AntdProvider: FC<AntdProviderProps> = ({ children }): ReactElement => {
  const language: LanguageType = useSelector(languageSelectors.languageSelector);

  const locale: Locale = useMemo(() => {
    return antdLocales[language];
  }, [language]);

  useEffect(() => {
    ConfigProvider.config({
      theme: {
        primaryColor: '#f58220',
        // errorColor: '#ff4d4f',
        // warningColor: '#faad14',
        // successColor: '#52c41a',
        // infoColor: '#1890ff',
      },
    });
  }, []);

  return <ConfigProvider locale={locale}>{children}</ConfigProvider>;
};

export default AntdProvider;
