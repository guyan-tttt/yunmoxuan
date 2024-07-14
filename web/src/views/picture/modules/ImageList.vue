<template>
  <div>
    <Waterfall v-if="props.data.length > 0" :list="props.data" :crossOrigin="true" :breakpoints="breakPoints">
      <template #item="{ item, url, index }">
        <div class="card" :name="[index, item]">
          <LazyImg class="image" @click="handleClick(url)" style="border-radius: 10px" :url="url" />
        </div>
      </template>
    </Waterfall>
    <div v-else>
      <el-empty :image-size="200" />
    </div>
    <ImagePreview v-model="showImage" :url="currentImage" />
  </div>
</template>

<script setup lang="ts">
import { LazyImg, Waterfall } from "vue-waterfall-plugin-next"
import { defineProps } from "vue"
import "vue-waterfall-plugin-next/dist/style.css"
import ImagePreview from "./imagPreview.vue"
import { ref } from "vue"

// 瀑布流布局配置
const breakPoints = {
  1200: { rowPerView: 4 }, // 1200px 宽度四列
  900: { rowPerView: 3 },
  600: { rowPerView: 2 },
  300: { rowPerView: 1 }
}

// 接受传递的数据
const props = defineProps<{
  data: any[]
}>()
// 点击图片事件
const handleClick = (url: any) => {
  showImage.value = true
  currentImage.value = url
}
// 预览弹框显示
const showImage = ref(false)

// 当前选中图片
const currentImage = ref<any>()
</script>

<style scoped lang="scss">
.container {
  padding: 10px;
  // height: 900px;
  overflow: auto;
}

::v-deep(.lazy__img:hover) {
  transform: scale(1.2);
  transition: transform 0.5s;
  overflow: hidden;
}
</style>
