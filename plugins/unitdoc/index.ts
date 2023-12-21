import type { PluginFunction, LocaleConfig, PageOptions } from '@vuepress/core'
import { createPage } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { UnitDocOptions, UnitDocSource } from './types'
import common from './common'
import { home } from './pages/home'
import { units } from './pages/units'
import { indexes } from './pages/indexes'

const plugin =
  (
    source: Readonly<UnitDocSource>,
    options: Readonly<Partial<UnitDocOptions>>,
  ): PluginFunction =>
  app => {
    const prefix = options?.prefix ?? '/'
    const fsPathBase = app.dir.source(prefix)
    const basePath = (path: string) => prefix + path
    const __ESDNUnitDoc = {
      ...source,
      prefix,
    }

    const { i18n, csf } = common(__ESDNUnitDoc, app.siteData)

    return {
      name: 'vuepress-plugin-esdn-unit-doc',
      clientConfigFile: path.resolve(__dirname, './client/index.ts'),
      define: {
        __ESDNUnitDoc,
      },
      onInitialized: async app => {
        await Promise.all(
          Object.entries(app.siteData.locales).flatMap(([base, locale]) => {
            const prefix = base + options.prefix
            const lang = locale.lang ?? app.siteData.lang

            return __ESDNUnitDoc.units
              .map(unit => {
                if (
                  app.pages.find(({ path }) => path === prefix + unit.esdnUri)
                )
                  return
                return units(undefined, __ESDNUnitDoc, prefix, lang, csf, unit)
              })
              .concat(
                ...Object.entries(__ESDNUnitDoc.indexes).map(([type, data]) => {
                  if (
                    app.pages.find(({ path }) => path === prefix + type + '/')
                  )
                    return
                  return indexes(
                    undefined,
                    __ESDNUnitDoc,
                    prefix,
                    lang,
                    i18n,
                    type,
                    data,
                  )
                }),
              )
              .concat(
                (() => {
                  if (app.pages.find(({ path }) => path === prefix)) return
                  return home(undefined, __ESDNUnitDoc, prefix, lang, i18n)
                })(),
              )
              .map(async option => {
                if (!option) return
                const page = await createPage(app, option)
                // 把它添加到 `app.pages`
                app.pages.push(page)
              })
          }),
        )
      },
      extendsPageOptions: async (pageOptions, app) => {
        if (!pageOptions.filePath) return
        const url = (() => {
          if (pageOptions.filePath.startsWith(fsPathBase)) {
            const filePath = pageOptions.filePath.substring(fsPathBase.length)
            const url = filePath.toLowerCase()
            if (url.endsWith('readme.md'))
              return basePath(filePath.substring(1, filePath.length - 9))
            else if (url.endsWith('index.md'))
              return basePath(filePath.substring(1, filePath.length - 8))
            else if (url.endsWith('.md'))
              return basePath(
                filePath.substring(1, filePath.length - 3) + '.html',
              )
          } else return pageOptions.path
        })()?.toLowerCase()
        if (!url) return

        const base = Object.keys(app.siteData.locales).find(base =>
          url.startsWith((base + options.prefix).substring(1).toLowerCase()),
        )
        if (!base) return

        const locale = app.siteData.locales[base]
        const prefix = (base + options.prefix).substring(1).toLowerCase()
        const lang = locale.lang ?? app.siteData.lang

        if (url.endsWith('.html')) {
          const unit = __ESDNUnitDoc.units.find(i =>
            (prefix + i.esdnUri).toLowerCase().endsWith(url),
          )
          if (unit) {
            units(pageOptions, __ESDNUnitDoc, prefix, lang, csf, unit)
          }
        } else {
          const type = Object.entries(__ESDNUnitDoc.indexes).find(([type]) =>
            (prefix + type + '/').toLowerCase().endsWith(url),
          )

          if (type) {
            indexes(
              pageOptions,
              __ESDNUnitDoc,
              prefix,
              lang,
              i18n,
              type[0],
              type[1],
            )
          } else {
            if (prefix.toLowerCase().endsWith(url)) {
              home(pageOptions, __ESDNUnitDoc, prefix, lang, i18n)
            }
          }
        }
      },
    }
  }
export default plugin
