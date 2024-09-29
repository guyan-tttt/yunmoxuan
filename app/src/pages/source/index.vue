<template>
    <div class="source">
        <div class="bg">
            <image
                src="../../static/source/picture-bg.jpeg"
                mode="widthFix"
            />
        </div>
        <div class="content">
            <swiper
                scroll-x
            >
                <swiper-item v-for="item in sourceList"
                             :key="item._id">
                    <scroll-view class="
                             item"
                                 scroll-y>
                        <div class="info">
                            <image class="icon" :src="item.logo" mode="aspectFill"/>
                            <div class="title">{{ item.name }}</div>
                            <div class="desc">————{{ item.desc }}</div>
                        </div>
                        <div class="list">
                            <SourceCard  type="web" v-for="i in item.source" :key="i._id" :data="i" />
                        </div>
                    </scroll-view>
                </swiper-item>
            </swiper>
        </div>

    </div>
</template>

<script setup>
import SourceCard from "./components/SourceCard.vue"
import { ref , onMounted} from "vue"
import { getSourceListAPI } from "@/api/source"


// 资源列表
const sourceList = ref([])

// 获取资源列表
const getSourceList = async() => {
    const res = await getSourceListAPI()
    console.log(res.data[0].source)
    if(res.code === 200) {
        sourceList.value = res.data
    }
}

onMounted(() => {
    getSourceList()

})
</script>

<style scoped lang="scss">
.source {
    width: 700rpx;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 80rpx;
    .bg {
        width: 100%;
        image {
            width: 100%;
            border-radius: 0 0 20rpx 20rpx;
            box-shadow: 0 0 10rpx #000;
        }
    }
    .content {
        width: 100%;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        border-radius: 20rpx;
        box-shadow: 0 10rpx 20prx #000;
        margin-top: 20rpx;
        .header  {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .item {
            width: 100%;
            margin: 20rpx 0;
            padding: 0 20rpx;
            margin-bottom: 40rpx;
            .list {
                display: flex;
                flex-wrap: wrap;
                gap: 40rpx;
            }
            .info {
                display: flex;
                align-items: center;
                padding-left: 10rpx;
                margin: 20rpx 0;
                position: relative;

                &::after {
                    content: "";
                    width: 10rpx;
                    height: 80rpx;
                    background-color: #699ff0;
                    position: absolute;
                    left: -10rpx;
                    top: 10rpx;
                    border-radius: 30rpx;
                }
            .title {
                font-size: 30rpx;
                margin-left: 5rpx;
            }
            .icon {
                margin-right: 10rpx;
                box-shadow: 0 0 10rpx #699ff0;
                width: 100rpx;
                height: 100rpx;
                border-radius: 50%;
            }
            .desc {
                font-size: 26rpx;
                color: #999;
                max-width: 300rpx;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            }
        }

    }
}


scroll-view {
    height: calc(100vh - 350rpx);
    margin-bottom: 40rpx;
}
</style>