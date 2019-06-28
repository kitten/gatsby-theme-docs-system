import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import GithubSlugger from 'github-slugger';

import { css } from 'styled-components';
import { withTheme } from '../theme';
import MDXComponents from '../components/mdx';
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
      position={['relative', 'sticky']}
      minWidth={['100%', 2]}
      maxHeight={['auto', '100vh']}
      top="0"
      pl={[0, 4]}
      py={[2, 4]}
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

const DocTemplate = ({ data: { site, mdx } }) => (
  <Layout>
    <Helmet
      title={`${mdx.frontmatter.title} – ${site.siteMetadata.title}`}
      htmlAttributes={{ lang: 'en' }}
    >
      <link
        rel="canonical"
        href={site.siteMetadata.siteUrl + mdx.fields.slug}
      />
    </Helmet>

    <Box as="h1" borderBottom={0}>
      {mdx.frontmatter.title}
    </Box>

    <Box
      display="flex"
      justifyContent={['flex-start', 'flex-start', 'space-between']}
      flexDirection={['column', 'column', 'row-reverse']}
    >
      {mdx.headings.length > 2 ? <SectionList headings={mdx.headings} /> : null}

      <Box as="main" maxWidth={5} flex="1 1" py={3}>
        <MDXComponents>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </MDXComponents>
      </Box>
    </Box>
  </Layout>
);

export const pageQuery = graphql`
  query($id: String) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
      fields {
        slug
      }
      headings(depth: h2) {
        value
      }
    }
  }
`;

export default withTheme(DocTemplate);
