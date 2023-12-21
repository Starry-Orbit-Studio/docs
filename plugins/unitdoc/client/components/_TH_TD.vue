<template>
  <th v-text="label" />
  <td v-if="button" :colspan="latest ? 255 : undefined">
    <UnitButton :unit="value" />
  </td>
  <td v-else v-text="value" :colspan="latest ? 255 : undefined" />
</template>

<script lang="ts" setup>
import UnitButton from './UnitButton.vue'

defineProps<{
  label: string
  value: any
  latest?: boolean
  button?: boolean
}>()
</script>
