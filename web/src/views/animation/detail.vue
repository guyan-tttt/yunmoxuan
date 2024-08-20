<template>
  <div>
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
          <template #extra>
            <div class="flex items-center">
              <el-button type="primary" :icon="Edit">修改动漫</el-button>
              <el-button type="danger" class="ml-2" :icon="Delete">删除动漫</el-button>
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
              <el-tag class="card_subtitle" v-if="animationDetail?.status === 1">自{{ animationDetail?.remark }}起VIP用户每周五10点更新1集</el-tag>
              <el-tag class="card_subtitle" v-if="animationDetail?.status === 2">至{{ animationDetail?.remark }}完结</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="播放平台">
              <el-tag>
                <a href="cacxascascdac"><el-image src="" /></a
              ></el-tag>
            </el-descriptions-item>
          </el-descriptions>
          <p class="mt-4 text-sm text">{{ animationDetail?.desc }}</p>
        </el-page-header>
        <el-col>
          <el-divider />
          <el-button @click="openModel" size="large" :icon="CirclePlusFilled" circle type="success" />
        </el-col>
      </el-col>
    </el-card>
    <el-card>
      <div class="list">
        <el-image class="item" v-for="item in animationDetail?.imgList" :key="item._id" :src="item.src" />
      </div>
    </el-card>
    <AddImage v-model="showModal" :data="animationDetail" />
  </div>
</template>

<script setup lang="ts">
import { Edit, Delete, CirclePlusFilled } from "@element-plus/icons-vue"
import { getAnimationDetailAPI } from "@/api/admin/animation"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { AnimeItem } from "@/types/admin/animation"
import AddImage from "./component/addImage.vue"

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
    console.log(res)
  }
}

// 弹框显示
const showModal = ref(false)

// 开启弹框
const openModel = () => {
  showModal.value = true
}
onMounted(() => {
  getAnimationDetail()
})
</script>

<style lang="scss" scoped>
.detail {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
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
    ::v-deep(img) {
      transition: all 0.3s;
      &:hover {
        filter: saturate(1.5) drop-shadow(rgba(0, 0, 0, 0.66) 0px 0px 5px);
        transform: translateY(-5px);
      }
    }
  }
}
</style>
