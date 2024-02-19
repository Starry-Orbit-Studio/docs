---
title: Extreme Starry 疑难解答向导
---

![](image/SDL/1701930223069.png)

---

:::left
:::warning

<!-- TODO: 改用GFM语法 -->

以下操作将关闭客户端的中文输入法支持功能，建议仅在clientdx无法工作且clientogl点击输入框引起游戏客户端崩溃时才使用上述方法
:::

:::left

1. 进入星辰之光游戏安装目录

1. 在游戏安装目录下，找到并进入Resources文件夹

   ![](image/SDL/1701924119874.png =450x)

1. 用文本编辑器（例如记事本）打开`ClientDefinitions.ini`

   ![](image/SDL/1701924211967.png =450x)

1. 在`[Settings]`行下新建一行，添加：`DisableIME=true`

   ![](image/SDL/1701924285839.png =450x)

1. 保存文件即可

:::
