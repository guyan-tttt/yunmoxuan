<template>
  <div
    class="mb-3 wx w-full font-medium bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
    v-cursor-pointer
    @click="changeDialogVisible"
  >
    <img loading="lazy" class="font" src="../../../assets/layouts/offical-account-2.png" />
    <img loading="lazy" class="back" src="../../../assets/layouts/offical-account-1.png" />
    <Teleport to="#app">
      <el-dialog v-model="dialogVisible" width="30%" style="min-width: 300px">
        <el-image class="w-full" :src="url" fit="cover" />
      </el-dialog>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
const url = "https://jeek-space-blog.top:3000/images/wx/wx-code.jpg"
const dialogVisible = ref(false)
const changeDialogVisible = () => {
  dialogVisible.value = true
}
</script>

<style scoped lang="scss">
.wx {
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 10px;
  overflow: hidden;
  background-color: #07c160;
  border-radius: 10px;
  img {
    width: 90%;
    // height: 100%;
    object-fit: cover;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    transition: all 0.3s ease-out;
    // transform-origin: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .back {
    transform: translate(-50%, -50%) rotateY(180deg);
  }
  &:hover {
    .font {
      transform: translate(-50%, -50%) rotateY(180deg);
    }
    .back {
      transform: translate(-50%, -50%) rotateY(0deg);
    }
  }
}
</style>
