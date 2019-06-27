import React from 'react';
import styled, { css } from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import Box from './box';

const linkStyle = css`
  text-decoration: none;
  color: ${p => p.theme.colors.fgHeading};
  vertical-align: sub;
`;

const HamburgerSvg = styled.svg.attrs(() => ({
  viewBox: '0 0 16 16',
  width: '24',
  height: '24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 3,
}))`
  display: block;
  vertical-align: middle;
  overflow: visible;
`;

const hamburger = (
  <HamburgerSvg>
    <path d="M0 2.5 L16 2.5 M0 8 L16 8 M0 13.5 L16 13.5" />
  </HamburgerSvg>
);

const MenuButton = styled.button.attrs(() => ({
  title: 'Toggle Menu',
}))`
  appearance: none;
  box-shadow: none;
  background: none;
  color: inherit;
  border: 0;
  outline: 0;
  padding: 5px;
  margin: -5px;
  border-radius: 4px;
  cursor: pointer;

  &:active {
    background-color: ${p => p.theme.colors.bgPassive};
  }
`;

const Header = ({ toggleMenu, children }) => {
  const {
    site: { siteMetadata },
  } = withHeaderData();

  return (
    <Box
      as="header"
      width="100%"
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      position="relative"
      zIndex={2}
      bg="bgActive"
      height={1}
      px={3}
    >
      <Box as="h3" m={0}>
        <Box as="a" m={2} href="/" css={linkStyle}>
          {siteMetadata.title}
        </Box>
      </Box>
      <Box display={['block', 'none']}>
        <MenuButton onClick={toggleMenu}>{hamburger}</MenuButton>
      </Box>
    </Box>
  );
};

const withHeaderData = () => {
  return useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
};

export default Header;
