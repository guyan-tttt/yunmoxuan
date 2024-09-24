<template>
    <div class="picture-list">
        <view class="item" v-for="item in pictureList" :key="item._id">
            <image
                :src="item.src"
                mode="widthFix"
            />
        </view>
    </div>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app"
import { getPictureListAPI } from "@/api/picture"
import { onMounted, ref } from "vue"

// 点击预览
const preview = () => {
    uni.previewImage({
        urls: [
        ],
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
        pictureList.value = res.data
        params.value.total = res.total
    }
}
onLoad((options) => {
    params.value.id = options.id
})

onMounted(() => {
    getPictureList()
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