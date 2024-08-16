<template>
  <div>
    <el-card class="source">
      <SourceCategory />
    </el-card>
  </div>
</template>

<script setup>
import SourceCategory from "./components/SourceCategory.vue"
</script>

<style lang="scss" scoped>
.source {
  min-height: calc(100vh - 140px);
}
</style>
