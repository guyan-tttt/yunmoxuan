<template>
  <header class="header">
    <el-icon class="ml-5" @click="drawer = true" :size="30" color="#fff"><Expand /></el-icon>
    <el-drawer class="menu" direction="ltr" v-model="drawer" title="I am the title" :with-header="false" size="80%">
      <div class="header-user">
        <h2>{{ VITE_APP_TITLE }}</h2>
        <el-card class="user-info">
          <el-row align="middle">
            <el-avatar :size="50" src="https://jeek-space-blog.top:3000/images/user/8e9bab04192dea62e77cb066e6c3c7d3.jpeg" />
            <div class="nickname ml-6">顾言</div>
          </el-row>
          <div class="info mt-4">
            <div class="desc">衣带渐宽终不悔，为伊消得人憔悴</div>
          </div>
        </el-card>
      </div>
      <el-card class="list mt-5">
        <router-link @click="drawer = false" v-for="item in routesList" :key="item.path" :to="item.path" class="item"
          ><SvgIcon :name="item.meta?.icon as string" />{{ item.meta?.title }}</router-link
        >
      </el-card>
      <el-card class="mt-3">
        <div class="loader">
          <div
            class="bg"
            :class="{ active: charging }"
            :style="{
              width: `${level * 100}%`,
              backgroundColor: `${level < 0.2 ? 'red' : 'var(--primary-color)'}`
            }"
          />
          <div class="progress" />
          <span class="num"> 当前电量:{{ level * 100 }}% {{ charging ? "⚡" : "" }}</span>
        </div>
      </el-card>
    </el-drawer>
  </header>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue"
import { constWebRoutes } from "@/router/index"
import { useBattery } from "@vueuse/core"
const drawer = ref(false)

const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE

const routesList = computed(() => {
  const list = constWebRoutes[0].children?.filter((item: any) => !item.meta!.hidden)
  return list.filter((item: any) => item.meta.title !== "音乐")
})

const { charging, level } = useBattery()
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  align-items: center;
  .info {
    flex: 1;
    overflow: hidden;
  }
}
.nickname {
  font-size: 26px;
  color: #666;
  font-family: "楷体";
  filter: drop-shadow(0 0 1px #999);
}
::v-deep(.el-drawer) {
  padding: 0;
}
h2 {
  filter: drop-shadow(0 0 1px #999);
}
.el-avatar {
}
.card-user {
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  height: 100px;
  display: flex;
  align-items: center;

  border: 2px solid #efefef;
}

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
  background-image: url(../../assets/layouts/index-bg.webp);
  background-position: center center;
  background-size: cover;
  h2 {
    font-family: "STKaiti";
    font-size: 30px;
    margin: 0;
    color: #fff;
    margin-bottom: 10px;
  }
  .list {
    list-style: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    margin-top: 10px;
    gap: 5px;
    .item {
      width: 100%;
      height: 50px;
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 5px;
      border-bottom: #efefef solid 1px;
      &:nth-child(1) {
        border-top: 1px solid #efefef;
      }
    }
  }
}

.loader {
  width: 100%;
  height: 50px;
  background-color: #ececec;
  border-radius: 10px;
  border: 1px solid #ececec;
  margin: 0 auto;
  display: flex;
  // justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-direction: column;
  position: relative;
  .bg {
    width: 50%;
    height: 50px;

    background-color: var(--primary-color);
    position: absolute;
    left: 0;
    z-index: 10;
    box-shadow: #409eff 0px 2px 5px 0px;
    background-size: 40px 40px;
    animation: 9s linear 0s infinite normal none running identifier;
    @keyframes identifier {
      0% {
        background-position: 0px 0px;
      }
      100% {
        background-position: 400px 0px;
      }
    }
    &.active {
      background-image: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.5) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0.5) 75%,
        transparent 75%,
        transparent
      );
      animation: 9s linear 0s infinite normal none running identifier;
    }
  }
  .nprogess {
    width: 100%;
    height: 50px;
    background-color: #ececec;
    position: absolute;
    left: 0;
    z-index: 0;
    border-radius: 20px;
  }
  .num {
    width: 100%;
    font-size: 18px;
    position: absolute;
    text-align: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
    filter: drop-shadow(0 0 1px #000);
    color: #fff;
  }
}
</style>
