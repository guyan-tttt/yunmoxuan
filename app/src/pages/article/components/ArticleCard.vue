<template>
    <view class="card">
        <view class="bg">
            <image
                class="image"
                :src="props.data.cover"
                mode="widthFix"
            />
        </view>
        <view class="top">
            <view class="name">{{ props.data.title }}</view>
            <view class="time">📆 {{ dayjs(props.data.createTime).format("YYYY/MM/DD") }}</view>
        </view>
        <view class="desc">{{ props.data.desc }}</view>
        <view class="info">
            <view class="left">
                <view class="like"><text class="iconfont icon-hongxin4"/>{{ props.data.likeNum }}
                </view>
                <view class="view"><text class="iconfont icon-yanjing1"/>{{ props.data.viewNum }}
                </view>
            </view>
            <view class="right">
                <image
                    class="image"
                    v-for="item in props.data.tags"
                    :key="item._id"
                    :src="item.icon"
                    mode="scaleToFill"
                />
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
        default() {
            return {}
        }
    }
})

</script>

<style lang="scss" scoped>
.card {
    width: 700rpx;
    position: relative;
    height: 250rpx;
    overflow: hidden;
    border-radius: 20rpx;
    .bg {
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        filter: blur(5px);
    }
    .top {
        width: 100%;
        padding-top: 40rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name {
            color: rgba(248,248,248,1);
            font-size: 20px;
            text-align: left;
            font-family: "微软雅黑";
            font-weight: 800;
            flex: 1;
            margin-left: 30rpx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .time {
            width: 200rpx;
            color: rgba(248,248,248,1);
            font-size: 13px;
            text-align: left;
            font-family: FZKai-bold;
        }
    }
    .desc {
        width: calc(100% - 100rpx);
        color: rgba(248,248,248,1);
        font-size: 36rpx;
        text-align: left;
        font-family: "楷体";
        margin-left: 30rpx;
        margin-top: 20rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 30rpx;
        margin-top: 20rpx;
        .right {
            flex: 1;
            text-align: right;
            padding-right: 60rpx;
            .image {
                width: 60rpx;
                height: 60rpx;
                margin-right: 10rpx;
            }
        }
        .left {
            width: 300rpx;
            display: flex;
            color: #fff;
            .like {
                color: rgba(248,248,248,1);
                font-size: 30rpx;
                text-align: left;
                font-family: FZKai-regular;
                .iconfont {
                    color: rgba(247,46,28,1);
                    margin-right: 10rpx;
                }
            }
            .view {
                color: rgba(248,248,248,1);
                font-size: 30rpx;
                text-align: left;
                font-family: FZKai-regular;
                .iconfont {
                    color: rgba(64,158,255,1);;
                    margin-right: 10rpx;
                }
            }
        }
    }
}

::v-deep(.bg .image) {
        width: 700rpx;
        }
</style>