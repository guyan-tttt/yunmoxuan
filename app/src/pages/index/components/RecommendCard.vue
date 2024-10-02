<template>
    <view class="card" @click="goToDetail">
        <view class="top">
            <image
                :src="props.data.cover"
                mode="widthFix"
            />
            <view class="date">{{ dayjs(props.data.createTime).format("YYYY/MM/DD") }}</view>
            <view class="view">
                <text class="iconfont icon-yanjing"/>
                {{ props.data.viewNum }}
            </view>
        </view>
        <view class="bottom">
            <div class="title">
                <text class="name">{{ props.data.title }}</text>
            </div>
            <view class="desc">{{ props.data.desc }}</view>
            <view class="info">
                <view class="like"><text class="iconfont icon-hongxin4"/>{{ props.data.likeNum }}</view>
                <view class="tags">
                    <image v-for="item in props.data.tags" :key="item.id" :src="item.icon" mode="widthFix" />
                </view>
            </view>
        </view>
    </view>

</template>

<script setup>
import { defineProps } from "vue"
import dayjs from "dayjs"
const props = defineProps({
    data: {
        type: Object,
    }
})

// 跳转到详情页
const goToDetail = () => {
    uni.navigateTo({
        url: `/pages/article-detail/index?id=${props.data._id}`
    })
}
</script>

<style lang="scss" scoped>
.card {
    width: 330rpx;
    height: 214px;
    border-radius: 14px;
    background-color: rgba(255,255,255,1);
    border: 1px solid rgba(187,187,187,1);
    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        width: 100%;
        overflow: hidden;
        .date {
            position: absolute;
            left: 29rpx;
            top: 10rpx;
            color: rgba(248,248,248,1);
            font-size: 12px;
            text-align: left;
            font-family: FZKai-bold;
        }
        .view {
            position: absolute;
            right: 19rpx;
            top: 10rpx;
            color: #fff;
            font-size: 12px;
            text-align: left;
            font-family: FZKai-regular;
            .iconfont {
                font-size: 16px;
            }
        }
        image {
            width: 100%;
            height: 102.59px;
            border-radius: 16px 16px 0px 0px;
            background-color: #fff;
        }
        &::after {
            content: "";
            position: absolute;
            // background-color: red;
            border-top: 200rpx solid transparent;
            border-bottom: 200rpx solid transparent;
            border-left: 200rpx solid transparent;
            border-right: 200rpx solid rgba(255,255,255,1);
            transform: rotate(-60deg);
            left: -200rpx;
            top: 120rpx;
        }
        &::before {
            content: "";
            position: absolute;
            // background-color: red;
            border-top: 200rpx solid transparent;
            border-bottom: 200rpx solid transparent;
            border-left: 200rpx solid rgba(255,255,255,1);
            border-right: 200rpx solid transparent;
            transform: rotate(60deg);
            right: -200rpx;
            top: 120rpx;
        }
    }
    .bottom {
        padding: 20rpx;
        display: flex;
        background-color: #fff;
        flex-direction: column;
        align-items: center;
        position: relative;
        &::before {
            content: "";
            width: 100%;
            height: 4px;
            background-color: #fff;
            position: absolute;
            top: -5rpx;
        }
        .title {
            width: 100%;
            display: flex;
            align-items: center;
            .name {
                color: rgba(16,16,16,1);
                font-size: 30rpx;
                text-align: left;
                font-family: FZKai-bold;
                font-weight: 800;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

            }
            .category {
                width: 140rpx;
                height: 40rpx;
                border-radius: 20rpx;
                background-color: rgba(255,255,255,1);
                border: 2rpx solid rgba(187,187,187,1);
                color: rgba(51,51,51,1);
                font-size: 24rpx;
                line-height: 40rpx;
                text-align: center;
                font-family: FZKai-regular;
                transform: scale(0.7);
            }
        }
        .desc {
            width: 100%;
            color: rgba(51,51,51,1);
            font-size: 12px;
            font-family: "楷体";
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-top: 10rpx;
        }
        .info {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-top: 20rpx;
            .like {
                display: flex;
                align-items: center;
                .iconfont {
                    color: rgba(247,46,28,1);
                    margin-right: 10rpx;
                }
                color: rgba(51,51,51,1);
                font-size: 12px;
                text-align: left;
                font-family: "楷体";
            }
            .tags {
                display: flex;
                image {
                    width: 48rpx;
                    height: 48rpx;
                }

            }
        }
    }
}
</style>