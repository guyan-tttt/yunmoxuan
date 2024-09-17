import { defineStore } from "pinia"
import { ref } from "vue"
import { getUserInfoAPI } from "@/api/index.js"

export const useUserStore = defineStore("user",() => {
    const userInfo = ref()

    // 获取用户信息
    const getUserInfo = async () => {
        const res = await getUserInfoAPI()
        if(res.code === 200) {
            userInfo.value = res.data
        }
    }
    return {
        userInfo,
        getUserInfo
    }
})
