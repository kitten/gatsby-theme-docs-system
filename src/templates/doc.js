import React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import GithubSlugger from 'github-slugger';

import { css } from 'styled-components';
import Box from '../components/box';
import Layout from '../components/layout';

const overflowStyle = css`
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
`;

const listStyle = css`
  list-style-type: none;
`;

const MenuList = ({ children }) => (
  <Box as="ul" m={0} fontSize={1} css={listStyle}>
    {children}
  </Box>
);

const MenuItem = ({ children }) => (
  <Box as="li" fontWeight={2} m={0} pb={1}>
    {children}
  </Box>
);

const SectionList = ({ headings }) => {
  const slugger = new GithubSlugger();

  return (
    <Box
      as="aside"
      position="sticky"
      minWidth={2}
      top="0"
      pl={4}
      py={4}
      maxHeight="100vh"
      css={overflowStyle}
    >
      <Box as="h4" m={0} pb={2}>
        In this section
      </Box>
      <MenuList>
        {headings.map(({ value }, index) => (
          <MenuItem key={index}>
            <Box as="a" href={`#${slugger.slug(value)}`} color="fgPassive">
              {value}
            </Box>
          </MenuItem>
        ))}
      </MenuList>
    </Box>
  );
};

const DocTemplate = ({ data: { mdx } }) => (
  <Layout>
    <Box as="h1" borderBottom={0}>
      {mdx.frontmatter.title}
    </Box>

    <Box display="flex" flexDirection="row-reverse">
      {mdx.headings.length > 2 ? <SectionList headings={mdx.headings} /> : null}

      <Box as="main" flex="1 1 auto" py={3}>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </Box>
    </Box>
  </Layout>
);

export const pageQuery = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
      headings(depth: h2) {
        value
      }
    }
  }
`;

export default DocTemplate;
