import type { PluginFunction } from 'vuepress/core'
import { path } from 'vuepress/utils'

const plugin =
  (options: { includes: Array<`/${string}/`> }): PluginFunction =>
  app => {
    return {
      name: 'vuepress-plugin-esdn-guide',
      clientConfigFile: path.resolve(__dirname, './client/index.ts'),
      extendsPage: async (page, app) => {
        const guideHome = (() => {
          const index = options.includes.findIndex(i => page.path.startsWith(i))
          if (index < 0) return
          return options.includes[index]
        })()
        if (guideHome == null) return

        page.frontmatter.layout = 'GuideLayout'
        page.frontmatter.index ??= false
        page.frontmatter.sidebar ??= false
        if (page.path !== guideHome) page.frontmatter.guideHome ??= guideHome
      },
    }
  }
export default plugin
