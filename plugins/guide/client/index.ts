import { defineClientConfig } from '@vuepress/client'
import GuideButton from './components/GuideButton.vue'
import GuideLayout from './layouts/GuideLayout.vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('GuideButton', GuideButton)
  },
  setup() {},
  layouts: { GuideLayout },
  rootComponents: [],
})
