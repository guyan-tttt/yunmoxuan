<template>
    <view class="article">
        <view class="title">
            <view class="left">
                <view class="line"/>
                <text>博文分类</text>
            </view>
        </view>
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
            <view class="list" v-if="current === 0">
                <ArticleCard v-for="item in articleList" :key="item._id" :data="item" />
            </view>
            <view class="list" v-if="current === 1">
                <uni-card style="width: 100%" v-for="item in categoryList" :key="item._id" :title="item.name" extra="分类信息">
                    <text class="uni-body">{{ item.desc }}</text>
                </uni-card>
            </view>
            <view class="list tag" v-if="current === 2">
                <uni-card class="item"
                          v-for="item in tagList"
                          :key="item._id"
                          :title="item.name"
                          :isFull="true"
                          extra="标签"
                          :thumbnail="item.icon">
                    <rich-text class="uni-body" :nodes="item.desc"/>
                </uni-card>
            </view>
        </view>
        <div class="more" v-if="pageData.total > articleList.length">加载中...</div>
        <div class="more" v-else>没有更多了</div>
    </view>
</template>

<script setup>
import { ref, onMounted} from "vue"
import ArticleCard from "./ArticleCard"
import { getArticleListAPI } from "@/api/article"
import {onReachBottom, onPullDownRefresh } from "@dcloudio/uni-app"
//@ts-ignore
import Loading from "@/components/loading/index.vue"
import { getCategoryListAPI,getTagListAPI } from "@/api/category"


// 当前激活的索引
const current = ref(0)

// 分段器数组
const items = ref(["文章","分类","标签"])

// 分页数据
const pageData = ref({
    page: 1,
    size: 5,
    total: 0
})

// 文章数据
const articleList = ref([])

// 获取文章数据
const getArticleList = async() => {
    const res = await getArticleListAPI(pageData.value.page,pageData.value.size)
    if(res.code === 200) {
        articleList.value = articleList.value.concat(res.data)
        pageData.value.total = res.total
    }
}

// 触底加载
const loadingMore = () => {
    if(pageData.value.total > articleList.value.length) {
        pageData.value.page++
        getArticleList()
    }
}

// 文章加载
const loading = ref(false)

// 切换分类
const onChange = (e) => {
    current.value = e.currentIndex
}

// 分类列表
const categoryList = ref([])

// 获取分类
const getCategory = async() => {
    const res = await getCategoryListAPI()
    if(res.code === 200) {
        categoryList.value = res.data
    }
}

// 标签列表
const tagList = ref([])

// 获取标签
const getTag = async() => {
    const res = await getTagListAPI()
    if(res.code === 200) {
        tagList.value = res.data
    }
}

onMounted(async() => {
    loading.value = true
    await getArticleList()
    loading.value = false
    getCategory()
    getTag()
})

onReachBottom(() => {
    loadingMore()
})

onPullDownRefresh(async() => {
    pageData.value = {
        page: 1,
        size: 5,
        total: 0
    }
    articleList.value = []
    loading.value = true
    await getArticleList()
    loading.value = false
})
</script>

<style lang="scss" scoped>
.article {
    .title {
        margin-top: 20rpx;
        margin-bottom: 20rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        .left {
            display: flex;
            align-items: center;
            gap: 20rpx;
            text {
                line-height: 56rpx;
                color: rgb(79,79,79);
                font-size: 40rpx;
                text-align: left;
                font-family: PingFangSC-bold;
                font-weight: bold;
            }
            .line {
                width: 12rpx;
                height:42rpx;
                line-height: 52rpx;
                border-radius: 26rpx;
                background-color: rgba(24,144,255,1);
                color: rgba(16,16,16,1);
            }
        }
    }
    .category {
        width: auto;
        .uni-segmented-control {
            width: 1000px;
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