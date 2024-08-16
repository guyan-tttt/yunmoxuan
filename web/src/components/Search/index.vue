<template>
  <div>
    <el-popover placement="top-start" title="回到顶部" :width="200" trigger="hover" content="点击回到页面顶部">
      <template #reference>
        <SvgIcon name="home-search" @click="openDialog" />
      </template>
    </el-popover>
    <SearchMenu v-model="dialogShow" />
  </div>
</template>

<script setup lang="ts">
import SearchMenu from "./SearchMenu.vue"
import { ref } from "vue"
const dialogShow = ref(false)

// 打开弹框
const openDialog = () => {
  dialogShow.value = true
}
</script>

<style scoped></style>
