<template>
  <div class="home">
    <!-- 导航栏 -->
    <Header />
    <!-- 导航栏 -->
    <!-- 主题内容 -->
    <router-view />
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
