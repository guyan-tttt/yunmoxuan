import { type Ref, ref, watch } from "vue"
import { defineStore } from "pinia"
import { type LayoutSettings, layoutSettings } from "@/config/layouts"
import { setConfigLayout } from "@/utils/cache/local-storage"

type SettingsStore = {
  // 使用映射类型来遍历 layoutSettings 对象的键
  [Key in keyof LayoutSettings]: Ref<LayoutSettings[Key]>
}

type SettingsStoreKey = keyof SettingsStore

export const useSettingsStore = defineStore("settings", () => {
  /** 状态对象 */
  const state = {} as SettingsStore
  // 刷新页面
  const isRefresh = ref(false)

  // 遍历 layoutSettings 对象的键值对
  for (const [key, value] of Object.entries(layoutSettings)) {
    // 使用类型断言来指定 key 的类型，将 value 包装在 ref 函数中，创建一个响应式变量
    const refValue = ref(value)
    // @ts-ignore
    state[key as SettingsStoreKey] = refValue
    // 监听每个响应式变量
    watch(refValue, () => {
      // 缓存
      const settings = _getCacheData()
      setConfigLayout(settings)
    })
  }
  /** 获取要缓存的数据：将 state 对象转化为 settings 对象 */
  const _getCacheData = () => {
    const settings = {} as LayoutSettings
    for (const [key, value] of Object.entries(state)) {
      // @ts-ignore
      settings[key as SettingsStoreKey] = value.value
    }
    return settings
  }
  const setIsRefresh = (val: boolean) => {
    isRefresh.value = val
  }
  // 导航栏显示背景
  const showNavBg = ref(true)
  // 改变导航栏背景
  const changeNavBg = (value: boolean) => {
    showNavBg.value = value
  }

  // 当前烟花特效是否开启
  const isFireworks = ref(false)
  // 开启烟花特效
  const openFireworks = () => {
    isFireworks.value = !isFireworks.value
  }
  // 鼠标皮肤
  const isMouseSkin = ref<boolean>(false)

  // 开启鼠标皮肤
  const openMouseSkin = () => {
    // 切换
    const home = document.querySelector(".home") as any
    if (isMouseSkin.value) {
      home?.style.setProperty("--cursor-default", "default")
      home?.style.setProperty("--cursor-pointer", "pointer")
    } else {
      home?.style.setProperty("--cursor-default", "var(--default")
      home?.style.setProperty("--cursor-pointer", "var(--pointer")
    }
    isMouseSkin.value = !isMouseSkin.value
  }

  const isMobile = ref(false)
  // 判断是否是移动端
  // 计算是否是移动端
  const setIsMobile = () => {
    if (document.documentElement.clientWidth <= 1000) isMobile.value = true
    else isMobile.value = false
    console.log("isMobile", isMobile.value, window.innerWidth)
    window.onresize = () => {
      if (document.documentElement.clientWidth <= 1000) isMobile.value = true
      else isMobile.value = false
    }
  }

  return {
    ...state,
    isRefresh,
    setIsRefresh,
    showNavBg,
    changeNavBg,
    isFireworks,
    openFireworks,
    isMouseSkin,
    openMouseSkin,
    isMobile,
    setIsMobile
  }
})
