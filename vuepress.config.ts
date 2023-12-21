import { defineUserConfig } from 'vuepress'
import { searchProPlugin } from 'vuepress-plugin-search-pro'
import ESDNGuide from './plugins/guide'
import ESDNUnitDoc from './plugins/unitdoc'
import units from './units.json'
import theme from './vuepress.theme'

const base = (() => {
  const pagePath: Record<string, '/' | `/${string}/`> = {
    default: '/',
    github: '/docs/',
    gitlab: '/extreme-starry/document/esdn/',
  }

  return pagePath[process.argv[4]] ?? pagePath.default
})()

console.log(`Base is: ${base}`)

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

  lang: 'zh-CN',

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
    ESDNGuide(),
    ESDNUnitDoc(units as any, {
      prefix: 'units/',
    }),
  ],
})
