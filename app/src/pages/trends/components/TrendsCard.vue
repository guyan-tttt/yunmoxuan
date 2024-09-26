<template>
    <view class="item-card">
        <view class="date">⌛ 2024/07/07</view>
        <view class="desc">xaxnoaxax</view>
        <view class="imgs">
            <view class="img" v-for="item in imgNum" :key="item">
                <image
                    :style="imgOption"
                    src="https://jeek-space-blog.top:3000/images/trends/fa7642429ae7e97d78ba3387211fb456.jpeg"
                    :mode="imgOption.mode"
                />
            </view>
        </view>
        <view class="about">
            <view class="like"><text class="iconfont icon-hongxin4"/>121</view>
            <view class="comment"><text class="iconfont icon-liuyan"/>32</view>
        </view>
        <uni-collapse>
            <uni-collapse-item title="评论区"  class="comment-content">
                <view class="content">
                    <view class="title">评论总数 <text>54</text> 条</view>

                    <view class="list">
                        <view class="item" v-for="item in 5" :key="item">
                            <view class="top">
                                <view class="name">😀顾言</view>
                                <view class="date">2024-09-09</view>
                            </view>
                            <view class="desc">过分二哥二哥</view>
                        </view>
                    </view>

                </view>
            </uni-collapse-item>
        </uni-collapse>

    </view>
</template>

<script setup>
import { ref, computed } from "vue"

// 当前动态图片数量
const imgNum = ref(1)

// 当前动态图片排列
const imgOption = computed(() => {
    if(imgNum.value === 1) {
        return {
            width: "100%",
            height: "100%",
            mode: "widthFix",
        }
    } else if (imgNum.value === 2) {
        return {
            width: "280rpx",
            height: "200rpx",
            mode: "aspectFill",
        }
    }
    return {
        width: "180rpx",
        height: "180rpx",
        mode: "aspectFill",
    }

})

const collapse = ref(null)
</script>

<style lang="scss" scoped>
.item-card {
    width: 600rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 20rpx;
    .date {
        width: 100%;
        font-size: 30rpx;
        color: #999;
    }
    .desc {
        width: 100%;
        font-size: 40rpx;
        margin-top: 20rpx;
    }
    .imgs {
        width: 100%;
        margin-top: 20rpx;
        display: flex;
        gap: 30rpx;
        flex-wrap: wrap;
        image {
            border-radius: 10rpx;
        }
    }
    .about {
            width: 100%;
            margin-top: 10rpx;
            border-top: 1rpx solid #eee;
            display: flex;
            align-items: center;
            gap: 20rpx;
            padding: 20rpx 0;
            border-bottom: 1rpx solid #eee;
            .like {
                    font-size: 30rpx;
                    .iconfont {
                        font-size: 40rpx;
                        margin-right: 10rpx;
                        color: #ff0000;
                    }
                }
            >.comment {
                font-size: 30rpx;
                color: #999;
                .iconfont {
                        font-size: 40rpx;
                        margin-right: 10rpx;
                        color:  rgba(24,144,255,1)
                }
            }

        }
    ::v-deep(.comment-content) {
        display: flex;
        flex-direction: column;
        align-items: center;
        .content {
            width: 600rpx;
            display: flex;
            flex-direction: column;
            align-items: center;
            .title {
                width: 100%;
                font-size: 30rpx;
                color: #666;
                margin-top: 20rpx;
                text {
                    font-weight: 700;
                    color: rgba(64,158,255,1);
                }
            }
            .list {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding-top: 20rpx;

                >.item {
                    width: 100%;
                    border-top: 1px solid #ececec;
                    padding-top: 10rpx;
                    padding-bottom: 20rpx;
                    margin: 0 10rpx;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    >.top  {
                        margin: 0;
                        padding: 0;
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 24rpx;
                        >.name {
                            margin: 0;
                            padding: 0;
                            flex: 1;
                            font-weight: 800;
                            font-size: 30rpx;
                        }
                        >.date {
                            margin: 0;
                            padding: 0;
                            flex: 1;
                            color: #999;
                        }
                    }
                    >.desc {
                        margin-top: 20rpx;
                        color: #666;
                        font-size: 24rpx;
                    }
                }
            }
        }
    }

}


</style>