import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import styled, { css } from 'styled-components';
import Box from './box';
import { useContentData } from './useContentData';

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
  const items = useContentData();

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

export default Sidebar;
