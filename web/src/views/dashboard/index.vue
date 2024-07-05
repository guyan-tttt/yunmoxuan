<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user"
import { onMounted } from "vue"

// 用户信息仓库
const userStore = useUserStore()

// 页面挂载时获取用户信息
onMounted(() => {
  // 判断此时是否有用户信息
  if (!userStore.userInfo.username) {
    // 没有用户信息，则发送请求获取用户信息
    userStore.setUserInfo()
  } else {
    // 已有用户信息，则不发送请求
    console.log("已有用户信息，无需发送请求")
  }
})
</script>

<template>
  <div class="home">
    <el-button>发送请求</el-button />
    </div>
</template>
