import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components';
import Highlight, { Prism } from 'prism-react-renderer';
import { MDXProvider } from '@mdx-js/react';
import Box from './box';

const anchor = (
  <svg
    aria-hidden="true"
    focusable="false"
    height="16"
    width="16"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
    />
  </svg>
);

const codeStyle = css`
  -webkit-overflow-scrolling: touch;
  overflow-x: auto;
  font-variant-ligatures: none;
  font-feature-settings: normal;
  white-space: nowrap;
`;

const codeLabelStyle = css`
  border-bottom-left-radius: ${p => p.theme.radii[0]}px;
  border-bottom-right-radius: ${p => p.theme.radii[0]}px;
  user-select: none;
  transition: opacity 0.2s;
  opacity: 1;

  @media screen and (min-width: ${p => p.theme.breakpoints[0]}) {
    &:hover {
      opacity: 0.2;
    }
  }

  @media screen and (max-width: ${p => p.theme.breakpoints[0]}) {
    border-radius: ${p => p.theme.radii[0]}px;
    margin-top: -1em;
    right: 1em;
  }
`;

const getLanguage = className => {
  const res = className.match(/language-(\w+)/);
  return res ? res[1] : null;
};

const Pre = ({ children, className, style }) => (
  <Box
    as="pre"
    className={className}
    position="relative"
    color={style.color}
    borderRadius={0}
    maxWidth="100%"
    bg="bgPassive"
    fontSize={1}
    pt={[2, 0]}
    mt={2}
    mb={3}
  >
    {children}
  </Box>
);

const Code = ({ children, className }) => (
  <Box
    as="code"
    display="block"
    fontFamily="code"
    css={codeStyle}
    className={className}
    py={2}
    px={2}
  >
    {children}
  </Box>
);

const CodeLabel = ({ children }) => (
  <Box
    as="div"
    bg="fgActive"
    color="bg"
    position="absolute"
    textTransform="uppercase"
    fontSize={0}
    px={2}
    right={25}
    top="0"
    css={codeLabelStyle}
  >
    {children}
  </Box>
);

const CodeHighlight = ({ language, code, children }) => {
  const theme = useContext(ThemeContext).prismTheme;

  return (
    <Highlight Prism={Prism} theme={theme} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {children}
          <Code>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </Code>
        </Pre>
      )}
    </Highlight>
  );
};

const Heading = styled.h1``;

const PermalinkWrapper = styled.a.attrs(() => ({
  'aria-hidden': 'true',
}))`
  display: inline-block;
  margin-left: -24px;
  width: 24px;
  opacity: 0;
  transition: opacity 0.1s;
  fill: ${p => p.theme.colors.fgActive};

  @media screen and (max-width: ${p => p.theme.breakpoints[0]}) {
    opacity: 1;
  }

  ${Heading}:hover & {
    opacity: 1;
  }
`;

const heading = tag => ({ id, children }) => (
  <Heading as={tag} id={id}>
    <PermalinkWrapper href={`#${id}`}>{anchor}</PermalinkWrapper>
    {children}
  </Heading>
);

const code = ({ className, children }) => {
  const language = getLanguage(className);

  return (
    <CodeHighlight language={language} code={children.trim()}>
      {Prism.languages[language] ? <CodeLabel>{language}</CodeLabel> : null}
    </CodeHighlight>
  );
};

const inlineCode = styled.code`
  display: inline-block;
  background-color: ${p => p.theme.colors.bgPassive};
  border-radius: ${p => p.theme.radii[0]}px;
  font-family: ${p => p.theme.fonts.code.join(',')};
  font-size: inherit;
  font-variant-ligatures: none;
  font-feature-settings: normal;
  padding: 0 0.2em;
  margin: 0;
`;

const blockquote = ({ children }) => (
  <Box as="blockquote" borderLeft={2} color="fgPassive" ml={0} py={2} pl={3}>
    {children}
  </Box>
);

const components = {
  h2: heading('h2'),
  h3: heading('h3'),
  h4: heading('h4'),
  h5: heading('h5'),
  h6: heading('h6'),
  code,
  blockquote,
  inlineCode,
};

const MDXComponents = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
);

export default MDXComponents;
