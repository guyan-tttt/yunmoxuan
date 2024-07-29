<template>
  <div class="home">
    <!-- 导航栏 -->
    <Header />
    <!-- 导航栏 -->
    <!-- 主题内容 -->
    <router-view v-slot="{ Component, route }">
      <transition name="fade">
        <component :is="Component" :key="route.fullPath" class="app-container-grow" />
      </transition>
    </router-view>
    <!-- 主题内容 -->
    <!-- 底部 -->
    <Footer />
    <!-- 底部 -->
    <!-- 标签展示组件 -->
    <TagPreview :tagDetail="webInfoStore.tagPreviewInfo as any" v-model="webInfoStore.showPreview" />
    <!-- // 评论组件 -->
    <CommentInput />
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

// 前台信息仓库
const webInfoStore = useWebInfoStore()

// 初始化动画
onMounted(() => {
  webInfoStore.getAuthorInfo()
  webInfoStore.getCategoryInfo()
  webInfoStore.getTagsInfo()
  clickEffect()
})
// 销毁动画
onUnmounted(() => {
  console.log("xa")

  removeClickEffect()
})
</script>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: all 0.5s;
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
