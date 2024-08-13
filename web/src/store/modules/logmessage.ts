import { defineStore } from "pinia"
import { ref } from "vue"
export const useLogMessageStore = defineStore(
  "logmesage",
  () => {
    // 获取日志信息
    const getLogData = ref<any>(null)
    // 获取消息
    const getMessage = ref<any>(null)
    return {
      getLogData,
      getMessage
    }
  },
  {
    persist: true
  }
)
