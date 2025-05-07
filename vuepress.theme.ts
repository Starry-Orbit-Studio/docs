import { hopeTheme } from 'vuepress-theme-hope'
import * as navbar from './navbar'
import * as sidebar from './sidebar'

const author = {
  zh: {
    name: '星轨工作室',
    url: 'https://github.com/Starry-Orbit-Studio',
  },
  en: {
    name: 'Starry Orbit Studio',
    url: 'https://github.com/Starry-Orbit-Studio',
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
    hostname: 'https://es.starry-orbit-studio.cn',

    logo: '/logo.webp',

    repo: 'Starry-Orbit-Studio/docs',

    docsDir: 'docs',

    docsBranch: 'master',

    pageInfo: [
      'Author',
      'Date',
      'Original',
      'Category',
      'PageView',
      'ReadingTime',
      'Tag',
      'Word',
    ],

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
          editLink: '在 GitHub 上编辑此页',
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

    markdown: {
      gfm: true,
      hint: true,
      alert: true,
      align: true,
      attrs: true,
      sup: true,
      sub: true,
      footnote: true,
      mark: true,
      tasklist: true,
      component: true,
      mermaid: true,
      spoiler: true,
      breaks: true,
      tabs: true,
      codeTabs: true,
      figure: true,
      highlighter: {
        type: 'shiki',
        lineNumbers: true,
        removeLastLine: true,
        preWrapper: true,
        collapsedLines: true,
        themes: {
          light: 'light-plus',
          dark: 'dark-plus',
        },
        notationDiff: true,
        notationFocus: true,
        notationHighlight: true,
        notationErrorLevel: true,
        notationWordHighlight: true,
        whitespace: true,
      },
      imgLazyload: true,
      imgMark: true,
      imgSize: true,
      include: true,
      linkify: true,
      linksCheck: true,
    },

    plugins: {
      icon: {
        assets: 'iconify',
        prefix: 'fa6-solid:',
      },

      git: {
        createdTime: true,
        updatedTime: true,
        contributors: true,
        transformContributors: contributors =>
          Object.values(
            contributors.reduce(
              (a, b) => {
                a[b.email] = b
                return a
              },
              {} as Record<string, (typeof contributors)[0]>,
            ),
          ),
      },

      copyright: {
        global: true,
        license: 'CC-BY-NC-SA 4.0',
      },

      feed: {
        atom: true,
        json: true,
        rss: true,
      },

      slimsearch: {
        indexContent: true,
      },

      components: {
        components: [
          // 'ArtPlayer',
          'Badge',
          'BiliBili',
          // 'CodePen',

          'PDF',
          'Share',
          // 'StackBlitz',
          'SiteInfo',
          'VPBanner',
          'VPCard',
          // 'VidStack',
          // 'XiGua',
        ],
      },

      sitemap: {
        changefreq: 'weekly',
      },
    },
  },
  { custom: true },
)
