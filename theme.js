import './theme.css';

const systemFonts = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Helvetica Neue',
  'Arial',
  'Noto Sans',
  'sans-serif',
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'Segoe UI Symbol',
  'Noto Color Emoji',
];

export const fonts = {
  header: ['phantom-sans', ...systemFonts],
  body: systemFonts,
};

export const colors = {
  bg: '#ffffff',
  bgPassive: '#f0f0f2',
  bgActive: '#fcfafe',
  fg: '#36313d',
  fgHeading: '#000000',
  fgPassive: '#78757a',
  fgActive: '#8a4baf',
};

export const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 96];
export const fontWeights = ['300', '400', '500', '700', '800'];
export const letterSpacings = ['normal', '0.01em', '0.05em', '0.1em'];
export const borderWidths = ['1px', '0.1rem', '0.25rem'];
export const space = [0, 4, 8, 16, 32, 64];
export const sizes = [0, 64, 320, 430, 540, 760, 870, 980];
export const breakpoints = ['40em', '52em', '64em'];
export const radii = [4, 8, 16];
export const zIndices = [0, 1, 2, 3];

export const borders = [
  `${borderWidths[0]} solid ${colors.bgPassive}`,
  `${borderWidths[1]} solid ${colors.bgPassive}`,
  `${borderWidths[2]} solid ${colors.bgPassive}`,
];

export const shadows = [
  'rgba(46, 41, 51, 0.08) 0px 1px 2px, rgba(71, 63, 79, 0.08) 0px 2px 4px',
  'rgba(0, 0, 0, 0.2) 0 1px 0 0, rgba(0, 0, 0, 0.1) 0 2px 3px 0',
];

export const mediaQueries = {
  small: `@media screen and (min-width: ${breakpoints[0]})`,
  medium: `@media screen and (min-width: ${breakpoints[1]})`,
  large: `@media screen and (min-width: ${breakpoints[2]})`,
};
