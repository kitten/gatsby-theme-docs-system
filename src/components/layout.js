import React from 'react';
import { css } from 'styled-components';

import Header from './header';
import SidebarContent from './sidebar';
import Box from './box';

const overflowStyle = css`
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
`;

const Root = ({ children }) => (
  <Box flexDirection={['column', 'row']} flex="1 1 auto" display="flex">
    {children}
  </Box>
);

const Sidebar = ({ children }) => (
  <Box
    as="nav"
    position={['relative', 'sticky']}
    maxHeight={['auto', '100vh']}
    width={['100%', 2]}
    minWidth={['100%', '0']}
    css={overflowStyle}
    top="0"
  >
    {children}
  </Box>
);

const Container = ({ children }) => (
  <Box as="main" width="100%" maxWidth={7} mx="auto" p={4}>
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
