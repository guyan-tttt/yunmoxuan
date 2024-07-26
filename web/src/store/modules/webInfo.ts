import { defineStore } from "pinia"
import { ref } from "vue"
import type { UserInfo } from "@/types/admin/user"
import { getAuthorInfoAPI } from "@/api/web/index"

// 前台全局信息仓库
export const useWebInfoStore = defineStore(
  "webInfo",
  () => {
    // 网站作者信息
    const authorInfo = ref<UserInfo>()

    // 设置作者信息
    const getAuthorInfo = async () => {
      const res = await getAuthorInfoAPI()
      if (res.code === 200) {
        authorInfo.value = res.data
      }
    }
    return {
      authorInfo,
      getAuthorInfo
    }
  },
  {
    persist: true
  }
)
