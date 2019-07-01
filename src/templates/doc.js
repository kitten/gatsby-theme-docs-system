import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import styled, { css } from 'styled-components';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import GithubSlugger from 'github-slugger';

import { withTheme } from '../theme';
import MDXComponents from '../components/mdx';
import GithubIcon from '../components/icons/github';
import Box from '../components/box';
import Layout from '../components/layout';

const overflowStyle = css`
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
`;

const MenuList = styled(Box).attrs(() => ({
  as: 'ul',
  m: 0,
  fontSize: 1,
}))`
  list-style-type: none;

  & ~ & {
    margin-top: ${p => p.theme.space[3]}px;
  }
`;

const extraLinkStyle = css`
  color: inherit;
  text-decoration: none;
`;

const MenuItem = ({ children }) => (
  <Box as="li" fontWeight={2} m={0} pb={1}>
    {children}
  </Box>
);

const SectionList = ({ documentUrl, headings }) => {
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

      {headings.length > 1 ? (
        <MenuList>
          {headings.map(({ value }, index) => (
            <MenuItem key={index}>
              <Box as="a" href={`#${slugger.slug(value)}`} color="fgPassive">
                {value}
              </Box>
            </MenuItem>
          ))}
        </MenuList>
      ) : null}

      <MenuList>
        <MenuItem>
          <Box as="a" href={documentUrl} css={extraLinkStyle}>
            <GithubIcon /> Edit on GitHub
          </Box>
        </MenuItem>
      </MenuList>
    </Box>
  );
};

const DocTemplate = ({ data: { site, mdx } }) => {
  const { title, siteUrl, githubUrl } = site.siteMetadata;
  const documentUrl = `${githubUrl}/blob/master/docs${mdx.fields.from}`;

  return (
    <Layout>
      <Helmet
        title={`${mdx.frontmatter.title} – ${title}`}
        htmlAttributes={{ lang: 'en' }}
      >
        <link rel="canonical" href={siteUrl + mdx.fields.slug} />
      </Helmet>

      <Box as="h1" borderBottom={0}>
        {mdx.frontmatter.title}
      </Box>

      <Box
        display="flex"
        justifyContent={['flex-start', 'flex-start', 'space-between']}
        flexDirection={['column', 'column', 'row-reverse']}
      >
        <SectionList documentUrl={documentUrl} headings={mdx.headings} />

        <Box as="main" maxWidth={5} flex="1 1" py={3}>
          <MDXComponents>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXComponents>
        </Box>
      </Box>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($id: String) {
    site {
      siteMetadata {
        title
        siteUrl
        githubUrl
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
        from
      }
      headings(depth: h2) {
        value
      }
    }
  }
`;

export default withTheme(DocTemplate);
