import React from 'react';
import { ThemeProvider } from 'styled-components';
import * as theme from 'gatsby-theme-docs-system/theme';

import Global from './components/global';

export const withTheme = Component => props => (
  <ThemeProvider theme={theme}>
    <>
      <Global m="0" color="fg" bg="bg" />
      <Component {...props} />
    </>
  </ThemeProvider>
);
