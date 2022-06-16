import React, { FC, PropsWithChildren, ReactElement } from 'react';
import AntdProvider from './AntdProvider';
import LanguageProvider from './LanguageProvider';

export interface AppProviderProps extends PropsWithChildren<any> {}

const AppProvider: FC<AppProviderProps> = ({ children, store }): ReactElement => {
  return (
    <AntdProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </AntdProvider>
  );
};

export default AppProvider;
