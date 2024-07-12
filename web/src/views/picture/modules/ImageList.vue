<template>
  <div container>
    <Waterfall :list="data" :crossOrigin="true" :breakpoints="breakPoints">
      <template #item="{ item, url, index }">
        <div class="card">
          <LazyImg style="border-radius: 10px" :url="url" />
        </div>
      </template>
    </Waterfall>
  </div>
</template>

<script setup lang="ts">
import { LazyImg, Waterfall } from "vue-waterfall-plugin-next"
import "vue-waterfall-plugin-next/dist/style.css"
const data = [
  {
    src: "http://localhost:3000/images/article/06d59c766049398464ae9e8c3990431d.jpeg"
  },
  {
    src: "http://localhost:3000/images/article/b63469ab81e5ee53a4083b633d60e1c3.jpeg"
  },
  {
    src: "http://localhost:3000/images/article/7ee5e4890623e27de293c6af9d12d43b.jpeg"
  },
  {
    src: "http://localhost:3000/images/article/b63469ab81e5ee53a4083b633d60e1c3.jpeg"
  },
  {
    src: "http://localhost:3000/images/article/b63469ab81e5ee53a4083b633d60e1c3.jpeg"
  },
  {
    src: "http://localhost:3000/images/article/b63469ab81e5ee53a4083b633d60e1c3.jpeg"
  },
  {
    src: "http://localhost:3000/images/article/7ee5e4890623e27de293c6af9d12d43b.jpeg"
  },
  {
    src: "http://localhost:3000/images/article/b63469ab81e5ee53a4083b633d60e1c3.jpeg"
  },
  {
    src: "http://localhost:3000/images/article/b63469ab81e5ee53a4083b633d60e1c3.jpeg"
  },
  {
    src: "http://localhost:3000/images/article/b63469ab81e5ee53a4083b633d60e1c3.jpeg"
  }
]

const breakPoints = {
  1200: { rowPerView: 4 },
  900: { rowPerView: 3 },
  600: { rowPerView: 2 },
  300: { rowPerView: 1 }
}
</script>

<style scoped lang="scss">
.container {
  padding: 10px;
  height: 100%;
}
</style>
