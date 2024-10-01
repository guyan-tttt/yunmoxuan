<template>
    <div class="search">
        <view class="top">
            <view class="search-input">
                <input v-model="searchForm" type="text" placeholder="请输入搜索内容" />

            </view>
            <text @click="search " class="btn iconfont icon-sousuo"/>
        </view>
        <view class="content">
            <view class="title">
                <view class="left">
                    <view class="line"/>
                    <text>搜索历史</text>
                    <uni-icons @click="showDeleteBtn" type="trash-filled" size="30" :color="showDelete ? '#F56C6C' : '#999999'"/>
                    <view v-if="showDelete" class="clear" @click="clearHistory">清空记录</view>
                </view>
            </view>
            <view class="list">
                <view class="item" v-for="item in searchStore.history" :key="item" @click="historyItemClick(item)">{{ item }} <uni-icons @click="deleteHistoryItem(item)" v-if="showDelete" type="clear" size="30" color="red"/></view>
            </view>
        </view>
    </div>
</template>

<script setup>
import { useSearchStore } from "@/store"
import { ref , onUnmounted} from "vue"


const searchStore = useSearchStore()

const searchForm = ref("")

// 搜索记录

// 搜索
const search = () => {
    searchStore.search(searchForm.value)

    // 跳转到搜索列表页面
    uni.navigateTo({
        url: `/pages/blog-post/index?keyword=${searchForm.value}`
    })
    searchForm.value = ""
}

// 当前是否显示删除按钮
const showDelete = ref(false)

// 点击开启删除选择
const showDeleteBtn = () => {
    showDelete.value = !showDelete.value
}

// 删除记录
const deleteHistoryItem = (value) => {
   searchStore.deleteHistoryItem(value)
}

// 清空记录
const clearHistory = () => {
    uni.showModal({
        title: "温馨提示！",
        content: "是否清空搜索历史？",
        confirmText: "确定",
        cancelText: "取消",
        success:(success) => {
            if(success.confirm) {
                searchStore.clearHistory()
            }
        }
    })
}
// 点击记录跳转至搜索列表也面
const historyItemClick = (value) => {
    // 判断当前是否显示删除按钮
    if(showDelete.value) {
        return
    }
    searchForm.value = value
    search()
}
onUnmounted(() => {
    searchStore.setHistory()
})

</script>

<style scoped lang="scss">
.search {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30rpx;
  .top {
    width: 650rpx;
    display: flex;
    align-items: center;
    margin-top: 20rpx;
    gap:20rpx;
    .search-input {
    flex: 1;
    height:64rpx;
    border-radius: 64rpx;
    background-color: rgba(255,255,255,1);
    color: rgba(16,16,16,1);
    font-size: 28rx;
    text-align: center;
    box-shadow: 0px 2px 6px 0px rgba(213,213,213,0.4);
    font-family: Roboto;
    display: flex;
    align-items: center;
    justify-content: center;

    input {
      color: rgba(189,189,189,1);
      font-size: 14px;
      font-family: Arial-regular;
    }

    }

    .btn {
      width: 50rpx;
      height: 50rpx;
      position: relative;
      line-height: 50rpx;
      right: 0;
      font-size: 40rpx;
      background-color: rgba(24,144,255,1);
      color: #fff;
      padding: 10rpx;
      border-radius: 50%;;
      border: 2rpx solid #fff;
      text-align: center;
      }
  }
  }
  .content {
    width: 600rpx;
    background-color: #fff;
    height: calc(100vh - 200rpx);
    border-radius: 40rpx;
    padding: 20rpx 40rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        .left {
            display: flex;
            align-items: center;
            gap: 20rpx;
            text {
                line-height: 56rpx;
                color: rgb(79,79,79);
                font-size: 40rpx;
                text-align: left;
                font-family: PingFangSC-bold;
                font-weight: bold;

            }
            .line {
                width: 12rpx;
                height:42rpx;
                line-height: 52rpx;
                border-radius: 26rpx;
                background-color: rgba(24,144,255,1);
                color: rgba(16,16,16,1);
            }
            .clear {
                    color: #F56C6C;
                }
        }
        .right {
            line-height: 22px;
            color: rgba(107,107,107,1);
            font-size: 16px;
            text-align: left;
            font-family: PingFangSC-regular;
        }
    }
    .list {
      width: 100%;
      display: flex;
      gap: 20rpx;
      flex-wrap: wrap;
      margin-top: 20rpx;
      .item {
        height: 40rpx;
        border-radius: 80rpx;
        line-height: 40rpx;
        background-color: rgba(240,240,240,0.34);
        color: rgba(16,16,16,.7);
        font-size: 28rpx;
        text-align: center;
        font-family: Roboto;
        border: 2rpx solid rgba(187,187,187,1);
        padding: 10rpx 30rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 5rpx;
        .uni-icons {
          animation: scale 0.5s infinite;
          @keyframes scale {
            0% {
              transform: scale(0);
            }
            100% {
              transform: scale(1);
            }
          }
        }
      }
    }
  }

</style>