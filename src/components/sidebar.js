import React, { useMemo } from 'react';
import { Link as GatsbyLink } from 'gatsby';
import styled, { css } from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import Box from './box';

const listStyle = css`
  list-style-type: none;
`;

const Link = styled(GatsbyLink).attrs(() => ({
  activeClassName: 'active',
}))`
  text-decoration: none;
  color: ${p => p.theme.colors.fgHeading};

  &.active,
  &:hover {
    color: ${p => p.theme.colors.fgActive};
  }
`;

const MenuList = ({ children }) => (
  <Box
    as="ul"
    pl={3}
    mt={3}
    mb={3}
    ml={0}
    mr={0}
    fontSize={1}
    fontWeight={3}
    css={listStyle}
  >
    {children}
  </Box>
);

const NestedMenuList = ({ children }) => (
  <Box as="ul" pl={3} py={2} m={0} css={listStyle}>
    {children}
  </Box>
);

const MenuItem = ({ children }) => (
  <Box as="li" m={0} p={2}>
    {children}
  </Box>
);

const Sidebar = ({ children }) => {
  const { parentItems, childItems } = withSidebarData();

  const items = useMemo(() => {
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

  return (
    <MenuList>
      {items.map(item => (
        <MenuItem key={item.id}>
          <Link to={item.fields.slug}>{item.frontmatter.title}</Link>

          {item.children.length > 0 ? (
            <NestedMenuList>
              {item.children.map(child => (
                <MenuItem key={child.id}>
                  <Link to={child.fields.slug}>{child.frontmatter.title}</Link>
                </MenuItem>
              ))}
            </NestedMenuList>
          ) : null}
        </MenuItem>
      ))}
    </MenuList>
  );
};

const withSidebarData = () => {
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

export default Sidebar;
