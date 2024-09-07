<template>
  <div class="music" :class="{ mobile: settingsStore.isMobile }">
    <!-- 页头搜索框 -->
    <Header />

    <div class="content container mx-auto max-w-screen-xl mt-5">
      <!-- 歌单推荐 -->
      <Recommend :data="recommendCategory" type="歌单分类" url="/home-music/category-list?type=category" />
      <Recommend :data="recommendSongList" type="推荐歌单" url="/home-music/recommend-list" />
      <Recommend :data="singerCategory" type="歌手分类" url="/home-music/category-list?type=singer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "./component/Header.vue"
import Recommend from "./component/Recommend.vue"
import { useSettingsStore } from "@/store/modules/settings"
import { getRecommendSongCategoryAPI, getRecommendSongAPI, getSingerCategoryAPI } from "@/api/web/music"
import { onMounted, ref } from "vue"

const settingsStore = useSettingsStore()

// 推荐文章分类
const recommendCategory = ref<any[]>([])

// 获取推荐文章分类
const getRecommendCategory = async () => {
  const res = await getRecommendSongCategoryAPI(9)
  if (res.code === 200) {
    recommendCategory.value = res.playlists
  }
}

// 推荐歌单
const recommendSongList = ref<any[]>([])

// 获取推荐歌单
const getRecommendSong = async () => {
  const res = await getRecommendSongAPI(9)
  if (res.code === 200) {
    recommendSongList.value = res.playlists
  }
}

// 歌手分类
const singerCategory = ref<any[]>([])

// 获取歌手分类
const getSingerCategory = async () => {
  const res = await getSingerCategoryAPI(9)
  if (res.code === 200) {
    console.log(res)
    singerCategory.value = res.artists
  }
}

onMounted(() => {
  getRecommendCategory()
  getRecommendSong()
  getSingerCategory()
})
</script>

<style scoped lang="scss">
.music {
  font-size: 20px;
  &.mobile {
    font-size: 14px;
  }
}
.content {
  min-height: calc(100vh - 64px);
}
</style>
