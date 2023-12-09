---
title: Extreme Starry 疑难解答向导
layout: GuideLayout
guideHome: /FAQ
---

![](image/DotnetFramework/1701932003198.png)

您还没有安装`.NET framework 4.5.2`以上版本
[点击此处](https://download.visualstudio.microsoft.com/download/pr/2d6bb6b2-226a-4baa-bdec-798822606ff1/8494001c276a4b96804cde7829c04d7f/ndp48-x86-x64-allos-enu.exe)下载并安装`.NET framework 4.8`

`.NET framework 4.8`安装过程较为简单，不在此处赘述

:::tip

<!-- TODO: 改用GFM语法 -->

`.NET framework`框架是向下兼容的
:::

## .NET framework 4.8安装失败

windows 7 用户可能在安装`.NET framework 4.8`时会遇到如下错误：

![](image/dotnetFramework/1701955211732.png =350x)
![](image/dotnetFramework/1701932585020.png =350x)

这个问题是您的 windows 7 系统尚未安装 KB3004394 和 KB2718704 安全补丁导致的

以下为安全补丁的微软官方下载链接，进入页面后，点击`Download`按钮即可下载
|补丁|Windows 7 SP1 x86 （32位）|Windows 7 SP1 x64 （64位）|
|:-:|:-:|:-:|
|KB3004394|https://www.microsoft.com/download/details.aspx?id=45588|https://www.microsoft.com/download/details.aspx?id=45633|
|KB2718704|https://www.microsoft.com/download/details.aspx?id=29965|https://www.microsoft.com/download/details.aspx?id=29962|

您也可以在以下微软官方补丁搜索站中的搜索框查找 KB3004394 和 KB2718704 补丁的下载链接
https://www.catalog.update.microsoft.com/Search.aspx

除了上述补丁外，您还需要手动更新 Windows 7 的自动更新证书，下载地址为：https://download.microsoft.com/download/2/4/8/248D8A62-FCCD-475C-85E7-6ED59520FC0F/MicrosoftRootCertificateAuthority2011.cer

::: left
:::tip

<!-- TODO: 改用GFM语法 -->

您可能需要手动安装 [微软根证书颁发机构 2011](https://download.microsoft.com/download/2/4/8/248D8A62-FCCD-475C-85E7-6ED59520FC0F/MicrosoftRootCertificateAuthority2011.cer) 证书到 **==计算机== 受信任的根证书颁发机构**
