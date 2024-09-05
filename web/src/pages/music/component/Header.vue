<template>
  <div class="header">
    <h2 class="color-white dark:text-black">云墨音乐</h2>
    <div class="search">
      <el-autocomplete :prefix-icon="Search" placeholder="请输入搜索内容" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue"
</script>

<style scoped lang="scss">
.header {
  height: 50px;
  width: 100%;
  background-color: #409eff;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  h2 {
    padding: 0;
    margin: 0;
    font-family: "楷体", Courier, monospace;
  }
  .search {
    width: 40%;
    margin-left: 20px;
    display: flex;
    align-items: center;
    ::v-deep(.el-input__wrapper) {
      border-radius: 40px;
      background-color: rgba(255, 255, 255, 0.3);
      .el-input__prefix {
        color: #fff;
      }
      .el-input__inner {
        color: #fff;
        &::placeholder {
          color: #fff;
        }
      }
    }
  }
}
</style>
