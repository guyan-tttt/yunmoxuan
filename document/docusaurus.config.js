// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '云墨轩',
  tagline: '个人博客系统',
  favicon: 'img/logo-home.ico',

  baseUrl: '/',

  url: 'https://guyan-tttt.github.io', // GitHub Pages 的 URL
  organizationName: 'guyan-tttt', // GitHub 用户名或组织名
  projectName: 'yunmoxuan', // 仓库名
  deploymentBranch: 'My', // 部署分支，默认为 gh-pages
  trailingSlash: false, // 官方文档建议设置成 true 或者 false
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/logo-home.jpg',
      navbar: {
        title: '云墨轩',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo-home.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '文档',
          },
          {to: 'https://jeek-space-blog.top', label: '博客', position: 'left'},
          {
            href: 'https://github.com/guyan-tttt',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '文档',
            items: [
              {
                label: '文档',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: '相关',
            items: [
              {
                label: '云墨轩',
                href: 'https://jeek-space-blog.top',
              },
              {
                label: '云墨UI',
                href: 'https://guyan-tttt.github.io/guyan-ym-ui/',
              },
              {
                label: '云墨膳',
                href: '#',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: 'Gitee',
                href: "https://gitee.com/DT-guyan"
              },
              {
                label: 'GitHub',
                href: 'https://github.com/guyan-tttt',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} 云墨轩`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
