<script lang="ts" setup>
import { useTheme } from "@/hooks/useTheme"
// import { ElNotification } from "element-plus"
// 将 Element Plus 的语言设置为中文
import zhCn from "element-plus/es/locale/lang/zh-cn"

const { initTheme } = useTheme()

/** 初始化主题 */
initTheme()
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<style>
/* 定义滚动条的轨道样式 */
::-webkit-scrollbar {
  width: 5px !important; /* 水平滚动条宽度 */
  /* 垂直滚动条宽度 */
}

/* 定义滚动条的滑块样式 */
::-webkit-scrollbar-thumb {
  border-radius: 10px !important; /* 滑块圆角 */
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%) !important; /* 滑块颜色 */
}

/* 定义滚动条的轨道样式 */
::-webkit-scrollbar-track {
  background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%) !important; /* 轨道颜色 */
}
</style>
