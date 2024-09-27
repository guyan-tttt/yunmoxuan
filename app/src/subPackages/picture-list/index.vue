<template>
    <div class="picture-list">
        <view class="item" @click="preview(index)" v-for="(item,index) in pictureList" :key="item._id">
            <Loading v-if="item.loading"/>
            <image
                @load="loadingComplete(item)"
                :src="item.src"
                mode="widthFix"
                lazy-load
                @longpress="showActions(item.src)"
            />
        </view>
    </div>
</template>

<script setup>
import { onLoad ,onReachBottom } from "@dcloudio/uni-app"
import { getPictureListAPI } from "@/api/picture"
import { onMounted, ref } from "vue"
import Loading from "../components/Loading.vue"
import { showActions } from "@/utils/downloadImage"

// 点击预览
const preview = (index) => {
    uni.previewImage({
        urls: pictureList.value.map((item) => item.src),
        current: index,
    })
}

// 请求参数
const params = ref({
    page: 1,
    pageSize: 10,
    id: "",
    total: 0
})

// 图片列表
const pictureList = ref([])

// 获取图片列表
const getPictureList = async() => {
    const res = await getPictureListAPI(params.value)
    if(res.code === 200) {
        res.data.forEach((item) => {
            item.loading = true
        })
        pictureList.value = pictureList.value.concat(res.data)
        params.value.total = res.total
    }
}

// 图片资源加载完成
const loadingComplete = (item) => {
    item.loading = false
}

// 长按图片显示操作
onLoad((options) => {
    params.value.id = options.id
})

onMounted(() => {
    getPictureList()
})

onReachBottom(() => {
    if(params.value.total > pictureList.value.length) {
        params.value.page += 1
        getPictureList()
    }else {
        uni.showToast({
            title: "暂无更多图片",
        })
    }
})
</script>

<style scoped lang="scss">
.picture-list {
  width: 700rpx;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
  margin-bottom: 40rpx;
  margin-top: 20rpx;
  .item {
    width:  calc(100% - 60rpx);;
    border: 30rpx solid #fff;
    border-radius: 20rpx;
    box-shadow: 0 0 10rpx #ccc;
    image {
      width:100%;
      border-radius: 20rpx;

    }
  }
}
</style>