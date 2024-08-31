<template>
  <div class="container mx-auto max-w-screen-xl mt-5">
    <el-card class="detail" :style="{ backgroundImage: `url(${animationDetail?.cover})` }">
      <el-col class="header">
        <el-page-header icon="" title="">
          <template #icon>
            <el-icon color="#666" :size="20" @click="$router.go(-1)"> <Back /></el-icon>
          </template>
          <template #title>
            <span class="text">返回</span>
          </template>
          <template #content>
            <div class="flex items-center">
              <span class="text-large font-800 mr-3 animate__animated animate__bounce name text">{{ animationDetail?.name }}</span>
              <el-tag>{{ animationDetail?.score.toFixed(1) }}分</el-tag>
            </div>
          </template>

          <el-descriptions :column="3" class="mt-4">
            <el-descriptions-item label="动漫名" class="color-white"
              ><el-tag>{{ animationDetail?.name }}</el-tag></el-descriptions-item
            >
            <el-descriptions-item label="🔖动漫类型">
              <el-tag>{{ animationDetail?.type }}</el-tag></el-descriptions-item
            >
            <el-descriptions-item label="🔥动漫热度"
              ><el-tag>{{ animationDetail?.hot }}</el-tag></el-descriptions-item
            >
            <el-descriptions-item label="备注">
              <el-tag class="card_subtitle" v-if="animationDetail?.status === 0">自{{ animationDetail?.remark }}起停更</el-tag>
              <el-tag class="card_subtitle" v-if="animationDetail?.status === 1"
                >自{{ animationDetail?.remark }}起VIP用户每周{{ dateList[new Date(animationDetail.remark).getDay()] }}10点更新1集</el-tag
              >
              <el-tag class="card_subtitle" v-if="animationDetail?.status === 2">至{{ animationDetail?.remark }}完结</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="播放平台" class-name="link">
              <template #default>
                <a style="width: 20px; height: 20px" :href="animationDetail?.link" target="_blank"
                  ><el-image style="width: 20px; height: 20px" :src="`${animationDetail?.link.split('com')[0]}com/favicon.ico`"
                /></a>
              </template>
            </el-descriptions-item>
          </el-descriptions>
          <p class="mt-4 text-sm text">{{ animationDetail?.desc }}</p>
        </el-page-header>
        <el-col>
          <el-divider />
        </el-col>
      </el-col>
    </el-card>
    <el-card style="background-color: #f6f6f6" v-if="animationList.length === 0">
      <el-empty image="https://img.ixintu.com/download/jpg/202001/9c3ccf72134f4a28d4c8344d4505f2f0.jpg!con" />
    </el-card>
    <el-card v-else>
      <div class="list">
        <el-image
          lazy
          hide-on-click-modal
          class="item"
          :initial-index="index"
          v-for="(item, index) in animationList"
          :key="item._id"
          :src="item.src"
          :preview-src-list="imgList"
          fit="cover"
        />
      </div>

      <el-row justify="center" class="mt-5">
        <el-pagination
          style="margin: 0"
          background
          layout="prev, pager, next"
          :total="pageData.total"
          v-model:page-size="pageData.pageSize"
          v-model:current-page="pageData.page"
          @current-change="changePage"
        />
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { getAnimationDetailAPI, getAnimationImageListAPI } from "@/api/web/animation"
import { onMounted, ref, computed } from "vue"
import { useRoute } from "vue-router"
import { AnimeItem } from "@/types/admin/animation"

import type { ImageItem } from "@/types/admin/image"

// 页面路由
const route = useRoute()

// 动漫信息
const animationDetail = ref<AnimeItem>()

// 获取详情信息
const getAnimationDetail = async () => {
  const res = await getAnimationDetailAPI(route.query.id as string)
  //   console.log(res)
  if (res.code === 200) {
    animationDetail.value = res.data
  }
}

// 图片预览
const imgList = computed(() => {
  return animationList.value.map((item) => {
    return item.src
  })
})

// 图片
const animationList = ref<ImageItem[]>([])

// 获取动漫图片列表
const getAnimationImageList = async () => {
  const res = await getAnimationImageListAPI(route.query.id as string, pageData.value.page, pageData.value.pageSize)

  if (res.code === 200) {
    //@ts-ignore
    animationList.value = res.data
    pageData.value.total = res.total
  }
}

// 分页数据
const pageData = ref({
  page: 1,
  pageSize: 20,
  total: 0
})

// 切换分页
const changePage = (page: number) => {
  pageData.value.page = page
  getAnimationImageList()
}
const dateList = ["日", "一", "二", "三", "四", "五", "六"]

onMounted(() => {
  getAnimationDetail()
  getAnimationImageList()
})
</script>

<style lang="scss" scoped>
.detail {
  background-size: cover;
  background-repeat: no-repeat;
  // background-position: center;
  min-height: 300px;
  color: #fff !important;
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
.text {
  text-shadow: 0 0 6px #000;
  color: #fff; /* 白色文字 */
}
::v-deep(.el-descriptions__label:not(.is-bordered-label)) {
  text-shadow: 0 0 6px #000;
  color: #fff; /* 白色文字 */
}
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  .item {
    width: 210px;
    height: 110px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    border-radius: 10px;
    transition: all 0.3s;
    ::v-deep(img) {
      transition: all 0.3s;
      &:hover {
        filter: saturate(1.5) drop-shadow(rgba(0, 0, 0, 0.66) 0px 0px 5px);
        transform: translateY(-5px);
      }
    }
    &.active {
      box-shadow: 0 0 10px red;
      border: 1px solid red;
      transform: scale(1.1);
    }
  }
}
.deleteBtn {
  opacity: 0;
  transform: scale(0);
  margin-left: 30px;
  transition: all 0.3s;
  &.active {
    opacity: 1;
    transform: scale(1);
  }
}
::v-deep(.link) {
  display: inline-block;
  line-height: 20px;
  width: 20px !important;
  height: 20px !important;
  transform: translateY(4px);
}
</style>
