const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type !== 'Mdx') {
    return;
  }

  const slug = createFilePath({
    node,
    getNode,
    trailingSlash: false,
  });

  const { name = '', relativePath, relativeDirectory = '' } = getNode(
    node.parent
  );
  const isIndex = name === 'index' || name === 'README' || !relativeDirectory;

  createNodeField({
    name: 'from',
    value: `/${relativePath}`,
    node,
  });

  createNodeField({
    name: 'slug',
    value: slug,
    node,
  });

  createNodeField({
    name: 'type',
    value: isIndex ? 'parent' : 'child',
    node,
  });

  createNodeField({
    name: 'parent',
    value: relativeDirectory,
    node,
  });
};

exports.createPages = async ({ graphql, actions, getNode }) => {
  const { createPage, createRedirect } = actions;
  const { data, errors } = await graphql(`
    {
      allMdx {
        edges {
          node {
            id
            fields {
              from
              slug
            }
          }
        }
      }
    }
  `);

  if (errors) throw errors;

  data.allMdx.edges.forEach(({ node }) => {
    const { slug, from } = node.fields;

    createPage({
      path: slug,
      context: { id: node.id },
      component: require.resolve('./src/templates/doc'),
    });

    createRedirect({
      redirectInBrowser: true,
      isPermanent: false,
      fromPath: `${slug}/`,
      toPath: slug,
    });

    createRedirect({
      redirectInBrowser: true,
      isPermanent: false,
      fromPath: from,
      toPath: slug,
    });
  });
};
