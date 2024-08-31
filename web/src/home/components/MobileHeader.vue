<template>
  <header class="header">
    <el-icon class="ml-5" @click="drawer = true" :size="30" color="#fff"><Expand /></el-icon>
    <el-drawer class="menu" direction="ltr" v-model="drawer" title="I am the title" :with-header="false" size="50%">
      <h2>{{ VITE_APP_TITLE }}</h2>
      <ul class="list">
        <router-link @click="drawer = false" v-for="item in routesList" :key="item.path" :to="item.path" class="item"
          ><SvgIcon :name="item.meta?.icon" />{{ item.meta?.title }}</router-link
        >
      </ul>
    </el-drawer>
  </header>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue"
import { constWebRoutes } from "@/router/index"
const drawer = ref(false)

const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE

const routesList = computed(() => {
  return constWebRoutes[0].children?.filter((item: any) => !item.meta!.hidden)
})
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.header {
  height: 100%;
  border: 0;
  background-color: rgba(0, 0, 0, 0.3);
  min-height: 50px;
  display: flex;
  align-items: center;
}
::v-deep(.menu) {
  background-color: #efefef;
  color: #409eff;
  h2 {
    font-family: "STKaiti";
    font-size: 30px;
  }
  .list {
    list-style: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    gap: 5px;
    .item {
      width: 100%;
      height: 50px;
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
}
</style>
