import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { useTagsViewStore } from "./tags-view"
import { useSettingsStore } from "./settings"
import { getToken, removeToken, setToken } from "@/utils/cache/cookies"
import { getUserInfoAPI } from "@/api/admin/user"

export const useUserStore = defineStore(
  "user",
  () => {
    const token = ref<string>(getToken() || "")
    const roles = ref<string[]>([])
    const username = ref<string>("")
    const userInfo = ref<any>()

    const tagsViewStore = useTagsViewStore()
    const settingsStore = useSettingsStore()

    /** 模拟角色变化 */
    const changeRoles = async (role: string) => {
      const newToken = "token-" + role
      token.value = newToken
      setToken(newToken)
      // 用刷新页面代替重新登录
      window.location.reload()
    }
    /** 登出 */
    const logout = () => {
      removeToken()
      token.value = ""
      roles.value = []
      _resetTagsView()
      userInfo.value = {}
    }

    /** 重置 Token */
    const resetToken = () => {
      removeToken()
      token.value = ""
      roles.value = []
    }
    /** 重置 Visited Views 和 Cached Views */
    const _resetTagsView = () => {
      if (!settingsStore.cacheTagsView) {
        tagsViewStore.delAllVisitedViews()
        tagsViewStore.delAllCachedViews()
      }
    }

    /**
     * 设置token
     * @param {string} value
     * @return {void}
     */
    const setUserToken = (value: string) => {
      token.value = value
      // 存到本地
      setToken(value)
    }
    /**
     * 设置用户信息
     * @param {*}
     * @return {void}
     */
    const setUserInfo = async () => {
      const res = await getUserInfoAPI()
      if (res.code === 200) {
        userInfo.value = res.data
      } else {
        logout()
      }
    }

    return {
      token,
      roles,
      username,
      userInfo,
      setUserInfo,
      changeRoles,
      logout,
      resetToken,
      setUserToken
    }
  },

  {
    persist: true
  }
)

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
