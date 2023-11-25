<template>
  <button class="guide-button" @click="click">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const props = defineProps<{ to?: string }>()
const emits = defineEmits<{
  (e: 'click'): void
}>()

const router = useRouter()
const click = () => {
  if (props.to) {
    router.push(props.to)
  } else {
    emits('click')
  }
}
</script>

<style lang="scss">
.guide-button {
  width: 100%;
  border-radius: 10px;
  display: block;
  color: unset;
  margin: 0.5rem 0;

  [data-theme='light'] & {
    border: 1.5pt solid transparent;
    background-color: #f9f9f9;
  }
  [data-theme='dark'] & {
    border: 1pt solid transparent;
    border-color: #ffffff;
  }
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #121923cc;
  cursor: pointer;
  transition: border-color 0.25s;

  &:hover {
    border-color: #30a5ff;
    outline: 1.5px solid #30a5ff;
    filter: drop-shadow(0 0 0.8em #30a5ff);
  }
  &:focus,
  &:focus-visible {
    outline: 2px inset #82c9ffa6;
    outline-offset: -4px;
  }
}
</style>
