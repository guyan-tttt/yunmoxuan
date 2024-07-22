<script lang="ts" setup>
import { useSettingsStore } from "@/store/modules/settings"

// 设置仓库对象
const settingsStore = useSettingsStore()

/**
 * @description 刷新
 */
const refresh = () => {
  settingsStore.isRefresh = !settingsStore.isRefresh
}
</script>

<template>
  <div>
    <!-- 全屏 -->
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon :size="20" @click="refresh"><Refresh /></el-icon>
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.svg-icon {
  font-size: 20px;
  margin: 0 10px;
  transition: all 0.3s;
  cursor: pointer;
  &.active {
    @keyframes refresh {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    animation: refresh 1s linear infinite;
  }
  &:focus {
    outline: none;
  }
}
</style>
