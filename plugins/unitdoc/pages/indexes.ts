import type { PageOptions } from '@vuepress/core'
import type { UnitData, UnitDocSource } from '../types'

export const indexes = (
  options: PageOptions | undefined,
  __ESDNUnitDoc: Readonly<UnitDocSource>,
  prefix: string,
  lang: string,
  i18n: (
    key: string | undefined,
    type: string | undefined,
    lang: string,
  ) => string,
  type: string,
  data: string,
): PageOptions => {
  options ??= {}
  options.path = prefix + type + '/'
  options.frontmatter = Object.assign(options.frontmatter ?? {}, {
    title: i18n('typeName', type + 'Types', lang),
    sidebar: true,
    index: false,
  })
  if (!options.content?.includes(data))
    options.content = data + (options.content ?? '')

  return options
}
