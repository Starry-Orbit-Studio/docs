---
title: 文档贡献
icon: book
---

# 文档贡献指南

星辰之光文档网络是一个公开的、任何人都可以提交修改的文档网络。

我们使用 VuePress v2[^VuePress] 和 VuePress Theme Hope[^Theme] 搭建这个文档网络。
所以，若您想要为文档网络做出贡献，您需要对 Markdown 格式有所了解。

[^VuePress]: [VuePress v2](https://v2.vuepress.vuejs.org/zh/)
[^Theme]: [VuePress Theme Hope](https://theme-hope.vuejs.press/zh/)

## 贡献前准备

在继续前，您需要准备以下软件

- Git[^git]
  我们的文档网络基于它构建。
- Node.js®[^node]
  我们的文档网络基于它构建，若您不需要实时查看文档效果可以不用。
  需要注意的是，如果我们发现您提交的修改中存在问题，我们可能会拒绝您的修改。
- Visual Studio Code®[^vsc]
  对于不了解 Markdown 格式的人来说，它没有办法像其他编辑器那样做到所见即所得。
  所以您可以选择其他的编辑器而不是这个编辑器来编辑文档。

[^git]: Git 是一个分布式的版本控制软件。
[^node]: Node.js® 是一个基于 Chromium V8 引擎的 JavaScript 运行时环境。
[^vsc]: Visual Studio Code® 是一款由微软开发的跨平台的免费的编辑器。

## Markdown

Markdown 并不是一个标准，它只是提供了一种易读易写的纯文本格式使人们可以很方便的编写文档。
由于它不是标准，所以各个不同的渲染器渲染出来的效果也会有所不同。
不同的语法解释器所支持的语法也会有所不同。

我们的文档网络基本支持 GFM 格式[^gfm]，以及下列语法。

[^gfm]: GitHub Flavored Markdown，它是 GitHub 所使用的 Markdown 方言。

### 容器

我们支持一种语法用来为一些内容创建特殊的容器

它的语法是这样的

```markdown
::: <类型> [<标题>]
<内容>
:::
```

容器有以下几种类型
|类型|说明|
|:-:|:-:|
|info|信息
|note|注释
|tip|提示
|warning|警告
|danger|危险
|details|详细信息
|tabs|选项卡
|code-tabs|代码选项卡
|left|左对齐
|center|中间对齐
|right|右对齐
|justify|两端对齐

::: info
这是一条信息
:::
::: note
这是一条笔记
:::
::: tip
这是一条提示
:::
::: warning
这是一条注意事项
:::
::: danger
这是一条警告
:::
::: details
这是一个可被折叠的内容
:::
::: tabs
@tab 普通选项卡1

内容

@tab 普通选项卡2

内容

:::
::: code-tabs#shell
@tab 代码选项卡1

```powershell
echo hello
```

@tab 代码选项卡2

```shell
echo hello
```

@tab 代码选项卡3

```cmd
echo hello
```

:::
::: left
左 对 齐

:::
::: center
中 间 对 齐

:::
::: right
右 对 齐

:::

### 角标

我们支持一种创建脚本的语法

::: tabs
@tab 上角标

```markdown
H~2~O
```

H~2~O

@tab 下角标

```markdown
2^10^
```

2^10^

:::

### 其他

关于其他更多内容，您可以去 VuePress Theme Hope[^Theme] 的文档处查看。
