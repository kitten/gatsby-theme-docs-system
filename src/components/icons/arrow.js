import React from 'react';
import { css } from 'styled-components';
import Box from '../box';

const rotateStyle = css`
  ${p => (p.rotate ? 'transform: rotate(180deg)' : '')};
`;

const Arrow = ({ rotate }) => (
  <Box
    as="svg"
    fill="currentColor"
    verticalAlign="text-bottom"
    height="1em"
    viewBox="0 0 24 24"
    mr={1}
    rotate={!!rotate}
    css={rotateStyle}
  >
    <path d="M5 3l3.057-3L20 12 8.057 24 5 21l9-9z" />
  </Box>
);

export default Arrow;
