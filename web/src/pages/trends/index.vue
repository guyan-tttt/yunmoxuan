<template>
  <div>
    <div class="head">
      <div class="title">个人动态</div>
      <div class="desc">须知少时凌云志，曾许人间第一流!</div>
    </div>
    <el-card
      v-infinite-scroll="infiniteScroll"
      infinite-scroll-distance="100px"
      style="width: 80%; margin: 0 auto; position: relative; min-height: 100vh"
      class="container mx-auto max-w-screen-xl mt-5"
    >
      <el-timeline style="max-width: 90%">
        <el-timeline-item v-for="i in trendsList" :key="i._id" color="#409eff" :timestamp="dayjs(i.createTime).format('YYYY/MM/DD')" placement="top">
          <el-row justify="space-between" align="middle">
            <el-col :span="24">
              <el-card>
                <el-row style="width: 100%" justify="space-between">
                  <div class="user">
                    <el-avatar class="mr-3" :size="50" :src="i.userInfo.avatar" />
                    <span class="font-700 mr-4 nickname">{{ i.userInfo.nickname }}</span>
                    <span class="time">{{ dayjs(i.createTime).format("YYYY-MM-DD HH:mm") }}</span>
                    <i>IP: 中国</i>
                  </div>

                  <el-button circle :icon="View" type="success" />
                </el-row>
                <p class="content">{{ i.content }}</p>
                <el-row class="imageList">
                  <el-image
                    v-for="item in i.imgList"
                    :key="item"
                    style="width: 30%; height: auto"
                    :src="item"
                    :zoom-rate="1.2"
                    :max-scale="7"
                    :min-scale="0.2"
                    :preview-src-list="i.imgList"
                    :initial-index="4"
                    fit="cover"
                  />
                </el-row>
                <el-row justify="end" class="about">
                  <span style="position: relative"
                    ><SvgIcon class="like" style="margin-right: 10px; color: red" name="like-active" size="18" />{{ i.likeNum }}
                  </span>
                  <span
                    ><el-icon style="margin-right: 10px" :size="18"><View /></el-icon>{{ i.lookNum }}</span
                  >
                  <span
                    ><el-icon style="margin-right: 10px" :size="18"><ChatRound /></el-icon>{{ i.commentNum }}</span
                  >
                </el-row>
                <Comment :status="'web'" :data="i" :province="provinceData" @update="(value) => commentNumChange(i, value)" />
              </el-card>
            </el-col>
          </el-row>
        </el-timeline-item>
      </el-timeline>
      <div class="nomore">没有更多了~</div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { View } from "@element-plus/icons-vue"
import { getTrendsListAPI } from "@/api/web/trends"
import { onMounted, ref } from "vue"
import type { TrendsItem } from "@/types/admin/trends"
import dayjs from "dayjs"
import Comment from "@/views/trends/components/Comment.vue"
import { getProvinceAPI } from "@/api/admin/trends"
// 动态列表
const trendsList = ref<TrendsItem[]>([])

// 分页数据
const pageData = ref({
  page: 1,
  pageSize: 5,
  total: 0
})

// 获取动态列表
const getTrendsList = async () => {
  const res = await getTrendsListAPI(pageData.value.page, pageData.value.pageSize)
  if (res.code === 200) {
    trendsList.value = trendsList.value.concat(res.data)
    pageData.value.total = res.total as number
  }
}

// 是否触底加载
const isBottom = ref<boolean>(false)

// 触底加载
const infiniteScroll = async () => {
  if (!isBottom.value) {
    isBottom.value = true

    // 调用接口获取数据
    pageData.value.page++
    await getTrendsList()
    // 判断是否已经加载完成
    if (pageData.value.total === trendsList.value.length) {
      return
    }
    setTimeout(() => {
      isBottom.value = false
    }, 1000)
  }
}

// 评论数量改变
const commentNumChange = (item: TrendsItem, value: number) => {
  item.commentNum += value
}

// 获取省信息
const getLocation = async () => {
  const res = await getProvinceAPI()
  provinceData.value = res.data.districts[0].districts
}

// 省份数据
const provinceData = ref<any[]>([])
// 初始化
onMounted(async () => {
  await getLocation()
  getTrendsList()
})
</script>

<style scoped lang="scss">
.head {
  background-image: url(../../assets/trends/trends-bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  height: 300px;
  width: 100%;
  background-position: 0 -225px;
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
    font-size: 35px;
    margin-bottom: 15px;
    font-weight: 700;
  }
  .desc {
    @extend .title;
    font-size: 18px;
  }
}
.time {
  margin-left: 10px;
}

i {
  margin-left: 10px;
}

.nickname {
  font-size: 20px;
  min-width: 60px;
}
.content {
  font-size: 16px;
  letter-spacing: 1px;
  padding: 10px 50px;
}
.text-large {
  font-size: 26px;
}
::v-deep(.el-page-header__back) {
  display: none;
}
::v-deep(.el-divider--vertical) {
  border: 0;
}
.imageList {
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  .el-image {
    border-radius: 10px;
  }
}

.main {
  width: 90%;
  height: 400px;
}
.echart {
  position: absolute;
  top: 23px;
  right: 25px;
}
.about {
  margin-top: 20px;
  span {
    margin: 0 20px;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
}
.emoji {
  position: absolute;
  z-index: 1000;
  right: 10px;
  top: 118px;
  transform: scale(0);
  transition: all 0.3s;
  &.active {
    transform: scale(1);
  }
}
.user {
  display: flex;
  align-items: center;
}
.edit {
  cursor: pointer;
  &:hover {
    color: #3cbff5;
  }
}

::v-deep(.el-card__body) {
  overflow: visible !important;
}
::v-deep(.el-card) {
  overflow: visible !important;
}
::v-deep(.el-upload--picture-card) {
  border: none;
  background-color: transparent;
}
.nomore {
  width: 100%;
  text-align: center;
  font-size: 16px;
  color: #999;
  margin: 20px 0;
}
</style>
