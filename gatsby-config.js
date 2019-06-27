const path = require('path');
const fs = require('fs');
const cwd = process.cwd();

module.exports = {
  siteMetadata: {
    title: 'Docs System',
    description: 'A beatiful docs generator for Gatsby',
    siteUrl: 'https://docs-system.example.com',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-remove-trailing-slashes',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-nprogress',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        remarkPlugins: [require('remark-slug'), require('remark-emoji')],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-smartypants',
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_self',
              rel: 'nofollow',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 650,
              withWebp: true,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'docs',
        path: 'docs',
        ignore: ['**/.*'],
      },
    },
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          'gatsby-theme-docs-system/theme': path.join(cwd, 'gatsby/theme'),
        },
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: path.join(cwd, 'gatsby/typography'),
      },
    },
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['gatsby-theme-docs-system'],
      },
    },
  ].filter(Boolean),
};
