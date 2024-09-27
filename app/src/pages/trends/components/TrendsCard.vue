<template>
    <view class="item-card">
        <view class="date">⌛ {{ dayjs(props.data.createTime ).format("YYYY-MM-DD")}}</view>
        <view class="desc">{{ props.data?.content }}</view>
        <view class="imgs">
            <view class="img" v-for="(item,index) in props.data.imgList" :key="item">
                <image
                    :style="imgOption"
                    :src="item"
                    :mode="imgOption.mode"
                    @click="preview(index)"
                    @longpress="longPress(item)"
                />
            </view>
        </view>
        <view class="about">
            <view class="like"><text class="iconfont icon-hongxin4"/>{{ props.data.likeNum }}</view>
            <view class="comment"><text class="iconfont icon-liuyan"/>{{ props.data.commentNum }}</view>
        </view>
        <uni-collapse @change="collapseChange" ref="collapse">
            <uni-collapse-item title="评论区"  class="comment-content">
                <view class="content">
                    <view class="title">评论总数 <text>{{ commentPage.total }}</text> 条</view>

                    <view class="list">
                        <view class="item" v-for="item in commentList" :key="item._id">
                            <view class="top">
                                <view class="name">😀{{ item.nickname }}</view>
                                <view class="date">{{ dayjs(item.createTime).format("YYYY-MM-DD") }}</view>
                            </view>
                            <view class="desc">{{ item.content }}</view>
                        </view>
                    </view>
                    <uni-load-more @clickLoadMore="more" :contentText="{contentdown: '点击加载更多',contentrefresh: '正在加载...',contentnomore: '没有更多数据了'}" :status="moreText"/>
                </view>
            </uni-collapse-item>
        </uni-collapse>

    </view>
</template>

<script setup>
import { ref, computed, defineProps, nextTick } from "vue"
import dayjs from "dayjs"
import {getTrendsCommentListAPI } from "@/api/trends"
import { showActions } from "@/utils/downloadImage"

const collapse = ref(null)

const props = defineProps({
    data: Object,
})
// 当前动态图片数量
const imgNum = ref(props.data.imgList.length)

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

// 打开评论框

const collapseChange = async (e) => {
    // 判断是否是打开
    if(e.length > 0) {
        // 获取评论列表()
        if(commentList.value.length > 0) {
            return
        }
        commentPage.value.page = 1
        await getTrendsCommentList()
    }
}

// 评论分页数据
const commentPage = ref({
    page: 1,
    pageSize: 5,
    total: 0,
})
// 获取评论
const getTrendsCommentList = async () => {
    const res = await getTrendsCommentListAPI({
        trendsID: props.data._id,
        page: commentPage.value.page,
        pageSize: commentPage.value.pageSize,
    })
    if(res.code === 200) {
        commentList.value = res.data
        commentPage.value.total = res.total
        nextTick(() => {
            collapse.value.resize()
        })
    }
}
const moreText = ref("more")

// 当前评论列表
const commentList = ref([])

const more = async() => {
    moreText.value = "loading"
    if(commentList.value.length < commentPage.value.total) {
        commentPage.value.page++
        await getTrendsCommentList()
        moreText.value = "more"
    } else {
        moreText.value = "noMore"
    }
}


// 图片预览
const preview = (index) => {

    // #ifdef APP
    uni.previewImage({
        urls: props.data.imgList,
        current:index
    })
    // #endif

    // #ifdef MP-ALIPAY
    my.previewImage({
        urls: props.data.imgList,
        current:index,
        enableSavePhoto: true,
        enableShowPhotoDownload: true
    })
    // #endif
}

// 长按显示操作
const longPress = (url) => {
    showActions(url)
}


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