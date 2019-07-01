import { useMemo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

export const useItemsData = () => {
  return useStaticQuery(graphql`
    query SidebarQuery {
      parentItems: allMdx(
        filter: { fields: { type: { eq: "parent" } } }
        sort: { fields: frontmatter___order, order: ASC }
      ) {
        nodes {
          id
          frontmatter {
            title
          }
          fields {
            slug
          }
          fields {
            parent
          }
        }
      }
      childItems: allMdx(
        filter: { fields: { type: { eq: "child" } } }
        sort: { fields: frontmatter___order, order: ASC }
      ) {
        group(field: fields___parent) {
          fieldValue
          nodes {
            id
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);
};

export const useContentData = () => {
  const { parentItems, childItems } = useItemsData();

  return useMemo(() => {
    const { nodes: parents } = parentItems;
    const { group: groups } = childItems;

    return parents.map(node => {
      const { parent } = node.fields;

      let children = [];
      if (parent) {
        const group = groups.find(group => group.fieldValue === parent);
        if (group) {
          children = group.nodes;
        }
      }

      return { ...node, children };
    });
  }, [parentItems, childItems]);
};

export const usePagesData = () => {
  const { parentItems, childItems } = useItemsData();

  return useMemo(() => {
    const { nodes: parents } = parentItems;
    const { group: groups } = childItems;

    return parents.reduce((acc, node) => {
      const { parent } = node.fields;
      let children = [];
      if (parent) {
        const group = groups.find(group => group.fieldValue === parent);
        if (group) {
          children = group.nodes;
        }
      }

      acc.push(node);
      acc.push(...children);
      return acc;
    }, []);
  }, [parentItems, childItems]);
};
