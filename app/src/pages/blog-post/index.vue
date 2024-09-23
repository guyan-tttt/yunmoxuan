<template>
    <view class="blog-post">
        <scroll-view class="category" scroll-x>
            <uni-segmented-control :current="current"
                                   :values="items"
                                   @clickItem="onChange"
                                   styleType="button"
                                   activeColor="rgba(24,144,255,1)"
                                   inActiveColor="#fff" />
        </scroll-view>
        <view v-if="loading" style="margin-top: 50rpx;">
            <Loading/>
        </view>
        <view class="content" v-else>
            <view class="list" >
                <ArticleCard v-for="item in articleList" :key="item._id" :data="item" />
            </view>
        </view>
        <div class="more" >没有更多了</div>
    </view>
</template>

<script setup>
import { ref, onMounted} from "vue"
import ArticleCard from "../article/components/ArticleCard.vue"
import { searchArticleAPI } from "@/api/article"
import {onReachBottom, onPullDownRefresh, onLoad } from "@dcloudio/uni-app"
//@ts-ignore
import Loading from "@/components/loading/index.vue"


// 当前激活的索引
const current = ref(0)

// 分段器数组
const items = ref(["文章"])

// 搜索关键字
const keyword = ref("")

// 文章数据
const articleList = ref([])

// 获取文章数据
const getArticleList = async() => {
    const res = await searchArticleAPI(keyword.value)
    if(res.code === 200) {
        articleList.value = res.data
    }
}


// 文章加载
const loading = ref(false)

onLoad(async(options) => {
    keyword.value = options.keyword || ""
    console.log(options.keyword)
    loading.value = true
    await getArticleList()
    loading.value = false
})


onPullDownRefresh(async() => {

    articleList.value = []
    loading.value = true
    await getArticleList()
    loading.value = false
})

</script>

<style lang="scss" scoped>
.blog-post {
  .category {
      width: auto;
      .uni-segmented-control {
          width: 1000px;
          background-color: red;
      }
  }
  .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      gap: 20rpx;
      margin-top: 20rpx;
      margin-bottom: 20rpx;
      .list {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          gap: 20rpx;
          margin-top: 20rpx;
          margin-bottom: 20rpx;
          .category-tag {
              display: inline-block;
              width: 100rpx;
          }
      }
  }
  .more {
      width: 100%;
      height: 80rpx;
      display: flex;
      justify-content: center;
      align-items: center;
  }
}
</style>