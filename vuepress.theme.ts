import { hopeTheme } from 'vuepress-theme-hope'
import * as navbar from './navbar'
import * as sidebar from './sidebar'

const author = {
  zh: {
    name: '星轨工作室',
    url: 'https://gitlab.com/starry-orbit-studio',
  },
  en: {
    name: 'Starry Orbit Studio',
    url: 'https://gitlab.com/starry-orbit-studio',
  },
}

const cc = 'by-nc-sa/4.0'

const license = {
  zh: {
    type: '知识共享许可协议',
    name: '知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议',
    description: `本作品采用<a rel="license" href="http://creativecommons.org/licenses/${cc}/">{license}</a>进行许可。`,
  },
  en: {
    type: 'Creative Commons License',
    name: 'Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License',
    description: `This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/${cc}/">{license}</a>.`,
  },
}

// prettier-ignore
const copyright = (locale: keyof typeof license) => {
  const year = new Date().getFullYear()
  let builder = ''
  builder += `<a rel="license" href="http://creativecommons.org/licenses/${cc}/"><img alt="${license[locale].name}" style="border-width:0" src="https://licensebuttons.net/l/${cc}/80x15.png" /></a>`
  builder += '<br />'
  builder += '<a normal href="https://beian.miit.gov.cn/" target="_blank">京ICP备2022016928号-2</a>'
  builder += ' | '
  builder += `Copyright © ${year} <a normal rel="author" href="${author[locale].url}">${author[locale].name}</a>`
  builder += '<br />'
  builder += license[locale].description.replace('{license}', license[locale].name)

  return builder
}

export default hopeTheme(
  {
    hostname: 'https://demo.github.io',

    iconAssets: 'fontawesome-with-brands',

    logo: '/logo.png',

    repo: 'https://gitlab.com/starry-orbit-studio/extreme-starry/esdn',

    docsRepo: 'https://gitlab.com/starry-orbit-studio/extreme-starry/esdn',

    docsBranch: 'master',

    docsDir: 'docs',

    locales: {
      /**
       * Chinese locale config
       */
      '/': {
        // navbar
        navbar: navbar.zh,

        author: author.zh,

        // sidebar
        sidebar: sidebar.zh,

        displayFooter: true,
        copyright: copyright('zh'),

        // page meta
        metaLocales: {
          editLink: '在 GitLab 上编辑此页',
        },
      },

      '/en/': {
        // navbar
        navbar: navbar.en,

        author: author.en,

        // sidebar
        sidebar: sidebar.en,

        displayFooter: true,
        copyright: copyright('en'),

        metaLocales: {
          editLink: 'Edit this page on GitLab',
        },
      },
    },

    plugins: {
      // All features are enabled for demo, only preserve features you need here
      mdEnhance: {
        gfm: true,
        alert: true,
        hint: true,
        checkLinks: {
          status: 'always',
        },
        tabs: true,
        codetabs: true,
        align: true,
        attrs: true,
        sup: true,
        sub: true,
        footnote: true,
        mark: true,
        figure: true,
        imgLazyload: true,
        imgMark: true,
        imgSize: true,
        obsidianImgSize: true,
        tasklist: true,
        component: true,
        chart: false,
        echarts: false,
        mermaid: true,
        revealJs: false,
        delay: 200,
      },
      components: {
        components: [
          // 'ArtPlayer',
          'Badge',
          'BiliBili',
          // 'CodePen',
          'FontIcon',
          'PDF',
          // 'Replit',
          'Share',
          // 'StackBlitz',
          'SiteInfo',
          // 'VidStack',
          // 'XiGua',
        ],
      },
      // uncomment these if you want a pwa
      // pwa: {
      //   favicon: "/favicon.ico",
      //   cacheHTML: true,
      //   cachePic: true,
      //   appendBase: true,
      //   apple: {
      //     icon: "/assets/icon/apple-icon-152.png",
      //     statusBarColor: "black",
      //   },
      //   msTile: {
      //     image: "/assets/icon/ms-icon-144.png",
      //     color: "#ffffff",
      //   },
      //   manifest: {
      //     icons: [
      //       {
      //         src: "/assets/icon/chrome-mask-512.png",
      //         sizes: "512x512",
      //         purpose: "maskable",
      //         type: "image/png",
      //       },
      //       {
      //         src: "/assets/icon/chrome-mask-192.png",
      //         sizes: "192x192",
      //         purpose: "maskable",
      //         type: "image/png",
      //       },
      //       {
      //         src: "/assets/icon/chrome-512.png",
      //         sizes: "512x512",
      //         type: "image/png",
      //       },
      //       {
      //         src: "/assets/icon/chrome-192.png",
      //         sizes: "192x192",
      //         type: "image/png",
      //       },
      //     ],
      //     shortcuts: [
      //       {
      //         name: "Demo",
      //         short_name: "Demo",
      //         url: "/demo/",
      //         icons: [
      //           {
      //             src: "/assets/icon/guide-maskable.png",
      //             sizes: "192x192",
      //             purpose: "maskable",
      //             type: "image/png",
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // },
    },
  },
  { custom: true },
)
