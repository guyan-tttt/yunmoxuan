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
              <el-button type="primary" :icon="Edit" @click="$router.push(`/animation/add?id=${route.query.id}`)">修改动漫</el-button>
              <el-button type="danger" class="ml-2" :icon="Delete" @click="deleteAnimation">删除动漫</el-button>
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
    <el-card style="background-color: #f6f6f6" v-if="animationDetail?.imgList?.length === 0">
      <el-empty image="https://img.ixintu.com/download/jpg/202001/9c3ccf72134f4a28d4c8344d4505f2f0.jpg!con" />
    </el-card>
    <el-card v-else>
      <div class="list">
        <el-image
          lazy
          hide-on-click-modal
          class="item"
          :initial-index="index"
          v-for="(item, index) in animationDetail?.imgList"
          :key="item._id"
          :src="item.src"
          :preview-src-list="imgList"
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
    <AddImage v-model="showModal" :data="animationDetail" @update:modelValue="updateImageList" />
  </div>
</template>

<script setup lang="ts">
import { Edit, Delete, CirclePlusFilled } from "@element-plus/icons-vue"
import { getAnimationDetailAPI, getAnimationImageListAPI, deleteAnimationAPI } from "@/api/admin/animation"
import { onMounted, ref, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { AnimeItem } from "@/types/admin/animation"
import AddImage from "./component/addImage.vue"
import { ElMessage, ElMessageBox } from "element-plus"

// 页面路由
const route = useRoute()

// 全局路由
const router = useRouter()

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

// 图片预览
const imgList = computed(() => {
  return animationDetail.value?.imgList?.map((item) => {
    return item.src
  })
})

// 更新图片
const updateImageList = () => {
  getAnimationDetail()
}

// 获取动漫图片列表
const getAnimationImageList = async () => {
  const res = await getAnimationImageListAPI(route.query.id as string, pageData.value.page, pageData.value.pageSize)
  if (res.code === 200) {
    animationDetail.value!.imgList = res.data
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

// 删除动漫
const deleteAnimation = async () => {
  ElMessageBox.confirm("确定删除该动漫吗？", "温馨提示", {
    type: "warning",
    confirmButtonText: "确定",
    cancelButtonText: "取消"
  })
    .then(async () => {
      const res = await deleteAnimationAPI(route.query.id as string)
      if (res.code === 200) {
        ElMessage.success("删除动漫成功")
        router.back()
      } else if (res.code === 201) {
        ElMessage.error(res.message)
      } else {
        ElMessage.error("删除动漫失败")
      }
    })
    .catch(() => {})
}

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
