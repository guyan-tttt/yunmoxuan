<template>
  <div>
    <el-card>
      <el-row>
        <el-button type="primary" :icon="Plus" @click="$router.push('/animation/add')">添加动漫</el-button>
      </el-row>
      <el-row gap="10" class="mt-5">
        <AnimationCard v-for="item in 10" :key="item" />
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue"
import AnimationCard from "./component/AnimationCard.vue"


</script>

<style scoped></style>
