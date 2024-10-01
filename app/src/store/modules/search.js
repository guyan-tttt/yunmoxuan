import { defineStore } from "pinia"
import { ref } from "vue"
import { setStorage, getStorage , removeStorage} from "@/utils/storage.js"

export const useSearchStore = defineStore("search", () => {
    const history = ref(getStorage("searchHistory") || [])

    const search = (keyword) => {
        // 判断当前搜索是否已存在
        if(!history.value.includes(keyword)) {
            history.value.unshift(keyword)
        } else {
            history.value.splice(history.value.indexOf(keyword), 1)
            history.value.unshift(keyword)
        }
    }
    const deleteHistoryItem = (keyword) => {
        history.value = history.value.filter(item => item !== keyword)
    }
    const clearHistory = () => {
        history.value = []
        removeStorage("searchHistory")
    }
    const setHistory = () => {
        setStorage("searchHistory", history.value)
    }
    return {
        history,
        search,
        deleteHistoryItem,
        clearHistory,
        setHistory
    }
})