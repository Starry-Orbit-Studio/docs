import { defineClientConfig } from 'vuepress/client'
import Afdian from './src/components/Afdian.vue'

export default defineClientConfig({
  enhance: ({ app, router, siteData }) => {
    app.component('Afdian', Afdian)
  },
})
