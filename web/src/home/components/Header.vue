<template>
  <header class="header-container bg-light-50 dark:bg-gray-800 dark:border-gray-600" :class="{ active: settingsStore.showNavBg || bgColor }" >
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
        >
          <SvgIcon :name="item.meta?.icon as string" style="width: 18px; height: 18px; margin-right: 5px" />
          {{ item.meta?.title }}
        </el-menu-item>

        <el-sub-menu index="2">
          <template #title>
            <el-avatar :size="30" :src="webInfoStore.authorInfo?.avatar" class="mr-2" />
            极客空间
          </template>
          <el-menu-item index="" class="bg-gray-hover" @click="goToManagement">
            <el-icon><Monitor /></el-icon>
            进入后台
          </el-menu-item>
          <el-menu-item index="/home-userinfo" class="bg-gray-hover">
            <el-icon><User /></el-icon>
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
import { useWebInfoStore } from "@/store/modules/webInfo"

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

// 前台信息仓库
const webInfoStore = useWebInfoStore()

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
// 监听页面路由变化，切换选项卡
watch(
  () => route.path,
  () => {
    if (route.meta?.index) {
      activeIndex.value = route.meta.index
    } else {
      activeIndex.value = 0
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
const activeIndex = ref(route.meta?.index || 0)

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
