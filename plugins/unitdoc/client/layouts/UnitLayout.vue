<template>
  <Layout :key="frontmatter.unitdoc?.id">
    <template #contentBefore>
      <div class="unitdoc-header">
        <UnitDetailHeader
          v-if="frontmatter.unitdoc?.id"
          :unit="frontmatter.unitdoc?.id"
          class="unit-detail theme-hope-content" />
      </div>
    </template>
    <template #contentAfter>
      <div class="unitdoc-footer">
        <UnitDetailFooter
          v-if="frontmatter.unitdoc?.id"
          :unit="frontmatter.unitdoc?.id"
          class="unit-detail theme-hope-content" />
      </div>
    </template>
  </Layout>
</template>

<script lang="ts" setup>
import { usePageFrontmatter } from '@vuepress/client'
import { onBeforeMount, onBeforeUpdate, onMounted, onUpdated } from 'vue'
import { useSidebarItems } from 'vuepress-theme-hope/client/modules/sidebar/composables/setup.js'
import Layout from 'vuepress-theme-hope/layouts/Layout.js'
import UnitDetailFooter from '../components/UnitDetailFooter.vue'
import UnitDetailHeader from '../components/UnitDetailHeader.vue'
import { UnitId } from '../../types'

const frontmatter = usePageFrontmatter<{
  unitdoc: { id: UnitId }
}>()

// const init1 = () => {
//   const sidebar = useSidebarItems()
//   sidebar.value[0] = __ESDNUnitDocSidebar
// }
// onBeforeMount(init1)
// onBeforeUpdate(init1)
</script>

<style lang="scss">
.unitdoc-header,
.unitdoc-footer {
  .unit-detail {
    margin: 0 auto;

    table {
      width: fit-content;
    }
  }
}
</style>
