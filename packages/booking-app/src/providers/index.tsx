import React, { FC, PropsWithChildren, ReactElement } from 'react';
import AntdProvider from './AntdProvider';
import LanguageProvider from './LanguageProvider';
import StyleComponentProvider from './StyleComponentProvider';

export interface AppProviderProps extends PropsWithChildren<any> {}

const AppProvider: FC<AppProviderProps> = ({ children }): ReactElement => {
  return (
    <AntdProvider>
      <StyleComponentProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </StyleComponentProvider>
    </AntdProvider>
  );
};

export default AppProvider;
