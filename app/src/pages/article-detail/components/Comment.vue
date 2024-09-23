<template>
    <view
        class="comment"
    >
        <uni-collapse ref="collapse" >
            <uni-collapse-item title="评论区" class="comment-content">
                <view class="input">
                    <input v-model="addForm.nickname" type="text" placeholder="请输入昵称 ✨✨✨"/>
                    <textarea v-model="addForm.content" id="input" placeholder="请留下您的足迹~ ✨✨✨" cols="30" rows="8"></textarea>
                    <button class="btn" @click="addComment">添加评论</button>
                </view>
                <view class="content">
                    <view class="title">评论总数 <text>{{ pageData.total }}</text> 条</view>

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
import { ref, defineProps, onMounted } from "vue"
import { getArticleCommentAPI,addCommentAPI } from "@/api/article"
import dayjs from "dayjs"

const props = defineProps({
    id: {
        type: String,
        default: ""
    }
})

// 分页数据
const pageData = ref({
    page: 1,
    pageSize: 3,
    total: 0
})

// 评论列表
const commentList = ref([])

// 展开栏组件
const collapse = ref(null)

// 获取评论信息
const getComment = async() => {
    const res = await getArticleCommentAPI({
        id: props.id,
        page: pageData.value.page,
        pageSize: pageData.value.pageSize
    })
    if(res.code === 200) {
        commentList.value = commentList.value.concat(res.data)
        pageData.value.total = res.total
        if(commentList.value.length === 0) {
            moreText.value = "noMore"
        }
    }
}

const moreText = ref("more")

const more = async () => {
    // 判断是否加载完
    if(pageData.value.total > commentList.value.length) {
        moreText.value = "loading"
        pageData.value.page += 1
        await getComment()
        collapse.value.resize()
        moreText.value = "more"
    }
    if(pageData.value.total <= commentList.value.length) {
        moreText.value = "noMore"
    }
}

// 添加表单
const addForm = ref({
    content: "",
    address: "未知",
    nickname: "",
    articleID: props.id,
    time: ""
})

// 添加评论
const addComment = async() => {
    // 判断是否输入内容
    if(addForm.value.content === "") {
        uni.showToast({
            title: "请输入评论内容",
            icon: "error"
        })
        return
    }
    if(addForm.value.nickname === "") {
        uni.showToast({
            title: "请输入昵称",
            icon: "error"
        })
        return
    }

    addForm.value.time = dayjs(new Date()).format("YYYY-MM-DD HH:mm")
    const res = await addCommentAPI(addForm.value)
    if(res.code === 200) {
        uni.showToast({
            title: "评论成功",
            icon: "success"
        })
        addForm.value = {
            content: "",
            address: "未知",
            nickname: ""
        }
        pageData.value.page = 1
        commentList.value = []
        getComment()
    }
}

onMounted(() => {
    getComment()
})
</script>

<style lang="scss" scoped>
.comment {
    width: 650rpx;;
    margin: 0 auto;
    margin-bottom: 40rpx;
    ::v-deep(.comment-content) {
        display: flex;
        flex-direction: column;
        align-items: center;
        .input {
            width: 650rpx;
            display: flex;
            flex-direction: column;
            align-items: center;
            input {
                width: 600rpx;
                height: 60rpx;
                border: 1rpx solid #ececec;
                font-size: 30rpx;
                border-radius: 20rpx;
                padding:0  20rpx;
            }
            textarea {
                margin-top: 20rpx;
                width: 600rpx;
                font-size: 30rpx;
                border: 1rpx solid #ececec;
                border-radius: 20rpx;
                display: flex;
                padding:0  20rpx;
                padding-top: 20rpx;
            }
            .btn {
                width: 100%;
                background-color: rgba(64,158,255,1);
                color: #fff;
                margin-top: 20rpx;
            }
        }
        .content {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            // background-color: red;
            .title {
                width: 100%;
                font-size: 36rpx;
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

                .item {
                    width: 100%;
                    border-top: 1px solid #ececec;
                    padding-top: 10rpx;
                    padding-bottom: 20rpx;
                    margin: 0 10rpx;
                    .top  {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .name {
                            font-weight: 800;
                            font-size: 36rpx;
                            font-family: "楷体";

                        }
                        .date {
                            color: #999;
                        }
                    }
                    .desc {
                        margin-top: 20rpx;
                        color: #666;
                    }
                }
            }
        }
    }

}
</style>