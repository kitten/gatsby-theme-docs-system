import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import styled, { css } from 'styled-components';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import GithubSlugger from 'github-slugger';

import { withTheme } from '../theme';
import MDXComponents from '../components/mdx';
import { usePagesData } from '../components/useContentData';
import GithubIcon from '../components/icons/github';
import ArrowIcon from '../components/icons/arrow';
import Box from '../components/box';
import Layout from '../components/layout';

const overflowStyle = css`
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
`;

const GreyText = ({ children }) => (
  <Box as="span" color="fgPassive">
    {children}
  </Box>
);

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

const NextPage = ({ children }) => (
  <>
    <Box as="span" color="fgPassive">
      {` Next Page `}
    </Box>
    <Box as="span"></Box>
  </>
);

const MenuItem = ({ children, ...props }) => (
  <Box as="li" fontWeight={2} m={0} pb={1} {...props}>
    {children}
  </Box>
);

const SectionList = ({ documentUrl, currentPageId, headings }) => {
  const slugger = new GithubSlugger();
  const overview =
    headings.length > 1 ? (
      <>
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
      </>
    ) : null;

  const pages = usePagesData();
  const pageIndex = pages.findIndex(node => node.id === currentPageId);
  const nextPage = pages[pageIndex + 1];
  const lastPage = pages[pageIndex - 1];

  const lastLink = lastPage ? (
    <MenuItem my={1}>
      <Box as="a" href={lastPage.fields.slug} css={extraLinkStyle}>
        <ArrowIcon rotate />
        <GreyText>{` Previous `}</GreyText>
        {`“${lastPage.frontmatter.title}”`}
      </Box>
    </MenuItem>
  ) : null;

  const nextLink = nextPage ? (
    <MenuItem my={1}>
      <Box as="a" href={nextPage.fields.slug} css={extraLinkStyle}>
        <ArrowIcon />
        <GreyText>{` Next `}</GreyText>
        {`“${nextPage.frontmatter.title}”`}
      </Box>
    </MenuItem>
  ) : null;

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
      {overview}
      <MenuList>
        <MenuItem my={1}>
          <Box as="a" href={documentUrl} css={extraLinkStyle}>
            <GithubIcon /> Edit on GitHub
          </Box>
        </MenuItem>
        {lastLink}
        {nextLink}
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
        <SectionList
          documentUrl={documentUrl}
          currentPageId={mdx.id}
          headings={mdx.headings}
        />

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
