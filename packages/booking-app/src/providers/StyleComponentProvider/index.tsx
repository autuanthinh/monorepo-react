import React, { FC, PropsWithChildren, ReactElement, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import _ from 'lodash';

import GlobalStyle from '@app/styles/global';
import colors from './colors';
import shadows from './shadows';

export interface StyleComponentProviderProps extends PropsWithChildren<any> {}

const StyleComponentProvider: FC<StyleComponentProviderProps> = ({ children }): ReactElement => {
  const theme = useMemo(() => {
    return {
      colors: colors(),
      shadows: shadows(),
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default StyleComponentProvider;
