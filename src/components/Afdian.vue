<template>
  <a v-if="button" :href="`https://afdian.com/a/${a}`" target="_blank">
    <img
      src="https://pic1.afdiancdn.com/static/img/welcome/button-sponsorme.png"
      alt="爱发电赞助按钮" />
  </a>
  <iframe
    v-else
    ref="afdian"
    :src="`https://afdian.com/leaflet?slug=${a}`"
    width="100%"
    scrolling="no"
    height="200"
    frameborder="0">
  </iframe>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

defineProps<{
  button?: boolean
  a: string
}>()

const afdian = ref<HTMLIFrameElement>()
const updateWidth = () => {
  if (!afdian.value) return

  afdian.value.width = document.body.clientWidth < 700 ? '100%' : '640'
}

onMounted(() => {
  if (!afdian.value) return

  window.addEventListener('resize', updateWidth)
  updateWidth()
})
</script>
