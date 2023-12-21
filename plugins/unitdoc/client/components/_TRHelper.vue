<template>
  <tr v-if="data.length">
    <TH_TD
      v-for="(item, index) in data"
      :key="index"
      v-bind="item"
      :button="button"
      :latest="index === data.length - 1" />
  </tr>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import TH_TD from './_TH_TD.vue'

const props = defineProps<{
  data: Record<string, any>
  button?: boolean
}>()
const data = computed(() =>
  Object.entries(props.data)
    .map(([label, value]) => ({ label, value }))
    .filter(i => i.value),
)
</script>
