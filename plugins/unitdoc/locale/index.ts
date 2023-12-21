import type { LocaleConfig } from 'vuepress'
import zhCN from './zh-CN.json'

export default {
  ['en-US']: zhCN,
  ['zh-CN']: zhCN,
} as LocaleConfig<Record<string, Record<string, string>>>
