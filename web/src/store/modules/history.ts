import { defineStore } from "pinia"
import { ref } from "vue"

export const useHistoryStore = defineStore(
  "history",
  () => {
    const historyList = ref<string[]>([])

    const addHistory = (val: string) => {
      if (historyList.value.includes(val)) {
        const index = historyList.value.indexOf(val)
        historyList.value.splice(index, 1)
        historyList.value.unshift(val)
        return
      }
      historyList.value.unshift(val)
    }
    // 删除历史记录
    const removeHistory = (val: string) => {
      const index = historyList.value.indexOf(val)
      historyList.value.splice(index, 1)
    }

    // 清空历史记录
    const clearHistory = () => {
      historyList.value = []
    }

    return {
      historyList,
      addHistory,
      removeHistory,
      clearHistory
    }
  },
  {
    persist: true
  }
)
