import { defineStore } from "pinia"
import { ref } from "vue"
export const useSettingStore = defineStore("setting",() => {
    const setting = ref(uni.getStorageSync("setting") || {
        history: true
    })
    const setSetting = () => {
        uni.setStorageSync("setting",setting.value)
    }
    const setHistory = (value) => {
        setting.value.history = value
    }
    return {
        setting,
        setSetting,
        setHistory
    }
})