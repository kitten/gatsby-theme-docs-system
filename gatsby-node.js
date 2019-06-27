const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type !== 'Mdx') {
    return;
  }

  const slug = createFilePath({ node, getNode, trailingSlash: false });
  const { name = '', relativeDirectory = '' } = getNode(node.parent);
  const isIndex = name === 'index' || !relativeDirectory;

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
  const { createPage } = actions;

  const { data, errors } = await graphql(`
    {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  if (errors) throw errors;

  data.allMdx.edges.forEach(({ node }) => {
    const { slug: path } = node.fields;

    createPage({
      path,
      context: { id: node.id },
      component: require.resolve('./src/templates/doc'),
    });
  });
};
