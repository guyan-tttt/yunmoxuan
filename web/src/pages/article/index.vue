<script setup lang="ts">
import UserCard from "../index/components/userCard.vue"
import ArticleCard from "./components/articleCard.vue"
</script>
<template>
  <div class="container mx-auto max-w-screen-xl mt-5">
    <div class="grid grid-cols-4">
      <!-- 左边栏 -->
      <div class="col-span-4 px-3" style="width: 80%; margin: 0 auto">
        <ArticleCard v-for="(item, index) in 6" :key="item" :index="index" />
      </div>
      <!-- 右边栏 -->
    </div>
  </div>
</template>
