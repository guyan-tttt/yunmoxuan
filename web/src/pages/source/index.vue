<template>
  <div class="source">
    <ContextMenu>
      <div class="content" />
    </ContextMenu>
  </div>
</template>

<script setup lang="ts">
import ContextMenu from "@/components/ContextMenu/index.vue"
</script>

<style scoped lang="scss">
.source {
  width: 100%;
  height: calc(100vh - 56px);
  .content {
    width: 100%;
    height: 100%;
    background: red;
  }
}
</style>
