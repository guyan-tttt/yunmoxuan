<template>
  <header class="header-container bg-light-50" :class="{ active: settingsStore.showNavBg || bgColor }">
    <div class="container mx-auto">
      <el-menu class="el-menu" mode="horizontal" :ellipsis="false" router>
        <el-menu-item class="title-li">
          <a href="/" class="flex items-center title">
            <img style="width: 40px; height: 40px; margin-right: 20px" src="../../assets/layouts/logo.png" alt="" />
            极客空间
          </a>
        </el-menu-item>
        <div class="flex-grow" />
        <el-menu-item
          :class="{ active: item.meta?.index === activeIndex }"
          v-for="item in routesList"
          :key="item.meta?.index as string"
          @click="changeActive(item.meta?.index)"
          :index="item.path"
          >{{ item.meta?.title }}</el-menu-item
        >

        <el-sub-menu index="2">
          <template #title>
            <el-avatar :size="30" class="mr-2" />
            极客空间
          </template>
          <el-menu-item index="2-1" class="bg-gray-hover" @click="goToManagement">
            <el-icon><Monitor /></el-icon>
            进入后台
          </el-menu-item>
          <el-menu-item index="2-2" class="bg-gray-hover">
            <svg
              t="1688554592591"
              class="icon mr-2 ml-1"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2307"
              width="18"
              height="18"
            >
              <path
                d="M874.666667 855.744a19.093333 19.093333 0 0 1-19.136 18.922667H168.469333A19.2 19.2 0 0 1 149.333333 855.530667V168.469333A19.2 19.2 0 0 1 168.469333 149.333333h687.061334c10.581333 0 19.136 8.533333 19.136 18.922667V320h42.666666V168.256A61.717333 61.717333 0 0 0 855.530667 106.666667H168.469333A61.866667 61.866667 0 0 0 106.666667 168.469333v687.061334A61.866667 61.866667 0 0 0 168.469333 917.333333h687.061334A61.76 61.76 0 0 0 917.333333 855.744V704h-42.666666v151.744zM851.84 533.333333l-131.797333 131.754667a21.141333 21.141333 0 0 0 0.213333 29.973333 21.141333 21.141333 0 0 0 29.973333 0.192l165.589334-165.589333a20.821333 20.821333 0 0 0 6.122666-14.976 21.44 21.44 0 0 0-6.314666-14.997333l-168.533334-168.533334a21.141333 21.141333 0 0 0-29.952-0.213333 21.141333 21.141333 0 0 0 0.213334 29.973333L847.296 490.666667H469.333333v42.666666h382.506667z"
                fill="#8a8a8a"
                p-id="2308"
              />
            </svg>
            个人资料
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item>
          <ThemeSwitch />
        </el-menu-item>
      </el-menu>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router"
import { ref, watch, computed } from "vue"
import { useUserStore } from "@/store/modules/user"
import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
import { useWindowScroll } from "@vueuse/core"
import { usePermissionStore } from "@/store/modules/permission"
import { useSettingsStore } from "@/store/modules/settings"

// 路由对象
const route = useRoute()
// 页面滚动距离监听
const { y } = useWindowScroll()

// 全局路由对象
const router = useRouter()

// 用户仓库对象
const userStore = useUserStore()

// 页面路有对象
const permissionStore = usePermissionStore()

// 设置仓库
const settingsStore = useSettingsStore()

const routesList = computed(() => {
  return permissionStore.routes.find((item) => item.name === "Home")?.children?.filter((item) => !item.meta!.hidden)
})

// 背景颜色显示
const bgColor = ref<boolean>(false)

// 监听页面滚动
watch(
  () => y.value,
  () => {
    if (route.path !== "/") {
      bgColor.value = false
      return
    }
    if (y.value > window.innerHeight - 60) {
      bgColor.value = true
    } else {
      bgColor.value = false
    }
  }
)
/**
 * 调转后台
 * @param {*}
 * @return {*}
 */
const goToManagement = () => {
  // 判断当前是否登录过
  if (userStore.token) {
    router.push("/dashboard")
  } else {
    router.push("/login")
  }
}

// 导航栏高亮显示
const activeIndex = ref(1)

// 切换当前项
const changeActive = (index: any) => {
  activeIndex.value = index
}
</script>

<style scoped lang="scss">
.container {
  max-width: 1260px;
}

.header-container {
  border-bottom: solid 1px var(--el-menu-border-color);
  background-color: transparent;
  .el-menu-item {
    color: #fff;
  }
  &.active {
    background-color: #fff;
    .el-menu-item {
      color: #000;
    }
  }
}

.el-menu--horizontal {
  border-bottom: 0;
}

.el-menu {
  /* max-width: 1260px; */
  height: 55px;
}

.el-header {
  border-bottom: 1px solid #dcdfe6;
  height: 55px;
}

.navbar-wrapper {
  height: 55px;
}

.logo-img {
  height: 40px;
}

.logo-container {
  /* display: flex;
    align-items: center; */
}

.logo-container > a {
  height: 28px;
  width: 128px;
}

.title {
  font-size: 1.6rem;
  font-weight: 800;
}

.title-li:hover {
  border-bottom: 1px solid #fff !important;
}

/* body {
    @apply bg-light-50;
} */

.bg-gray-hover:hover {
  border-bottom: 1px solid #fff !important;
  background-color: #f4f4f5 !important;
}

header {
  position: sticky;
  top: 0;
  z-index: 100;
}
.el-menu-item.active {
  border-bottom: 1px solid #fff !important;
  background-color: #f4f4f5 !important;
  color: #2776dd;
  font-weight: 700;
}
.el-menu {
  background-color: transparent;
}
</style>
