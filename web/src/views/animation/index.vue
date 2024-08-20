<template>
  <div>
    <el-card>
      <el-row>
        <el-button type="primary" :icon="Plus" @click="$router.push('/animation/add')">添加动漫</el-button>
      </el-row>
      <el-row v-loading="loading" gap="10" class="mt-5">
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
import { Plus } from "@element-plus/icons-vue"
//@ts-ignore
import AnimationCard from "./component/AnimationCard.vue"
import { ref, onMounted } from "vue"
import { getAnimationListAPI } from "@/api/admin/animation"
import { AnimeItem } from "@/types/admin/animation"
import { useRouter } from "vue-router"

// 全局路由
const router = useRouter()

// 分页数据
const pageData = ref({
  page: 1,
  pageSize: 12,
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
  router.push(`/animation/detail?id=${id}`)
}
onMounted(() => {
  getAnimationList()
})
</script>

<style scoped></style>
