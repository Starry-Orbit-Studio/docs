import type { PluginFunction } from '@vuepress/core'
import { path } from '@vuepress/utils'

const plugin = (): PluginFunction => app => {
  return {
    name: 'vuepress-plugin-esdn-guide',
    clientConfigFile: path.resolve(__dirname, './client/index.ts'),
  }
}
export default plugin
