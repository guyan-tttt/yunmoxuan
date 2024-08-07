<template>
  <div class="list">
    <router-link :to="`/home-picture/detail?id=${item._id}`" class="item" v-for="item in pictureCategory" :key="item._id">
      <div class="title">
        <span>{{ item.name }}</span>
        <p>{{ item.desc }}</p>
      </div>
      <div class="img">
        <img :src="item.cover" alt="" />
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { getPictureCategoryAPI } from "@/api/web/picture"
import type { ImageCategoryItem } from "@/types/admin/imageCategory"

// 图片分类
const pictureCategory = ref<ImageCategoryItem[]>([])
// 获取图片分类
const getPictureCategory = async () => {
  const res = await getPictureCategoryAPI()
  if (res.code === 200) {
    pictureCategory.value = res.data
    console.log(res.data)
  }
}

onMounted(() => {
  getPictureCategory()
})
</script>

<style scoped lang="scss">
.list {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  .item {
    flex: 1;
    border-radius: 10px;
    position: relative;
    transition: all 0.3s;
    &:hover {
      filter: saturate(2) drop-shadow(rgba(0, 0, 0, 0.66) 0px 0px 5px);
      transform: translateY(-5px);
      .title {
        &::after {
          width: 80%;
        }
        p {
          transform: translateX(0);
        }
      }
    }
    .img {
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
      }
    }
    .title {
      position: absolute;
      top: 10%;
      left: 10%;
      color: #fff;
      font-weight: 700;
      text-align: left;
      width: 100%;
      overflow: hidden;
      &::after {
        content: "";
        width: 0;
        height: 1px;
        background-color: #fff;
        position: absolute;
        top: 28px;
        left: -1px;
        border-radius: 1px;
        transition: all 0.3s;
      }
      span {
        font-size: 18px;
      }
      p {
        font-size: 12px;
        color: #efefef;
        transform: translateX(100%);
        transition: all 0.3s;
      }
    }
  }
}
</style>
