<template>
  <div class="container mx-auto max-w-screen-xl mt-5" v-loading="loading">
    <el-card class="detail">
      <el-col class="header">
        <el-page-header icon="" title="">
          <template #icon>
            <el-icon color="#666" :size="20" @click="$router.go(-1)"> <Back /></el-icon>
          </template>
          <template #title>
            <span class="text" v-cursor-pointer @click="$router.go(-1)">返回</span>
          </template>
          <template #content>
            <div class="flex items-center">
              <span class="text-large font-800 mr-3 animate__animated animate__bounce name text">{{ categoryDetail.name }}</span>
            </div>
          </template>
          <el-row style="width: 100%" class="mt-4">
            <div style="flex: 1">
              <el-descriptions :column="2" class="mt-4">
                <el-descriptions-item label="歌单名称" class="color-white"
                  ><el-tag>{{ categoryDetail.name }}</el-tag></el-descriptions-item
                >
                <el-descriptions-item label="🔖歌单标签">
                  <el-tag v-for="item in categoryDetail.tags" :key="item">{{ item }}</el-tag></el-descriptions-item
                >
                <el-descriptions-item label="🔥播放量"
                  ><el-tag>{{ categoryDetail.playCount }}</el-tag></el-descriptions-item
                >
                <el-descriptions-item label="作者">
                  <el-tag class="card_subtitle">{{ categoryDetail.creator?.nickname }}</el-tag>
                </el-descriptions-item>
              </el-descriptions>
              <p class="mt-4 text-sm text" v-html="categoryDetail.description" />
            </div>
            <el-image class="cover" :src="categoryDetail.coverImgUrl" fit="cover" lazy>
              <template #placeholder>
                <Loading />
              </template>
            </el-image>
          </el-row>
        </el-page-header>
        <el-col>
          <el-divider />
        </el-col>
      </el-col>
    </el-card>
    <!-- <el-card style="background-color: #f6f6f6">
      <el-empty image="https://img.ixintu.com/download/jpg/202001/9c3ccf72134f4a28d4c8344d4505f2f0.jpg!con" />
    </el-card> -->
    <el-card class="mt-3">
      <div class="list">
        <SongCard v-for="(item, index) in songList" :key="item.id" :data="item" @click="playMusic(item)">
          <div class="index">{{ index + 1 }}</div>
        </SongCard>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import SongCard from "./component/SongCard.vue"
import Loading from "@/components/Loading/index.vue"
import { getSongCategoryDetailAPI } from "@/api/web/music"

import { useMusicStore } from "@/store/modules/music"

// 音乐仓库
const musicStore = useMusicStore()

// 页面路由
const route = useRoute()

// 歌单详情
const categoryDetail = ref<any>({})

// 歌曲列表
const songList = ref<any[]>([])

// 获取歌单详情
const getCategoryetail = async () => {
  loading.value = true
  const res = await getSongCategoryDetailAPI(parseInt(route.query.id as string))
  console.log(res)
  if (res.code === 200) {
    categoryDetail.value = res.playlist
    songList.value = res.playlist?.tracks.slice(0, 20)
  }
  loading.value = false
}

// 点击歌曲播放音乐
const playMusic = (item: any) => {
  musicStore.playMusic(item)
  // console.log(e);
}

onMounted(() => {
  if (route.query.id) {
    getCategoryetail()
  }
})

// 加载
const loading = ref(false)
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .index {
    width: 30px;
    height: 30px;
    margin-left: 10px;
    background-color: #409eff;
    text-align: center;
    line-height: 30px;
    color: #fff;
    font-size: 18px;
    border-radius: 50%;
  }
}
.detail {
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 300px;
}
::v-deep(.el-descriptions__body) {
  background: transparent;
}
.name {
  font-size: 20px;
}
.header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  min-height: 300px;
}

.cover {
  width: 300px;
  height: 300px;
  margin-right: 20px;
  border: 5px solid #ccc;
  border-radius: 10px;
  margin-left: 10px;
}
</style>
