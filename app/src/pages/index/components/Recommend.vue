<template>
    <view class="recommend">
        <view class="title">
            <view class="left">
                <view class="line"/>
                <text>推荐文章</text>
            </view>
            <navigator class="right" url="/pages/blog-post/index">更多 <text class="iconfont icon-gengduo"/></navigator>
        </view>
        <view v-if="loading" style="margin-top: 50rpx;">
            <Loading />
        </view>
        <view class="list" v-else>
            <RecommendCard v-for="i in recommendArticle" :key="i.id" :data="i" />
        </view>
    </view>
</template>

<script setup>
import RecommendCard from "./RecommendCard.vue"
import { getRecommendArticleAPI } from "@/api/article"
import { onMounted , ref } from "vue"
import Loading from "@/components/LoadingCard/index.vue"


// 推荐文章
const recommendArticle = ref([])

// 获取推荐推荐文章
const getRecommendArticle = async() => {
    loading.value = true
    const res = await getRecommendArticleAPI()
    // console.log(res)
    if(res.code === 200) {
        recommendArticle.value = res.data
        loading.value = false
    }
}

// 文章加载
const loading = ref(false)
onMounted(() => {
    getRecommendArticle()
})
</script>

<style lang="scss" scoped>
.recommend {
    width: 700rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    // margin-top: 20rpx;
    .title {
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
        .right {
            line-height: 22px;
            color: rgba(107,107,107,1);
            font-size: 16px;
            text-align: left;
            font-family: PingFangSC-regular;
        }
    }
    .list {
        margin-top: 30rpx;
        width: 100%;
        display: flex;
        justify-content: space-between;
        gap: 20rpx;
        flex-wrap: wrap;
    }
}
</style>