<template>
    <div class="trends">
        <view class="bg">
            <image
                class="image"
                src="../../static/trends/bg.jpg"
                mode="widthFix"
            />
            <view class="user">
                <image class="avatar" src="https://jeek-space-blog.top:3000/images/user/8e9bab04192dea62e77cb066e6c3c7d3.jpeg" model="widthFix"/>
                <view class="name">顾言</view>
            </view>
        </view>
        <view class="content">
            <view class="list">
                <TrendsCard v-for="item in trendsList" :key="item._id" :data="item"/>
            </view>
        </view>
    </div>
</template>

<script setup>
import TrendsCard from "./components/TrendsCard.vue"
import { ref, onMounted } from "vue"
import { getTrendsListAPI } from "@/api/trends.js"
import { onReachBottom } from "@dcloudio/uni-app"

// 分页参数
const pageData = ref({
    page: 1,
    pageSize: 5,
    total: 0,
})

// 动态列表
const trendsList = ref([])

// 获取动态列表
const getTrendsList = async () => {
    uni.showLoading()
    const res = await getTrendsListAPI(pageData.value.page, pageData.value.pageSize)
    if(res.code === 200) {
        trendsList.value = trendsList.value.concat(res.data)
        pageData.value.total = res.total
    }
    uni.hideLoading()
}

onMounted(() => {
    getTrendsList()
})

onReachBottom(() => {
    if(trendsList.value.length < pageData.value.total) {
        pageData.value.page++
        getTrendsList()
    } else {
        uni.showToast({
            title: "没有更多数据了",
            icon: "none"
        })
    }
})
</script>

<style scoped lang="scss">
.trends {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .bg {
        position: relative;

        .image {
            width: 100%;
            border-radius:0 0 40rpx  40rpx;
            box-shadow: 0 10rpx 10rpx #ccc;
        }
        .user {
            position: absolute;
            display: flex;
            bottom: -50rpx;
            left: 70rpx;
            z-index: 100;
            image {
                width: 150rpx;
                height: 150rpx;
                border-radius: 50%;
                border: 10rpx solid #fff;
                box-shadow: 0 10rpx 10rpx #ccc;
            }
            .name {
                margin-left: 20rpx;
                color: #fff;
                font-size: 50rpx;
                font-weight: 700;
                margin-top: 40rpx;
            }
        }
    }
    .content {
        width: 700rpx;
        background-color: #fff;
        margin-top: 40rpx;
        box-shadow: 0 10rpx 10rpx #ccc;
        border-radius: 40rpx;
        position: relative;
        padding-bottom: 40rpx;
        >::before {
            content: "";
            position: absolute;
            width: 160rpx;
            height: 160rpx;
            top: 0;
            left: 0;
            background-color: #f8f8f8;
            border-radius: 50%;
            left: 48rpx;
            top: -115rpx;
        }
        .list {
            width: 100%;
            margin-top: 80rpx;
            gap: 40rpx;
            display: flex;
            flex-direction: column;
            align-items: center;

        }


    }
}

</style>