import React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';

import Layout from '../components/layout';

const DocTemplate = ({ data: { mdx } }) => (
  <Layout>
    <MDXRenderer>{mdx.body}</MDXRenderer>
  </Layout>
);

export const pageQuery = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
    }
  }
`;

export default DocTemplate;
