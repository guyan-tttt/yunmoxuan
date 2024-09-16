<template>
    <view class="banner">
        <swiper class="swiper"
                v-if="banner.length > 0"
                circular
                indicator-dots
                autoplay
                :interval="3000"
                indicator-active-color="#fff"
        >
            <swiper-item v-for="item in banner" :key="item._id">
                <image
                    :src="item.src"
                    mode="aspectFill"
                />
            </swiper-item>

        </swiper>
        <Loading class="swiper" v-else/>
    </view>
</template>

<script setup>
import { getBannerAPI } from "@/api/index"
import { ref, onMounted } from "vue"
import Loading from "@/components/loading/index.vue"

// 轮播图
const banner = ref([])

// 获取轮播图
const getBanner = async() => {
    const res = await getBannerAPI()
    if(res.code === 200) {
        banner.value = res.data
    }
}

onMounted(() => {
    getBanner()
})
</script>

<style lang="scss" scoped>
.banner {
    margin: 0 auto !important;
    width: 100%;
    display: flex;
    justify-content: center;
    .swiper {
        width: 100%;
        height: 340rpx;
        border-radius: 34rpx;
        background-color: rgba(229,229,229,1);
        .swiper-item {
            width: 100%;
            height: 340rpx;
            border-radius: 34rpx;
            image  {
                width: 100%;
            }
        }
    }
}

::v-deep(.swiper image) {
    width: 100%;
    height: 340rpx;
    border-radius: 34rpx;
}
</style>