<template>
  <figure class="unit-icon">
    <div
      v-if="url"
      class="image"
      :style="`--unit-icon-src: url('${img(url)}')`" />
    <figcaption class="title" v-text="alt" />
  </figure>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import common from '../common'
import { useSiteData, useSiteLocaleData } from '@vuepress/client'
import { UnitId } from '../../types'

const data = __ESDNUnitDoc

const { csf, img } = common()
const locale = useSiteLocaleData()

const props = defineProps<{
  unit: UnitId
  elite?: boolean
  alt?: string
}>()

const unitData = computed(() => data.units.find(i => i.unitId === props.unit))

const url = computed(() =>
  props.elite ? unitData.value?.altCameo : unitData.value?.cameo,
)
const alt = computed(
  () =>
    props.alt ??
    (csf(unitData.value?.uiName, locale.value.lang) ||
      props.unit.toUpperCase()),
)
</script>

<style lang="scss">
figure.unit-icon {
  margin: 0.25rem 0;
  width: 60px;
  max-width: 60px;
  font-size: smaller;

  .title {
    width: 60px;
    max-width: 60px;
    overflow: hidden;
    white-space: nowrap;
    text-wrap: nowrap;
    text-overflow: ellipsis;
  }

  .image {
    width: 60px;
    height: 48px;
    background-image: var(--unit-icon-src);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-clip: content-box;
  }
}
</style>
