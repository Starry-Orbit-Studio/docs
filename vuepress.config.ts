import { defineUserConfig } from 'vuepress'
import { searchProPlugin } from 'vuepress-plugin-search-pro'
import ESDNGuide from './plugins/guide'
import theme from './vuepress.theme'

const base =
  process.argv.length === 6 && process.argv[5] === 'public'
    ? '/extreme-starry/document/esdn/'
    : '/docs/'

export default defineUserConfig({
  base,

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
  public: 'assets',
  dest: 'dist',
  // Enable it with pwa
  // shouldPrefetch: false,

  plugins: [
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
    }),
    ESDNGuide(),
  ],
})
