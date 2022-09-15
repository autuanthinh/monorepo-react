import React, { FC, PropsWithChildren, ReactElement, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ConfigProvider } from 'antd';
import { Locale } from 'antd/lib/locale-provider';
import { Theme } from 'antd/lib/config-provider/context';
import { LanguageType } from '@app/types/index';
import * as languageSelectors from '../LanguageProvider/selectors';

import { antdLocales } from '../../translations/index';

export interface AntdProviderProps extends PropsWithChildren<any> {}

const AntdProvider: FC<AntdProviderProps> = ({ children }): ReactElement => {
  const language: LanguageType = useSelector(languageSelectors.languageSelector);

  const locale: Locale = useMemo(() => {
    return antdLocales[language];
  }, [language]);

  const theme: Theme = useMemo(() => {
    return {
      primaryColor: '#f58220',
      infoColor: '#1890ff',
      successColor: '#52c41a',
      errorColor: '#ff4d4f',
      warningColor: '#faad14',
    };
  }, []);

  useEffect(() => {
    ConfigProvider.config({
      theme,
    });
  }, [theme]);

  return <ConfigProvider locale={locale}>{children}</ConfigProvider>;
};

export default AntdProvider;
