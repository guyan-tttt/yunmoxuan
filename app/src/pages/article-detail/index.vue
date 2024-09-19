<template>
    <div class="article-detail" v-if="articleDetail?._id">
        <view class="img">
            <image
                v-if="articleDetail?.cover"
                :src="articleDetail?.cover"
                mode="widthFix"
            />
        </view>
        <view class="content">
            <view class="title">
                <view class="text">🌟{{ articleDetail.title }}
                </view>
                <view class="tag">{{ articleDetail.isOriginal ? "原创" : "转载"}}</view>
            </view>
            <view class="info">
                <view class="user"><text class="iconfont icon-geren"/>{{ articleDetail?.aboutInfo.author }}</view>
                <view class="date">📆 {{ dayjs(articleDetail.createTime).format("YYYY/MM/DD") }}</view>
            </view>
            <view class="about">
                <view class="list" v-if="articleDetail.aboutInfo.tags.length">
                    <view class="item" v-for="item  in articleDetail.aboutInfo.tags" :key="item?._id">
                        <image
                            :src="item?.icon"
                            mode="widthFix"
                        />
                        {{ item.name }}
                    </view>
                </view>
                <view class="category">📁 {{ articleDetail?.aboutInfo.category.name }}</view>
            </view>
            <view class="detail">
                <rich-text className="article-content" :nodes="articleContent" />
            </view>
            <view class="next-prev">
                <view v-if="prevAndNext.prev.length" @click="prev"><text class="icon-fanhui iconfont"/>上一篇</view>
                <view v-if="prevAndNext.next.length" @click="next">下一篇 <text class="iconfont icon-gengduo"/></view>
            </view>
        </view>
        <Comment :id="articleDetail._id"/>
    </div>

</template>

<script setup>
import dayjs from "dayjs"
import { onLoad } from "@dcloudio/uni-app"
import {getArticleDetailAPI } from "@/api/article"
import{ ref , computed} from "vue"
import Comment from "./components/Comment.vue"



// 当前文章详情
const articleDetail = ref()

// 文章内容
const articleContent = computed(() => {
    // 判断当前文章是否为空
    if(articleDetail.value) {
        return articleDetail.value.content.replace(/<img/g, "<img class='article-img'")
    }
    return ""
})


// 获取文章详情
const getArticleDetail = async (id) => {
    const res = await getArticleDetailAPI(id)
    if(res.code === 200) {
        articleDetail.value = res.data.detail
        prevAndNext.value.prev = res.data.prev
        prevAndNext.value.next = res.data.next
    }
}

// 上一页，下一页
const prevAndNext = ref({
    prev: {},
    next: {},
})

onLoad((options) => {
    getArticleDetail(options.id)
})

// 上一页
const prev = () => {
    uni.navigateTo({
        url: `/pages/article-detail/index?id=${prevAndNext.value.prev[0]._id}`
    })
}

// 下一页
const next = () => {
    uni.navigateTo({
        url: `/pages/article-detail/index?id=${prevAndNext.value.next[0]._id}`
    })
}
</script>

<style scoped lang="scss">

.article-detail {
  margin: 0 auto;
  margin-top: 20rpx;
  width: 700rpx;
  border-radius: 20rpx;
  background-color: rgba(255,255,255,1);
  box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.4);
  border: 1px solid rgba(187,187,187,1);
  display: flex;
  flex-direction: column;
  align-items: center;
  .img {
    image {
      width: 650rpx;
      border-radius: 20rpx;
      height: 300rpx;
      overflow: hidden;
      margin-top: 30rpx;
    }
  }
  .content {
    width: 650rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 56rpx;
    margin-top: 20rpx;
    margin-bottom: 40rpx;
    .title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      .text {
        width: 545rpx;
        color: #000;
        font-size: 38rpx;
        font-family: "楷体";
        font-weight: 700;
      }
      .tag {
        position: absolute;
        right: 0;
        top: 0;
        width: 100rpx;
        height: 42rpx;
        line-height: 34rpx;
        border-radius: 20rpx;
        background-color: rgba(64,158,255,1);
        color: rgba(255,255,255,1);
        font-size: 24rpx;
        text-align: center;
        box-shadow: 0px 4rpx 4rpx 0px rgba(0,0,0,0.4);
        font-family: Roboto;
      }
    }
    .info {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20rpx;
      .user {
        color: rgba(102,102,102,0.95);
        font-size: 28rpx;
        text-align: left;
        margin-left: 10rpx;
        display: flex;
        align-items: center;
        .iconfont {
          margin-right: 10rpx;
        }
      }
      .date {
        color: rgba(102,102,102,0.95);
        font-size: 26rpx;
        text-align: left;
      }
    }
    .about {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20rpx;
      .list {
        display: flex;
        gap: 10rpx;
        .item {
          display: flex;
            height: 17px;
            border-radius: 5px;
            background-color: rgba(64,158,255,0.45);
            border: 1px solid rgba(64,158,255,1);
            padding: 10rpx;
            color: rgba(255,255,255,1);
            font-size: 12px;
            text-align: left;
            font-family: FZKai-regular;
            image {
              width: 40rpx;
              margin-right: 10rpx;
            }
        }
      }
      .category {
      font-size: 30rpx;
      text-align: left;
      font-family: FZKai-regular;
      color: rgba(102,102,102,0.95);
      }
    }
    .detail {
      margin-top: 20rpx;
      width: 100%;
    }
    .next-prev {
     width: 100%;
     display: flex;
     justify-content: space-between;
     border-top: 1rpx solid #ececec;
     margin-top: 20rpx;
     padding-top: 20rpx;
    }
  }

}


::v-deep(.article-content) {
    color: #333;
    font-family: FZKai-regular;
  .ql-syntax {
    background: #21252b;
    color: #fff;
    border-radius: 10rpx;
    padding: 20rpx 0 0;
    font-size:30rpx;
    padding-left: 30rpx;
    padding-top: 70rpx;
    position: relative;
    overflow-x: auto;
    padding-bottom: 40rpx;
    margin: 10rpx 0;
    font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
    &::before {
      background: #fc625d;
      border-radius: 50%;
      box-shadow:
        40rpx 0 #fdbc40,
        80rpx 0 #35cd4b;
        content: " ";
        height: 20rpx;
        margin-top: 10rpx;
        position: absolute;
        width: 20rpx;
        top: 10rpx;
    }
  }
  .article-img {
    width: 100%;
    border-radius: 20rpx;
  }
}

</style>