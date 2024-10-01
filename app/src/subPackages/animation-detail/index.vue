<template>
    <div class="animation-detail">
        <view class="header" :style="{backgroundImage: `url(${animationDetail.cover})`}">
            <view class="top">
                <view class="name">{{ animationDetail.name }}</view>
                <view class="score">{{animationDetail.score}}分</view>
            </view>
            <view class="center">
                <view class="hot">{{animationDetail.hot}}🔥</view>
                <view class="link">播放平台</view>
            </view>
            <view class="bottom">
                <view class="type"><uni-tag :text="animationDetail.type" type="success" /></view>

            </view>
            <view class="rask">备注🔖
                <text class="card_subtitle" v-if="animationDetail?.status === 0">自{{animationDetail?.remark }}起停更</text>
                <text class="card_subtitle"
                      v-if="animationDetail?.status === 1"
                >自{{ animationDetail?.remark }}起VIP用户每周{{ dateList[new Date(animationDetail?.remark).getDay()] }}10点更新1集</text
                >
                <text class="card_subtitle" v-if="animationDetail?.status === 2">至{{ animationDetail?.remark }}完结</text>
            </view>
            <view class="desc">{{ animationDetail.desc }}</view>
        </view>
        <view class="content">
            <view class="list">
                <view class="item" @click="preview(index)" v-for="(item,index) in animationImgList" :key="item._id">
                    <Loading v-if="item.loading"/>
                    <image
                        :style="{opacity: item.loading ? 0 : 1}"
                        @load="loadingComplete(item)"
                        :src="item.src"
                        mode="widthFix"
                        lazy-load
                        @longpress="showActions(item.src)"
                    />
                </view>


            </view>
        </view>
    </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { onLoad , onReachBottom } from "@dcloudio/uni-app"
import { getAnimationDetailAPI, getAnimationImgListAPI } from "@/api/animation.js"
import Loading from "../components/Loading.vue"
import { showActions } from "@/utils/downloadImage"

const dateList = ["日", "一", "二", "三", "四", "五", "六"]

// 动漫id
const animationId = ref("")

// 动漫详情
const animationDetail = ref({})

// 获取动漫详情
const getAnimationDetail = async () => {
    const res = await getAnimationDetailAPI(animationId.value)
    if(res.code === 200) {
        animationDetail.value = res.data
    }
}

// 分页参数
const pageData = ref({
    page: 1,
    pageSize: 10,
    total: 0
})

// 图片列表
const animationImgList = ref([])

// 获取动漫图片片列表
const getAnimationImageList = async () => {
    const res = await getAnimationImgListAPI({
        id: animationId.value,
        page: pageData.value.page,
        pageSize: pageData.value.pageSize,
    })
    if(res.code === 200) {
        res.data.forEach((item) => {
            item.loading = true
        })
        animationImgList.value = animationImgList.value.concat(res.data)
        pageData.value.total = res.total
    }
}
onLoad((options) => {
    if(options.id) {
        animationId.value = options.id
        getAnimationDetail()
        getAnimationImageList()
    }
})

// 图片资源加载完成
const loadingComplete = (item) => {
    item.loading = false
}

const imgList = computed(() => {
    return animationImgList.value.map((item) => item.src)
})
// 点击预览
const preview = (index) => {
    uni.previewImage({
        urls: imgList.value ,
        current: index,
    })
}

onReachBottom(() => {
    if(animationImgList.value.length < pageData.value.total) {
        pageData.value.page += 1
        getAnimationImageList()
    } else {
        uni.showToast({
            title: "没有更多了",
            icon: "none"
        })
    }
})

</script>

<style scoped lang="scss">
.animation-detail {
  width: 700rpx;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  .header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-size: cover;
    background-position: center;
    border-radius: 20rpx;
    box-sizing: border-box;
    padding: 20rpx;
    border: 10rpx solid #fff;
    margin-top: 20rpx;
    box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.4);
    .top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 20rpx 40rpx;
      margin-bottom: 20rpx;
      .name {
        font-size: 60rpx;
        font-weight: 700;
        color: #fff;
        text-shadow: 0 0 20rpx rgba(0, 0, 0, .5);
        font-family: "楷体_GB2312";
      }
      .score {
        font-size: 40rpx;
        color: #fff;
        text-shadow: 0 0 20rpx rgba(0, 0, 0, .5);
      }
    }
    .center  {
      width: 100%;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 20rpx 40rpx;
      .hot {
        font-size: 36rpx;
        color: #fff;
        text-shadow: 0 0 20rpx rgba(0, 0, 0, .5);
      }
      .link {
        font-size: 36rpx;
        color: #fff;
        text-shadow: 0 0 20rpx rgba(0, 0, 0, .5);
      }
    }
    .bottom {
      width: 100%;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 20rpx 40rpx;
      .type {
        font-size: 36rpx;
        color: #fff;
        text-shadow: 0 0 20rpx rgba(0, 0, 0, .5);
      }

    }
    .rask {
      box-sizing: border-box;
      padding: 20rpx 40rpx;
        font-size: 24rpx;
        color: #fff;
        text-shadow: 0 0 20rpx rgba(0, 0, 0, .5);
      }
    .desc {
      width: 100%;
      padding: 20rpx;
      font-size: 28rpx;
      color: #fff;
      text-shadow: 0 0 20rpx rgba(0, 0, 0, .5);
    }
  }
  .content {
    width: 100%;
    .list {
      width: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20rpx;
      margin-bottom: 40rpx;
      margin-top: 20rpx;
      .item {
        width:  calc(100% - 60rpx);
        border: 30rpx solid #fff;
        border-radius: 20rpx;
        box-shadow: 0 0 10rpx #ccc;
        transition: all .3s;
        image {
          width:100%;
          border-radius: 20rpx;

        }
      }
    }
  }
}
</style>