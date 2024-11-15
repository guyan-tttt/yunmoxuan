<script lang="ts" setup>
import { useTheme } from "@/hooks/useTheme"
// import { ElNotification } from "element-plus"
// 将 Element Plus 的语言设置为中文
import zhCn from "element-plus/es/locale/lang/zh-cn"
import { ElConfigProvider } from "element-plus"
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
  /* background-color: red; */
  background-image: linear-gradient(
    45deg,
    rgba(178, 86, 240, 0.5) 25%,
    transparent 25%,
    transparent 50%,
    rgba(53, 131, 233, 0.5) 50%,
    rgba(255, 255, 255, 0.5) 75%,
    transparent 75%,
    rgba(255, 104, 86, 0.5) 100%
  );
}

/* 定义滚动条的轨道样式 */
::-webkit-scrollbar-track {
  border-radius: 10px !important; /* 轨道圆角 */
  background-color: rgba(44, 153, 226, 0.3);
}
</style>
