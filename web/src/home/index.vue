<template>
  <div class="home" v-cursor-default>
    <!-- 导航栏 -->
    <Header />
    <!-- 导航栏 -->
    <!-- 主题内容 -->
    <router-view v-slot="{ Component, route }">
      <transition name="fade" :class="{ active: route.path === '/' }">
        <component :is="Component" :key="route.fullPath" class="app-container-grow" />
      </transition>
    </router-view>
    <!-- 主题内容 -->
    <!-- 底部 -->
    <Footer />
    <!-- 底部 -->
    <!-- 标签展示组件 -->
    <TagPreview :tagDetail="webInfoStore.tagPreviewInfo as any" v-model="webInfoStore.showPreview" />
    <CommentInput />
    <ToolBox class="toolbox animate__fadeInLeft animate__animated" v-if="!settingsStore.isMobile" />
    <SongPlay />
  </div>
</template>

<script setup lang="ts">
import Header from "./components/Header.vue"
//@ts-expect-error
import Footer from "./components/Footer.vue"
import { clickEffect, removeClickEffect } from "@/utils/clickAnimate"
import { onMounted, onUnmounted } from "vue"
import { useWebInfoStore } from "@/store/modules/webInfo"
import TagPreview from "@/components/TagPreview/index.vue"
import CommentInput from "@/components/CommentInput/index.vue"
import ToolBox from "@/components/Toolbox/index.vue"
import { useSettingsStore } from "@/store/modules/settings"
import SongPlay from "@/pages/music/component/SongPlay.vue"
// 前台信息仓库
const webInfoStore = useWebInfoStore()

// 设置仓库
const settingsStore = useSettingsStore()

// 初始化动画
onMounted(() => {
  webInfoStore.getAuthorInfo()
  webInfoStore.getCategoryInfo()
  webInfoStore.getTagsInfo()
  if (settingsStore.isFireworks) {
    clickEffect()
  }
})
// 添加访问记录

// 销毁动画
onUnmounted(() => {
  removeClickEffect()
})
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: translateY(-100px);
}
.fade-enter-active {
  transition: all 0.5s;
}
.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
  &.active {
    transform: translateY(-55px);
  }
}
.toolbox {
  position: fixed;
  top: 60%;
  left: 0;
}
</style>
