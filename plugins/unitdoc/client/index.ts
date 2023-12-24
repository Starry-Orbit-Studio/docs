import { defineClientConfig } from '@vuepress/client'
import UnitButton from './components/PublicUnitButton.vue'
import UnitTypeCategory from './components/UnitTypeCategory.vue'
import UnitLayout from './layouts/UnitLayout.vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('UnitButton', UnitButton)
    app.component('UnitTypeCategory', UnitTypeCategory)
  },
  setup() {},
  layouts: { UnitLayout },
  rootComponents: [],
})
