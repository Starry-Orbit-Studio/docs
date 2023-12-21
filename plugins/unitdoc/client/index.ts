import { defineClientConfig } from '@vuepress/client'
import UnitButton from './components/PublicUnitButton.vue'
import UnitLayout from './layouts/UnitLayout.vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('UnitButton', UnitButton)
  },
  setup() {},
  layouts: { UnitLayout },
  rootComponents: [],
})
