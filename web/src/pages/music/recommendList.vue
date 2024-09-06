<template>
  <div>
    <div class="content container mx-auto max-w-screen-xl mt-5">
      <el-card>
        <el-row justify="space-between" align="middle">
          <h2>⭐ 推荐歌单</h2>
          <span class="mr-3 hover:text-blue" style="cursor: pointer" @click="$router.back()"> 返回></span>
        </el-row>
        <el-row :gap="6" justify="center">
          <RecommendCard v-for="item in recommnedList" :key="item.id" :data="item" />
        </el-row>
        <el-row justify="space-between" class="mt-5">
          <div v-cursor-pointer class="more" v-if="recommnedList.length < pageData.total" @click="changePage">
            <span>加载更多</span>
          </div>
          <div class="nomore" v-else>到底了~💫</div>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import RecommendCard from "./component/recommendCard.vue"
import { ref, onMounted } from "vue"
import { getRecommendSongAPI } from "@/api/web/music"

const pageData = ref({
  page: 1,
  pageSize: 20,
  total: 0
})

const changePage = () => {
  pageData.value.page = pageData.value.page + 1
  getRecommendCategory()
}

// 推荐歌单列表
const recommnedList = ref<any[]>([])

// 获取歌歌单分类/推荐歌单/歌手
const getRecommendCategory = async () => {
  const res = await getRecommendSongAPI(
    pageData.value.pageSize,
    recommnedList.value.length ? recommnedList.value[recommnedList.value.length - 1].updateTime : 0
  )
  if (res.code === 200) {
    recommnedList.value = recommnedList.value.concat(...res.playlists)
    pageData.value.total = res.total
  }
}
onMounted(() => {
  getRecommendCategory()
})
</script>

<style scoped lang="scss">
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
