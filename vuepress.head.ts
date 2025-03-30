import { ElementType, parseDocument } from 'htmlparser2'
import type { HeadConfig } from 'vuepress'

const html = (template: TemplateStringsArray, ...args: string[]): string => {
  let result = template[0]
  for (let i = 1; i < template.length; i++) {
    result += args[i - 1]
    result += template[i]
  }
  return result
}

const document = html` <link rel="icon" href="/logo.webp" /> `

const head: HeadConfig[] = parseDocument(document)
  .children.filter(i => 'name' in i && 'tagName' in i)
  .map(i => {
    const tag = i.tagName
    const attributes = Object.fromEntries(
      i.attributes.map(({ name, value }) => [
        name,
        value === '' ? true : value,
      ]),
    )

    const context = i.children
      .filter(i => i.type === ElementType.Text)
      .map(i => i.data)
      .join('\n')
      .trim()

    return [tag, attributes, context]
  }) as any

export default head
