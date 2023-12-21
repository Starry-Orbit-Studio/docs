import { type SiteLocaleData } from '@vuepress/client'
import type { CsfLabel, ImageFileName, UnitData, UnitDocSource } from './types'
import locales from './locale'

const init = (
  data: Readonly<UnitDocSource> & {
    prefix: `${string}/`
  },
  site: SiteLocaleData,
) => {
  return {
    /**
     * 本地化翻译
     * @param key 本地化键
     */
    i18n: (
      key: string | undefined,
      type: string | undefined,
      lang: string,
      unit?: any,
      process?: (data?: any) => string,
    ) => {
      if (!key) return ''
      const locale = locales[lang] ?? {}

      process ??= data => `${data}`

      let result: string | undefined
      // 从特殊类型中取值
      result = (locale[type ?? 'default'] ?? {})[key]
      // 从默认类型中取值
      result ??= (locale['default'] ?? {})[key]
      // 直接输出键
      result ??= key

      if (unit) {
        for (const iterator of result.matchAll(/\{(\w+)\}/g)) {
          result = result.replaceAll(
            iterator[0],
            process((unit as any)[iterator[1]]),
          )
        }
      }

      return result ?? ''
    },
    /**
     * 从CSF中读取本地化名
     * @param key CSF标签名
     */
    csf: (key: CsfLabel | undefined, lang: string) =>
      ((key && (data.csf[lang] ?? {})[key]) || key) ?? '',
    /**
     * 计算图标路径
     * @param name 图标路径
     */
    img: (name?: ImageFileName) =>
      `${site.base}${data.prefix}${name ?? 'missingcameo.webp'}`,
  }
}

export default init
