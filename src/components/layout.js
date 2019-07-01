import React, {
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import VisuallyHidden from '@reach/visually-hidden';
import { ThemeContext } from 'styled-components';
import { SkipNavLink, SkipNavContent } from '@reach/skip-nav';
import { css } from 'styled-components';

import Header from './header';
import SidebarContent from './sidebar';
import Box from './box';

const overflowStyle = css`
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
`;

const useIsMobile = media => {
  if (typeof window === 'undefined') {
    return false;
  }

  const theme = useContext(ThemeContext);

  const mq = useMemo(() => {
    return window.matchMedia(`(max-width: ${theme.breakpoints[0]}`);
  }, []);

  const [matches, setMatches] = useState(mq.matches);

  useEffect(() => {
    const update = () => setMatches(mq.matches);
    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  return matches;
};

const Root = ({ children }) => (
  <Box
    flexDirection={['column', 'row']}
    alignItems="flex-start"
    display="flex"
    maxWidth={8}
    margin="0 auto"
  >
    {children}
  </Box>
);

const Sidebar = ({ isMenuOpen, children }) => {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'static';
    }
  }, [isMenuOpen, isMobile]);

  return (
    <Box
      as="nav"
      position={['fixed', 'sticky']}
      display={[isMenuOpen ? 'block' : 'none', 'block']}
      maxHeight={['auto', '100vh']}
      bg={['bg', 'transparent']}
      height={['100vh', 'auto']}
      minWidth={['100%', 1]}
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
};

const Container = ({ children }) => (
  <Box width="100%" maxWidth={7} mx="auto" p={4}>
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

      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

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
