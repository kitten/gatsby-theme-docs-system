import { createGlobalStyle } from 'styled-components';
import { space, typography } from 'styled-system';

const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  a {
    color: ${p => p.theme.colors.fgActive};
  }

  #nprogress .bar {
    background-color: ${p => p.theme.colors.fgActive};
  }

  body {
    background-color: ${p => p.theme.colors.bg};
    color: ${p => p.theme.colors.fg};
    ${space}
    ${typography}
  }

  h1, h2, h3, h4, h5 {
    color: ${p => p.theme.colors.fgHeading};
  }
`;

export default Global;
