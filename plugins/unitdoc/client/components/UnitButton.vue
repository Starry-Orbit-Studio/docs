<template>
  <div class="unit-button">
    <RouterLink v-if="path" :to="path">
      <UnitIcon
        :unit="id"
        :alt="alt"
        @mouseenter="mouseenter"
        @mouseleave="mouseleave" />
    </RouterLink>
    <div
      v-else
      v-text="i18n('unknown', undefined, locale.lang, { unit: alt ?? unit })" />
    <!-- <div
      v-show="showDetail"
      class="unit-detail"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave">
      <table>
        <tbody>
          <tr>
            <th v-text="i18n('icon')" />
            <td><UnitIcon :unit="unit" /></td>
            <td><UnitIcon :unit="unit" elite /></td>
          </tr>
          <tr v-if="unitData?.prerequisite">
            <th v-text="'生产前提'" />
            <td colspan="2" class="prerequisite">
              <UnitButton
                v-for="(unit, index) in unitData.prerequisite"
                :key="index"
                :unit="unit" />
            </td>
          </tr>
          {{
            unitData?.prerequisite
          }}
        </tbody>
      </table>
      {{ data.units[unit] }}
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import common from '../common'
import UnitIcon from './UnitIcon.vue'
import { UnitId } from '../../types'
import { useSiteData, useSiteLocaleData } from '@vuepress/client'

const { i18n } = common()
const data = __ESDNUnitDoc
const props = defineProps<{
  unit: UnitId
}>()

const siteData = useSiteData()
const locale = useSiteLocaleData()
const base = computed(() => {
  const item = Object.entries(siteData.value.locales).find(
    ([_, { lang }]) => locale.value.lang === lang,
  )
  return item?.[0] ?? '/'
})

const unit = computed(() =>
  __ESDNUnitDoc.units.find(i => i.unitId === props.unit),
)
const path = computed(() => base.value + data.prefix + unit.value?.esdnUri)
/** 单位 (或 通用建造前提) */
const id = computed(() => {
  if (unit.value?.genericPrerequisites) {
    return unit.value.genericPrerequisites[0]
  } else {
    return props.unit
  }
})
const alt = computed(() => {
  if (unit.value?.genericPrerequisites) {
    return i18n('genericPrerequisites', undefined, locale.value.lang, {
      unit: props.unit,
    })
  }
})

onMounted(() => {})

const showDetail = ref(false)
let detailTimer: NodeJS.Timeout
const mouseenter = (payload: MouseEvent) => {
  clearTimeout(detailTimer)
  showDetail.value = true
}
const mouseleave = (payload: MouseEvent) => {
  detailTimer = setTimeout(() => {
    showDetail.value = false
  }, 1000)
}
</script>

<style lang="scss">
.unit-button {
  display: inline-block;

  .unit-detail {
    position: fixed;
    z-index: 9999;

    .prerequisite {
      text-align: center;
    }
  }
}
</style>

<!-- <style lang="scss" scoped>
.unit-detail {
}
</style> -->
