import React from 'react';
import { ThemeProvider } from 'styled-components';
import * as theme from 'gatsby-theme-docs-system/theme';

import Global from './components/global';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <>
      <Global m="0" color="fg" bg="bg" />
      {element}
    </>
  </ThemeProvider>
);
