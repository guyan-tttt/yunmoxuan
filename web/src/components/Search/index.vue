<template>
  <div>
    <el-popover placement="top-start" title="搜索文章" :width="200" trigger="hover" content="点击搜索文章">
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
