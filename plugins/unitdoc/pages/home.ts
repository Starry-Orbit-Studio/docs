import type { PageOptions } from '@vuepress/core'
import type { UnitDocSource } from '../types'

export const home = (
  options: PageOptions | undefined,
  __ESDNUnitDoc: Readonly<UnitDocSource>,
  prefix: string,
  lang: string,
  i18n: (
    key: string | undefined,
    type: string | undefined,
    lang: string,
  ) => string,
): PageOptions => {
  options ??= {}
  options.path = prefix
  options.frontmatter = Object.assign(options.frontmatter ?? {}, {
    title: i18n('UnitDoc', undefined, lang),
    sidebar: true,
    index: false,
  })
  const content = Object.keys(__ESDNUnitDoc.indexes)
    .map(type => `[${i18n('typeName', type + 'Types', lang)}](./${type}/)`)
    .join('\n')
  if (!options.content?.includes(content))
    options.content =
      content + '\n' + (options.content?.replace('<AutoCatalog/>', '') ?? '')

  return options
}
