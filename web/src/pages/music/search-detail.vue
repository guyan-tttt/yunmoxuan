<template>
  <div class="search content container mx-auto max-w-screen-xl mt-5">
    <el-card v-loading="loading">
      <div class="title">
        <div class="name">🎵 歌曲列表</div>
        <div class="count">歌曲总数-{{ pageData.total }}首</div>
      </div>
      <div class="list">
        <SongCard v-for="(item, index) in musicList" :key="item.id" :data="item" type="search-list" @click="playMusic(item)">
          <div class="index">{{ index + 1 }}</div>
          <template v-slot:check>
            <el-tag type="danger" v-if="!item.check">无版权</el-tag>
            <el-tag type="success" v-else>可播放</el-tag>
          </template>
        </SongCard>
      </div>
      <el-row justify="center" style="width: 100%" class="mt-10">
        <div v-cursor-pointer class="more" @click="loadMore" v-if="pageData.total > pageData.offset + pageData.limit">
          <span>加载更多</span>
        </div>
        <div class="nomore" v-else>到底了~💫</div>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { searchAPI, checkMusicAPI } from "@/api/web/music"
import { onMounted, ref } from "vue"
import SongCard from "./component/SongCard.vue"
import { useRoute } from "vue-router"
import { useMusicStore } from "@/store/modules/music"

const musicStore = useMusicStore()
const route = useRoute()

// 音乐列表
const musicList = ref<any>([])

// 加载
const loading = ref(true)

// 分页参数
const pageData = ref({
  limit: 10,
  offset: 0,
  total: 0
})

// 搜索
const search = async () => {
  if (!route.query.keyword) return
  loading.value = true
  const res = await searchAPI(route.query.keyword as string, pageData.value.limit, pageData.value.offset)
  console.log(res)
  if (res.code === 200) {
    musicList.value = musicList.value.concat(...res.result.songs)
    pageData.value.total = res.result.songCount
    loading.value = false
  }
}

// 点击音乐列表播放
const playMusic = (item: any) => {
  musicStore.playMusicSearch(item)
}

// 加载更多
const loadMore = () => {
  pageData.value.offset += pageData.value.limit
  search()
}

// 获取版权信息
const checkMusic = async (item: any) => {
  const res = await checkMusicAPI(item.id)
  if (res.code === 200) {
    item.check = res.success
  }
}

const checkList = () => {
  const list = musicList.value.slice(pageData.value.offset, pageData.value.offset + pageData.value.limit)
  list.forEach(async (item: any) => {
    await checkMusic(item)
  })
}
onMounted(async () => {
  await search()
  checkList()
})
</script>

<style scoped lang="scss">
.el-card {
  min-height: 100px;
  .title {
    display: flex;
    align-items: center;
    margin: 20px;
    margin-left: 50px;
    padding-left: 10px;
    border-left: 5px solid #409eff;
    margin-bottom: 50px;
    .name {
      font-size: 24px;
      font-weight: 700;
    }
    .count {
      font-size: 16px;
      margin-left: 30px;
      color: #999;
    }
  }
}

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

.more {
  display: inline-block;
  text-align: center;
  margin: 0 auto;
  background: #fff;
  border-radius: 100px;
  padding: 10px 35px;
  font-size: 15px;
  font-weight: 700;
  box-shadow:
    0 10px 13px rgba(31, 45, 61, 0.1),
    0 0 0 -1px rgba(32, 160, 255, 0.2),
    0 0 0 -25px rgba(32, 160, 255, 0.3);
  transition:
    all 0.25s,
    box-shadow 0s;
  letter-spacing: 1px;
  &:hover {
    color: #20a0ff;
    box-shadow:
      0 10px 13px rgba(32, 160, 255, 0.3),
      0 0 0 25px rgba(32, 160, 255, 0),
      0 0 0 25px rgba(32, 160, 255, 0);
    transition:
      all 1s,
      box-shadow 1s ease-out 0.1s;
  }
}
</style>
