<template>
  <div class="animation" :class="{ mobile: settingStore.isMobile }">
    <div class="head">
      <div class="title">动漫追番</div>
      <div class="desc">人生最大的风险就是不冒任何风险！</div>
    </div>
    <el-card class="container mx-auto max-w-screen-xl mt-5">
      <el-row v-loading="loading" gap="8" class="mt-5" justify="center">
        <AnimationCard @click="toDetail(item._id)" v-for="item in animationData" :key="item._id" :data="item" />
      </el-row>
      <el-row justify="center" class="mt-5">
        <el-pagination
          style="margin: 0"
          background
          layout="prev, pager, next"
          :total="pageData.total"
          v-model:page-size="pageData.pageSize"
          v-model:current-page="pageData.page"
          @current-change="changePage"
          @size-change="changePageSize"
        />
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
//@ts-ignore
import AnimationCard from "@/views/animation/component/AnimationCard.vue"
import { ref, onMounted } from "vue"
import { getAnimationListAPI } from "@/api/web/animation"
import type { AnimeItem } from "@/types/admin/animation"
import { useRouter } from "vue-router"
import { useSettingsStore } from "@/store/modules/settings"

const settingStore = useSettingsStore()
// 全局路由
const router = useRouter()

// 分页数据
const pageData = ref({
  page: 1,
  pageSize: 8,
  total: 0
})

// 动漫数据
const animationData = ref<AnimeItem[]>([])

// 分页数据改变
const changePage = (page: number) => {
  pageData.value.page = page
  getAnimationList()
}

const changePageSize = (pageSize: number) => {
  pageData.value.pageSize = pageSize
  getAnimationList()
}

// 加载
const loading = ref(false)

// 获取动漫列表
const getAnimationList = async () => {
  loading.value = true
  const res = await getAnimationListAPI(pageData.value.page, pageData.value.pageSize)
  if (res.code === 200) {
    animationData.value = res.data
    pageData.value.total = res.total
    loading.value = false
  }
}

// 点击跳转至详情页
const toDetail = (id?: string) => {
  router.push(`/home-animation/detail?id=${id}`)
}
onMounted(() => {
  getAnimationList()
})
</script>

<style scoped lang="scss">
.animation {
  font-size: 20px;
  &.mobile {
    font-size: 14px;
    .head {
      height: 100px;
    }
  }
}
.head {
  background-image: url(../../assets/picture/pricture-bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  height: 300px;
  width: 100%;
  background-position: 0 -475px;
  border-radius: 0 0 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    color: #fff;
    text-align: center;
    text-shadow: 0 0.1875rem 0.3125rem #1c1f21;
    letter-spacing: 2px;
    font-size: 1.7em;
    margin-bottom: 15px;
    font-weight: 700;
  }
  .desc {
    @extend .title;
    font-size: 0.9em;
  }
}
</style>
