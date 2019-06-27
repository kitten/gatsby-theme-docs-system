import React, { useState, useCallback } from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav';
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

const Sidebar = ({ isMenuOpen, children }) => (
  <Box
    as="nav"
    position={['fixed', 'sticky']}
    display={[isMenuOpen ? 'block' : 'none', 'block']}
    maxHeight={['auto', '100vh']}
    bg={['bg', 'transparent']}
    height={['100vh', 'auto']}
    minWidth={['100%', '0']}
    bottom={['0', 'unset']}
    width={['100%', 2]}
    css={overflowStyle}
    zIndex={1}
    pt={[5, 0]}
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

const Layout = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = useCallback(() => setMenuOpen(x => !x), []);

  return (
    <>
      <VisuallyHidden>
        <SkipNavLink />
      </VisuallyHidden>

      <Header toggleMenu={toggleMenu} />
      <Root>
        <Sidebar isMenuOpen={isMenuOpen}>
          <SidebarContent />
        </Sidebar>
        <Container>
          <SkipNavContent />
          {children}
        </Container>
      </Root>
    </>
  );
};

export default Layout;
