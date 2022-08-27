import { DefaultTheme, defineConfigWithTheme } from 'vitepress'
import footnote from 'markdown-it-footnote'
import { VitePWA } from 'vite-plugin-pwa'
import developer from './sidebar/developer'

export default defineConfigWithTheme<DefaultTheme.Config>({
  lang: 'zh-CN',
  title: '星辰之光文档站',
  description: '星辰之光文档共享站',
  appearance: true,
  base: '/docs/',

  lastUpdated: true,

  markdown: {
    // options for markdown-it-anchor
    // anchor: { permalink: false },

    // options for markdown-it-toc
    toc: { includeLevel: [1, 2] },

    config: (md) => {
      // use more markdown-it plugins!
      md.use(footnote)
    }
  },
  vite: {
    plugins: [
      VitePWA() as any
    ]
  },
  // Theme related configurations.
  themeConfig: {
    logo: '/vite.svg',
    nav: [
      { text: '贡献者指北', link: '/developer/' },
    ],
    sidebar: {
      ...developer
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Starry-Orbit-Studio/docs/' },
    ],
    footer: {
      message: 'Released under the CC-BY-NC-SA 4.0 License.',
      copyright: 'Copyright © 2022-present frg2089 & Extreme Starry Team.'
    },
    editLink: {
      repo: 'Starry-Orbit-Studio/docs',
      text: '在 Github 上编辑'
    }
  }
})
