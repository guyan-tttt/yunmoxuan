<template>
    <div class="animation">
        <uni-swipe-action class="list">
            <!-- 基础用法 -->
            <uni-swipe-action-item  v-for="item in animationList"
                                    :key="item._id"
                                    @click="onClick"
                                    @change="change">
                <AnimationCard :data="item" />
                <template #right>
                    <text @click="goDetail(item._id)" class="iconfont icon-xiangce"/>
                </template>
            </uni-swipe-action-item>
        </uni-swipe-action>


    </div>
</template>

<script setup>
import AnimationCard from "./components/AnimationCard.vue"
import { getAnimationListAPI } from "@/api/animation"
import { ref , onMounted } from "vue"
import { onReachBottom } from "@dcloudio/uni-app"

// 分页参数
const pageData = ref({
    page: 1,
    pageSize: 10,
    total: 0
})

// 动漫列表
const animationList = ref([])

// 获取动漫列表
const getAnimationList = async () => {
    const res = await getAnimationListAPI(pageData.value.page, pageData.value.pageSize)
    console.log(res)
    if(res.code === 200) {
        animationList.value = animationList.value.concat(res.data)
        pageData.value.total = res.total
    }
}

onMounted(() => {
    getAnimationList()
})

onReachBottom(() => {
    if(pageData.value.total > animationList.value.length) {
        pageData.value.page++
        getAnimationList()
    } else {
        uni.showToast({
            title: "没有更多了",
            icon: "none"
        })
    }
})

// 跳转详情页
const goDetail = (id) => {
    uni.navigateTo({
        url: `/subPackages/animation-detail/index?id=${id}`
    })
}
</script>

<style scoped lang="scss">
.animation {
    width: 700rpx;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 100rpx;
    ::v-deep(.list) {
        width: 100%;
        margin-top: 20rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20rpx;
        .iconfont {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 100rpx;
            margin-left: 20rpx;
            color: #409eff;
            margin-right: 20rpx;
        }
    }
}
</style>