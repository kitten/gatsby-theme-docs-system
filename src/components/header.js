import React from 'react';
import { css } from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import Box from './box';

const linkStyle = css`
  text-decoration: none;
  color: ${p => p.theme.colors.fgHeading};
  vertical-align: sub;
`;

const Header = ({ children }) => {
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
      height={1}
      px={3}
    >
      <Box as="h3" m={0}>
        <Box as="a" m={2} href="/" css={linkStyle}>
          {siteMetadata.title}
        </Box>
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
