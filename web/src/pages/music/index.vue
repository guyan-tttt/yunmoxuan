<template>
  <div class="music" :class="{ mobile: settingsStore.isMobile }">
    <!-- 页头搜索框 -->
    <Header />

    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue"
import Header from "./component/Header.vue"
import { useSettingsStore } from "@/store/modules/settings"
import { useMusicStore } from "@/store/modules/music"

const settingsStore = useSettingsStore()
const musicStore = useMusicStore()

onMounted(() => {
  musicStore.toggleMin(false)
})

onUnmounted(() => {
  musicStore.toggleMin(true)
})
</script>

<style scoped lang="scss">
.music {
  font-size: 20px;
  &.mobile {
    font-size: 14px;
  }
}
.content {
  min-height: calc(100vh - 64px);
}
</style>
