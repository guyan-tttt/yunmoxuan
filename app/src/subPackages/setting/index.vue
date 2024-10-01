<template>
    <div class="setting">
        <view class="content">
            <view class="list">
                <view class="item" >
                    <text class="name">是否需要保存文章搜索历史记录</text>
                    <switch :checked="settingStore.setting.history" @change="switchHistoryChange" />
                </view>
            </view>
        </view>
    </div>
</template>

<script setup>
import { useSettingStore } from "@/store"
import { onUnmounted } from "vue"
const settingStore = useSettingStore()

const switchHistoryChange = (e) => {
    settingStore.setHistory(e.detail.value)
}
onUnmounted(() => {
    settingStore.setSetting()
})
</script>

<style scoped lang="scss">
.setting {
    width: 700rpx;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .content   {
    width: 700rpx;
    border-radius: 20rpx;
    background-color: rgba(255,255,255,1);
    min-height: calc(100vh - 150rpx);
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