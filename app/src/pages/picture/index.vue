<template>
    <div class="picture">
        <LoadingCard v-if="loading"/>
        <view class="list" v-else>
            <navigator :url="`/subPackages/picture-list/index?id=${item._id}`"
                       class="item"
                       v-for="item in pictureCategory"
                       :key="item._id"
                       :style="{
                           backgroundImage: `url(${item.cover})`
                       }">
                <view class="title">{{ item.name }}</view>
                <view class="line"/>
                <view class="desc">{{ item.desc }}</view>
            </navigator>
        </view>
    </div>
</template>

<script setup>
import { getPictureCategoryAPI } from "@/api/picture"
import { onMounted, ref } from "vue"
import LoadingCard from "@/components/LoadingCard/index.vue"

// 图片分类列表
const pictureCategory = ref([])

// 获取分类列表
const getPictureCategory = async () => {
    loading.value = true
    const res = await getPictureCategoryAPI()
    if(res.code === 200) {
        pictureCategory.value = res.data
        loading.value = false
    }
}

// 页面加载
const loading = ref(true)

onMounted(() => {
    getPictureCategory()
})

</script>

<style scoped lang="scss">

.picture {
    width: 700rpx;
    margin: 0 auto;
    margin-bottom: 100rpx;
    .list {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 20rpx;
        margin-top: 20rpx;
        .item {
            width: 620rpx;
            height: 400rpx;
            border-radius: 10px;
            transition: all 0.3s;
            font-family: "楷体";
            padding: 0 40rpx;
            box-shadow: 0 10rpx 10rpx #ccc;
            &:nth-child(1) {
                margin-top: 20rpx;
            }
            background-position: center;
            background-size: cover;
            .title {
                color: #fff;
                font-weight: 700;
                text-align: left;
                width: 100%;
                overflow: hidden;
                font-size: 60rpx;
                margin-top: 30rpx;
            }
            .line {
                height: 6rpx;
                width: 100%;
                background-color: #fff;
                border-radius: 20rpx;
                margin-top: 20rpx;
                margin-bottom: 20rpx;
            }
            .desc {
                width: 100%;
                color: #fff;
                font-size: 40rpx;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
}
}
</style>