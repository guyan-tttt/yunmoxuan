<template>
  <div class="container mx-auto max-w-screen-xl mt-5 userInfo">
    <el-card>
      <el-page-header icon="" title="">
        <template #icon />
        <template #title />
        <template #content>
          <div class="flex items-center">
            <el-avatar class="mr-3" :size="60" :src="webInfoStore.authorInfo?.avatar" />
            <span class="text-large font-600 mr-3 animate__animated animate__bounce">
              {{ webInfoStore.authorInfo?.nickname }}</span
            >
            <SvgIcon :name="webInfoStore.authorInfo?.gender === 1 ? 'boy' : 'girl'" style="width: 30px; height: 30px" />
            <el-tag>管理员</el-tag>
          </div>
        </template>

        <el-descriptions :column="3" class="mt-4">
          <el-descriptions-item label="用户昵称">{{ webInfoStore.authorInfo?.nickname }}</el-descriptions-item>
          <el-descriptions-item label="用户电话">{{ webInfoStore.authorInfo?.phone }}</el-descriptions-item>
          <el-descriptions-item label="用户邮箱">{{ webInfoStore.authorInfo?.email }}</el-descriptions-item>
          <el-descriptions-item label="备注">
            <el-tag size="small" type="success">前端开发</el-tag>
            <el-tag size="small">学生</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="GitHub">
            {{ webInfoStore.authorInfo?.github }}
          </el-descriptions-item>
        </el-descriptions>
        <p class="mt-4 text-sm">{{ webInfoStore.authorInfo?.introduction }}</p>
      </el-page-header>
    </el-card>
    <el-card style="margin-top: 20px">
      <ul class="nav">
        <li
          v-for="item in navList"
          :key="item.id"
          :class="{ active: activeId === item.id }"
          @click="activeId = item.id"
        >
          <el-icon :size="30"><component :is="item.icon" /></el-icon><span>{{ item.name }}</span>
        </li>
        <div class="indicator" />
      </ul>
      <el-tabs v-model="activeId" type="border-card" class="demo-tabs">
        <el-tab-pane :name="1"> <Info :data="webInfoStore.authorInfo" /> </el-tab-pane>
        <el-tab-pane :name="2">未开发</el-tab-pane>
        <el-tab-pane :name="3">未开发</el-tab-pane>
        <el-tab-pane :name="4">未开发</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Info from "./components/Info.vue"
import { useWebInfoStore } from "@/store/modules/webInfo"

// 前台信息仓库
const webInfoStore = useWebInfoStore()

// 导航栏数据
const navList = ref<{ id: number; name: string; icon: string }[]>([
  {
    id: 1,
    name: "信息",
    icon: "UserFilled"
  },
  {
    id: 2,
    name: "简历",
    icon: "List"
  },
  {
    id: 3,
    name: "面试",
    icon: "Opportunity"
  },
  {
    id: 4,
    name: "文章",
    icon: "Management"
  }
])

// 当前激活的导航栏id
const activeId = ref<number>(1)
</script>

<style scoped lang="scss">
.userInfo {
  width: 100%;
  min-height: calc(100vh - 60px - 120px);
  position: relative;
}
::v-deep(.el-page-header__back) {
  display: none;
}
::v-deep(.el-divider--vertical) {
  border: 0;
}
::v-deep(.el-tabs__nav-scroll) {
  display: none;
}
::v-deep(.el-tabs--border-card > .el-tabs__header),
::v-deep(.el-tabs--border-card) {
  border: 0;
}
.nav {
  width: 100%;
  height: 70px;
  padding: 0 25px;
  border-radius: 10px;
  background-color: #2196f3;
  position: relative;
  display: flex;
}
.nav li {
  width: 70px;
  height: 70px;
  z-index: 1;
  position: relative;
  list-style: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.nav li i {
  display: block;
  height: 70px;
  line-height: 70px;
  font-size: 24px;
  text-align: center;
  position: relative;
  transition: all 0.5s;
  color: #fff;
}
.nav li span {
  position: absolute;
  font-size: 12px;
  letter-spacing: 2px;
  transition: all 0.5s;
  opacity: 0;
  transform: translateY(20px);
  color: #fff;
  font-weight: 700;
}
.nav li.active i {
  transform: translateY(-35px);
  color: #fff;
}
.nav li.active span {
  opacity: 1;
  transform: translateY(10px);
}
.indicator {
  position: absolute;
  top: -50%;
  width: 70px;
  height: 70px;
  background-color: #2196f3;
  border-radius: 50%;
  transition: all 0.5s;
  border: 6px solid var(--el-card-bg-color);
}
.indicator::before {
  content: "";
  position: absolute;
  top: 50%;
  left: -22px;
  width: 20px;
  height: 20px;
  background-color: #2196f3;
  border-top-right-radius: 20px;
  box-shadow: 1px -10px 0 0 var(--el-card-bg-color);
}
.indicator::after {
  content: "";
  position: absolute;
  top: 50%;
  right: -22px;
  width: 20px;
  height: 20px;
  background-color: #2196f3;
  border-top-left-radius: 20px;
  box-shadow: -1px -10px 0 0 var(--el-card-bg-color);
}
li:nth-child(1).active ~ .indicator {
  transform: translateX(calc(70px * 0));
}
li:nth-child(2).active ~ .indicator {
  transform: translateX(calc(70px * 1));
}
li:nth-child(3).active ~ .indicator {
  transform: translateX(calc(70px * 2));
}
li:nth-child(4).active ~ .indicator {
  transform: translateX(calc(70px * 3));
}
li:nth-child(5).active ~ .indicator {
  transform: translateX(calc(70px * 4));
}
</style>
