import { defineUserConfig } from "vuepress";
import theme from "./vuepress.theme";

export default defineUserConfig({
  base: "/docs/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "星辰之光文档站",
      description: "星辰之光文档站",
    },
    "/en/": {
      lang: "en-US",
      title: "Extreme Starry Docs",
      description: "Extreme Starry Docs",
    },
  },

  theme,

  temp: '.temp',
  cache: '.cache',
  public: 'public',
  dest: 'dist',
  // Enable it with pwa
  // shouldPrefetch: false,
});
