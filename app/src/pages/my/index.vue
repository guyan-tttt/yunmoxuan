<template>
    <view class="my">
        <view class="header">
            <view class="left">
                <image
                    :src="userStore.userInfo?.avatar"
                    mode="aspectFill"
                />
            </view>
            <view class="info">
                <view class="name">🥺{{ userStore.userInfo.nickname }}<text class="iconfont icon-nan"/></view>
                <view class="phone">📱{{ userStore.userInfo.phone }}</view>
            </view>
            <view class="setting">
                <text class="iconfont icon-shezhi"/>
            </view>
        </view>
        <view class="content">
            <view class="list">
                <view class="item" >
                    <text class="icon iconfont icon-xiangce"/>
                    <text class="name">个人相册</text>
                    <text class="right iconfont icon-gengduo"/>
                </view>
                <view class="item" >
                    <text class="icon iconfont icon-biaoqian"/>
                    <text class="name">标签列表</text>
                    <text class="right iconfont icon-gengduo"/>
                </view>
                <view class="item" >
                    <text class="icon iconfont icon-7"/>
                    <text class="name">关于我的</text>
                    <text class="right iconfont icon-gengduo"/>
                </view>
                <view class="item" >
                    <text class="icon iconfont icon-shezhi"/>
                    <text class="name">相关设置</text>
                    <text class="right iconfont icon-gengduo"/>
                </view>
                <view class="item" >
                    <text class="icon iconfont icon-wodekefu"/>
                    <text class="name">意见反馈</text>
                    <text class="right iconfont icon-gengduo"/>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { useUserStore } from "@/store"
import { onMounted } from "vue"

const userStore = useUserStore()

onMounted(() => {
    userStore.getUserInfo()
})
</script>

<style scoped lang="scss">
.my {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .header {
    width: 100%;
    height: 320rpx;
    background-color: rgba(255,255,255,1);
    border-radius: 0 0 20rpx 20rpx;
    color: rgba(16,16,16,1);
    display: flex;
    align-items: center;
    position: relative;
    .left {
      padding-left: 50rpx;
      width: 200rpx;
      image {
        width: 150rpx;
        height: 150rpx;
        border-radius: 50%;
        border: 10rpx solid #efefef;
      }
    }
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      color: rgba(96,96,96,1);
      font-size: 36rpx;
      text-align: left;
      margin-left: 36rpx;
      gap: 20rpx;
      .name {
        .icon-nan {
          color: rgba(64,158,255,1);
          font-size :46rpx;
        }
      }
    }
    .setting{
      position: absolute;
      right: 50rpx;
      top: 10rpx;
      animation: setting-rotate 5s linear infinite;
      .iconfont {
        font-size: 60rpx;
        color: rgba(64,158,255,1);

      }
      @keyframes setting-rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
      }

    }
  }
  .content   {
    width: 700rpx;
    border-radius: 20rpx;
    background-color: rgba(255,255,255,1);
    color: rgba(16,16,16,1);
    box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(0,0,0,0.4);
    margin-top: 24rpx;
    padding-bottom: 40rpx;
    padding-top: 20rpx;
    .list {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .item {
        width: 90%;
        height: 100rpx;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2rpx solid #e5e5e5;
        .name {
          flex: 1;
          margin-left: 32rpx;
          color: rgba(104,104,104,1);
          font-size: 32rpx;

        }
        .icon {
          font-size: 50rpx;
          color: rgba(64,158,255,1);
        }
        .right {
          font-size: 30rpx;
          color: rgba(167,167,167,1);
        }
      }
    }
  }
}
</style>