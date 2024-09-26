<template>
    <view class="index">
        <navigator url="/pages/search/index" class="search">
            <text class="iconfont icon-sousuo"/>
            <input type="text" placeholder="请输入搜索内容" />
        </navigator>
        <div class="banner" >
            <image
                src="../../static/index/index-bg.jpg"
                mode="aspectFill"
            />
        </div>
        <NavList/>
        <Recommend/>
    </view>
</template>

<script setup>
import Recommend from "./components/Recommend.vue"
import NavList from "./components/nav-list.vue"
import { useUserStore } from "@/store"
import { onMounted } from "vue"

const userStore = useUserStore()

onMounted(() => {
    userStore.getUserInfo()
})

</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
  .search {
    margin-top: 20rpx;
    width: 700rpx;
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
    .icon-sousuo {
      position: relative;
      left: 40rpx;
      line-height: 64rpx;
    }

  }
  .banner {
    width:700rpx;
    height: 340rpx;
    border-radius: 34rpx;
    background-color: rgba(229,229,229,1);
    image {
      width: 100%;
      border-radius: 34rpx;
      height: 340rpx;
      overflow: hidden;
    }
  }
}
</style>