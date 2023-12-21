import type { PageOptions } from '@vuepress/core'
import type { UnitData, UnitDocSource } from '../types'

export const units = (
  options: PageOptions | undefined,
  __ESDNUnitDoc: Readonly<UnitDocSource>,
  prefix: string,
  lang: string,
  csf: (key: string | undefined, lang: string) => string,
  unit: UnitData,
): PageOptions => {
  options ??= {}
  options.path = prefix + unit.esdnUri
  options.frontmatter = Object.assign(options.frontmatter ?? {}, {
    title: csf(unit.uiName, lang),
    layout: 'UnitLayout',
    sidebar: true,
    index: false,
    unitdoc: {
      id: unit.unitId,
    },
  })
  // options.content ??= csf(unit.uiDescription, lang)

  return options
}
