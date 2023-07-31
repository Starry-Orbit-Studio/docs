import { defineUserConfig } from 'vuepress'
import theme from './vuepress.theme'
import { searchProPlugin } from 'vuepress-plugin-search-pro'

export default defineUserConfig({
  base: '/docs/',

  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/docs/logo.png',
      },
    ],
  ],

  locales: {
    '/': {
      lang: 'zh-CN',
      title: '星辰之光文档网络',
      description: '星辰之光文档网络',
    },
    '/en/': {
      lang: 'en-US',
      title: 'Extreme Starry Document Network',
      description: 'Extreme Starry Document Network',
    },
  },

  theme,

  temp: '.temp',
  cache: '.cache',
  public: 'public',
  dest: 'dist',
  // Enable it with pwa
  // shouldPrefetch: false,

  plugins: [
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
    }),
  ],
})
