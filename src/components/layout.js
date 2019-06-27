import React from 'react';
import { css } from 'styled-components';

import Header from './header';
import SidebarContent from './sidebar';
import Box from './box';

const Root = ({ children }) => (
  <Box display="flex" flexDirection="row" flex="1 1 auto">
    {children}
  </Box>
);

const Sidebar = ({ children }) => (
  <Box
    as="nav"
    position="sticky"
    top="0"
    minWidth="0"
    maxHeight="100vh"
    width={2}
    css={css`
      -webkit-overflow-scrolling: touch;
      overflow-y: auto;
    `}
  >
    {children}
  </Box>
);

const Container = ({ children }) => (
  <Box as="main" width="100%" maxWidth={6} mx="auto" p={4}>
    {children}
  </Box>
);

const Layout = ({ children }) => (
  <>
    <Header />
    <Root>
      <Sidebar>
        <SidebarContent />
      </Sidebar>
      <Container>{children}</Container>
    </Root>
  </>
);

export default Layout;
