<template>
  <div>
    <div class="index-bg" />
  </div>
</template>

<script setup lang="ts">
// import snow from "@/components/Toolbox/component/SnowflakeEffect.js"
// import { onMounted } from "vue"
// onMounted(() => {
//   // snow(document.querySelector(".index-bg")!)
// })
</script>

<style scoped lang="scss">
.index-bg {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  background: url(../../../assets/layouts/index-bg.webp) no-repeat;
  background-size: cover;
  transition: all 0.5s;
  background-position: center;
}
</style>
