<template>
    <view class="card"  :class="{active: isActive}" @click="isActive = !isActive">
        <div class="top">
            <image class="img"/>
            <div class="name">Vue</div>
            <div class="tag">🏷️</div>
        </div>
        <div class="content">
            <div class="desc">gewgewrgewrgw</div>
        </div>
        <div class="bottom">
            <div class="group">📖gergegreg</div>
            <div class="time">🕣2024/09/08</div>
        </div>
    </view>
</template>

<script setup >
import { ref } from "vue"

const isActive = ref(false)

</script>

  <style scoped lang="scss">
  .card {
    width: 660rpx;
    height: 160rpx;
    overflow: hidden;
    box-shadow: 0 0 20rpx #999;
    border-radius: 20rpx;
    transition: all 0.5s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-size: cover;
    background-position: center;
    color: #fff;
    cursor: pointer;
    .top {
      height: 160rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all 0.5s;
      .el-avatar {
        margin-left: 40rpx;
        margin-right: 60rpx;
        border: 2rpx solid #999;
        box-shadow: 0 0 20rpx #999;
        transition: all 0.5s;
      }
      .name {
        flex: 1;
        font-size: 40rpx;
        font-weight: 700;
        font-family: "Source Han Serif SC";
        transition: all 0.5s;
        color: #4488f0;

      }
      .tag {
        font-size: 60rpx;
        margin-right: 40rpx;
      }
    }
    .content {
      display: none;
      flex: 1;
      overflow: hidden;
      transition: all 0.5s;
      .desc {
        flex: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 40rpx;
        line-height: 40rpx;
        text-shadow: 0 0 20rpx #000;
      }
    }
    .bottom {
      display: none;
      width: 100%;
      display: flex;
      align-items: center;
      height: 0;
      overflow: hidden;
      transition: all 0.5s;
      .group {
        flex: 1;
        font-size: 32rpx;
        padding-left: 40rpx;
      }
      .time {
        font-size: 32rpx;
        padding-right: 40rpx;
      }
    }
    &.active {
      height: 400rpx;
      .top {
        .el-avatar {
          transform: translateX(-400rpx);
        }
        .name {
          transform: translateX(-260rpx);
        }
      }

      .content {
        display: flex;
      }
      .bottom {
        display: flex;
        height: 80rpx;
      }
    }
  }
  </style>
