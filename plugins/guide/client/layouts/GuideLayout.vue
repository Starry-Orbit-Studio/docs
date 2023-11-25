<template>
  <div class="guide-layout-panel">
    <div class="guide-layout">
      <div>
        <a :href="withBase('/')" target="_blank">
          <figure>
            <img
              :src="withBase('logo.png')"
              alt="Extreme Starry Logo"
              class="logo" />
            <figcaption class="read-the-docs">
              点击 Logo 前往文档网络
            </figcaption>
          </figure>
        </a>
      </div>
      <h1 v-if="frontmatter.title" v-text="frontmatter.title" />
      <Content />
      <GuideButton @click="goback"> 返回 </GuideButton>
      <GuideButton v-if="frontmatter.guideHome" :to="frontmatter.guideHome">
        返回首页
      </GuideButton>
      <p class="read-the-docs">由 Vue 3 与 Vuepress 2 提供强力支持</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Content, withBase, usePageFrontmatter } from '@vuepress/client'
import GuideButton from '../components/GuideButton.vue'
import { useRouter } from 'vue-router'

const frontmatter = usePageFrontmatter<{
  title: string
  guideHome: string
}>()
const router = useRouter()
const goback = () => router.back()
</script>

<style lang="scss">
.guide-layout-panel {
  * {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
  }

  width: 100vw;
  height: 100vh;

  [data-theme='light'] & {
    color: #213547;
  }
  [data-theme='dark'] & {
    color: #ffffffde;
  }

  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;

  position: relative;
  background-image: url('/docs/background.jpg') !important;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(16px);
    [data-theme='light'] & {
      background-color: #ffffff9f;
    }
    [data-theme='dark'] & {
      background-color: #00000080;
    }
  }

  .guide-layout {
    position: relative;
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;

    .logo {
      height: 6em;
      padding: 1.5em;
      &:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
      }
    }

    .card {
      padding: 2em;
    }

    .read-the-docs {
      color: #888;
    }
    .list {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    a:not(.guide-button) {
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;

      &:hover {
        [data-theme='light'] & {
          color: #747bff;
        }
        [data-theme='dark'] & {
          color: #535bf2;
        }
      }
    }

    h1 {
      font-size: 3.2em;
      line-height: 1.1;
    }
  }
}
</style>
