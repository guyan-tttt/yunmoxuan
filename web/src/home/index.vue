<template>
  <div class="home">
    <!-- 导航栏 -->
    <Header />
    <!-- 导航栏 -->
    <!-- 主题内容 -->
    <router-view v-slot="{ Component, route }">
      <transition name="fade">
        <component :is="Component" :key="route.path" class="app-container-grow" />
      </transition>
    </router-view>
    <!-- 主题内容 -->
    <!-- 底部 -->
    <Footer />
    <!-- 底部 -->
  </div>
</template>

<script setup lang="ts">
import Header from "./components/Header.vue"
//@ts-expect-error
import Footer from "./components/Footer.vue"
import { clickEffect, removeClickEffect } from "@/utils/clickAnimate"

import { onMounted, onUnmounted } from "vue"
//
// 初始化动画
onMounted(() => {
  clickEffect()
})
// 销毁动画
onUnmounted(() => {
  console.log("xa")

  removeClickEffect()
})
</script>

<style scoped lang="scss">
.home {
}
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
