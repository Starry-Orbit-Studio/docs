<template>
  <div v-for="(type, index) in data" :key="index">
    <RouterLink :to="`./${type}/`">
      {{ i18n('typeName', type + 'Types', locale.lang) }}
    </RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import common from '../common'
import { useSiteLocaleData } from '@vuepress/client'
const data = Object.keys(__ESDNUnitDoc.indexes)
const locale = useSiteLocaleData()
const { i18n } = common()
</script>
