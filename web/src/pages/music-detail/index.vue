<template>
  <div class="detail">
    <div class="bg" />
    <div class="content">
      <div class="left">
        <el-row style="width: 300px; color: #fff" justify="start" class="mb-3" @click="$router.back()"
          ><el-icon><ArrowLeft /></el-icon><span>返回</span></el-row
        >
        <el-image src="http://p2.music.126.net/XTVHOQ7E7ZlLDvDW3q_xGg==/109951169797627572.jpg" />
        <div class="btn">下载该歌曲</div>
      </div>
      <div class="right">
        <Lyric />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from "@/store/modules/settings"
import { onMounted, onUnmounted } from "vue"
import Lyric from "./component/Lyric.vue"
import { useRoute } from "vue-router"
import { getMusicLyricAPI } from "@/api/web/music"
const route = useRoute()

const settingsStore = useSettingsStore()

// 获取歌词
const getLyric = async () => {
  const res = await getMusicLyricAPI(route.query.id)
  console.log(res)
}

onMounted(() => {
  settingsStore.showOrHideCopyright(false)
  getLyric()
})

onUnmounted(() => {
  settingsStore.showOrHideCopyright(true)
})
</script>

<style scoped lang="scss">
.detail {
  position: relative;
  .bg {
    width: 100%;
    height: calc(100vh - 115px);
    background-color: red;
    background-image: url(http://p2.music.126.net/XTVHOQ7E7ZlLDvDW3q_xGg==/109951169797627572.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(1.875rem) brightness(0.8);
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .content {
    width: 1280px;
    // height: 400px;
    margin: 0 auto;
    padding-top: 70px;
    background-color: transparent;
    display: flex;
    justify-content: center;
    .left {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      //   background-color: green;
      .el-image {
        width: 300px;
        height: 300px;
        border: 5px solid #fff;
        border-radius: 20px;
        img {
          border-radius: 20px;
        }
      }
      .btn {
        width: 300px;
        height: 60px;
        line-height: 60px;
        // background-color: #fff;
        border-radius: 40px;
        text-align: center;
        margin-top: 30px;
        color: #eeecec;
        cursor: var(--cursor-pointer);
        border: 2px solid #eeecec;
        &:hover {
          color: #fff;
          border: 2px solid #fff;
        }
      }
    }
    .right {
      flex: 1;
      //   background-color: #fff;
    }
  }
}
</style>
