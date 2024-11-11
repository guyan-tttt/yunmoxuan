<template>
  <div
    class="mb-3 alipay w-full font-medium bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    v-cursor-pointer
    @click="changeDialogVisible"
  >
    <img loading="lazy" class="font" src="../../../assets/layouts/alipay-app.png" />
    <Teleport to="#app">
      <el-dialog v-model="dialogVisible" width="30%" style="min-width: 300px">
        <img class="w-full" src="../../../assets/layouts/app-code.jpg" fit="cover" />
      </el-dialog>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const dialogVisible = ref(false)
const changeDialogVisible = () => {
  dialogVisible.value = true
}
</script>

<style scoped lang="scss">
.alipay {
  width: 100%;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 10px;
  overflow: hidden;
  // background-color: #07c160;
  border-radius: 10px;
  img {
    width: 100%;
    object-fit: cover;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    transition: all 0.3s ease-out;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
