<template>
  <div class="toolbox">
    <div class="menu" :class="{ active: isOpenToolbox }" ref="menuRef">
      <div class="btn" v-cursor-pointer>
        <SvgIcon class="toolbox btn" name="toolbox" @click="openToolbox" />
      </div>
      <span style="--i: 0">
        <el-popover placement="top-start" title="烟花" :width="200" trigger="hover" content="开启或者关闭当前页面点击烟花效果">
          <template #reference>
            <SvgIcon name="firework" @click="toggleFireWork" />
          </template>
        </el-popover>
      </span>
      <span style="--i: 1">
        <el-popover placement="top-start" title="回到顶部" :width="200" trigger="hover" content="点击回到页面顶部">
          <template #reference>
            <SvgIcon name="goTop" @click="goTop" />
          </template>
        </el-popover>
      </span>
      <span style="--i: 2"
        ><el-icon> <SearchMenu /> </el-icon
      ></span>
      <span style="--i: 3">
        <el-popover placement="top-start" title="开启鼠标样式" :width="200" trigger="hover" content="开启或关闭鼠标皮肤">
          <template #reference>
            <SvgIcon name="cursor" @click="mouseSkin" />
          </template>
        </el-popover>
      </span>
      <span style="--i: 4"
        ><el-icon><WarningFilled /></el-icon
      ></span>
      <span style="--i: 5"
        ><el-icon><WarningFilled /></el-icon
      ></span>
      <span style="--i: 6"
        ><el-icon><WarningFilled /></el-icon
      ></span>
      <span style="--i: 7"
        ><el-icon><WarningFilled /></el-icon
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { onClickOutside } from "@vueuse/core"
import { useSettingsStore } from "@/store/modules/settings"
import { clickEffect, removeClickEffect } from "@/utils/clickAnimate"
import SearchMenu from "../Search/index.vue"

// 是否展开工具箱
const isOpenToolbox = ref<boolean>(false)

// 打开工具箱
const openToolbox = () => {
  isOpenToolbox.value = !isOpenToolbox.value
}

// 工具箱对象
const menuRef = ref<any>(null)

// 点击工具箱外面
onClickOutside(menuRef, () => {
  isOpenToolbox.value = false
})

// 设置仓库
const settingsStore = useSettingsStore()

// 1.点击切换烟花开关
const toggleFireWork = () => {
  settingsStore.openFireworks()
}

// 监听烟花开启状态，动态改变烟花的显示
watch(
  () => settingsStore.isFireworks,
  () => {
    if (settingsStore.isFireworks) {
      clickEffect()
    } else {
      removeClickEffect()
    }
  }
)

//2. 回到页顶
const goTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}

// 开启鼠标皮肤
const mouseSkin = () => {
  settingsStore.openMouseSkin()
}
</script>

<style scoped lang="scss">
::v-deep(svg:focus) {
  outline: none !important;
}
::v-deep(.menu span[data-v-a34aaa1c]) {
  box-shadow: none;
}
.menu {
  position: relative;
  width: 200px;
  height: 200px;
  /* background-color: orange; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn {
  position: absolute;
  z-index: 1000;
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);

  transition: all 1.25s;
}
.menu span {
  width: 40px;
  height: 40px;
  background-color: #fff;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
  position: absolute;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor:
    var(--cursor-pointer) 50 50,
    pointer;
  transform-origin: 100px;
  transition-delay: calc(0.1s * var(--i));
  transition: all 0.5s;
  transform: rotate(0deg) translateX(80px);
}
.btn i {
  font-size: 32px;
}
.menu.active span {
  transform: rotate(calc(360deg / 8 * var(--i)));
}
.menu span i {
  transform: rotate(calc(360deg / -8 * var(--i)));
}
.menu.active .btn {
  transform: rotate(360deg);
}
</style>
