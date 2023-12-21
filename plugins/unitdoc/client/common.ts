import { useSiteData } from '@vuepress/client'
import common from '../common'
export * from '../common'
export default () => common(__ESDNUnitDoc, useSiteData().value)
