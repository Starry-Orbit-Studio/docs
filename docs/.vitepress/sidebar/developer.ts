import { DefaultTheme } from 'vitepress'

const developer: DefaultTheme.SidebarMulti = {
  '/developer': [
    {
      text: '贡献者指北',
      items: [
        { text: '0.引言', link: '/developer/' },
        { text: '1.安装', link: '/developer/1.install.md' },
        { text: '1.1.安装 Visual Studio Code', link: '/developer/1.1.vscode.md' },
        { text: '1.2.安装 Git', link: '/developer/1.2.git.md' },
      ]
    }
  ]
}
export default developer
