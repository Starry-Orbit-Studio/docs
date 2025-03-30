import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import { searchProPlugin } from 'vuepress-plugin-search-pro'
import ESDNGuide from './plugins/guide'
import head from './vuepress.head'
import theme from './vuepress.theme'

export default defineUserConfig({
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),

  base: '/',
  head,

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

  temp: '.temp',
  cache: '.cache',
  public: 'public',
  dest: 'dist',

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,

  plugins: [
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
    }),
    ESDNGuide({
      includes: ['/FAQ/', '/QuickStart/'],
    }),
  ],
})
