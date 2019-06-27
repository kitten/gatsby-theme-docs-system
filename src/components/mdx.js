import React, { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components';
import Highlight, { Prism } from 'prism-react-renderer';
import { MDXProvider } from '@mdx-js/react';
import Box from './box';

const overflowStyle = css`
  -webkit-overflow-scrolling: touch;
  overflow-x: auto;
`;

const codeLabelStyle = css`
  border-bottom-left-radius: ${p => p.theme.radii[0]}px;
  border-bottom-right-radius: ${p => p.theme.radii[0]}px;
  user-select: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.2;
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
    fontFamily="code"
    borderRadius={0}
    bg="bgPassive"
    fontSize={1}
    mt={2}
    mb={3}
    mx={-2}
  >
    {children}
  </Box>
);

const Code = ({ children, className }) => (
  <Box
    as="code"
    display="block"
    css={overflowStyle}
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
  font-family: ${p => p.theme.fonts.code.join(',')};
  background-color: ${p => p.theme.colors.bgPassive};
  border-radius: ${p => p.theme.radii[0]}px;
  font-size: inherit;
  padding: 0 0.2em;
  margin: 0;
`;

const components = {
  code,
  inlineCode,
};

const MDXComponents = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
);

export default MDXComponents;
