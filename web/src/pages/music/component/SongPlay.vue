<template>
  <div class="play" :class="{ isMin: musicStore.isMin }">
    <aplayer
      :mini="musicStore.isMin"
      autoplay
      ref="aplayerRef"
      class="aplayer"
      :music="music"
      :list="musicStore.musicList"
      :listFolded="true"
      theme="#409EFF"
    >
      <template v-slot:play-button>
        <button @click="handlePlayClick">自定义播放</button>
      </template>
    </aplayer>
  </div>
</template>

<script setup lang="ts">
//@ts-ignore
import Aplayer from "vue-aplayer-next"
import { getMusicDetailAPI } from "@/api/web/music"
import { ref, watch } from "vue"
import { useMusicStore } from "@/store/modules/music"

// 音乐仓库
const musicStore = useMusicStore()

const music = ref<any>(musicStore.currentMusic)

// 播放器组件
const aplayerRef = ref<any>(null)
// 监听当前音乐id的变化，一但变化，就重新获取音乐信息
watch(
  () => musicStore.currentMusic,
  async () => {
    if (musicStore.currentMusic.id) {
      await getMusicInfo()
      music.value = musicStore.currentMusic
      aplayerRef.value.play()
      console.log("播放器组件", aplayerRef.value)
    }
  }
)

// 获取音乐信息
const getMusicInfo = async () => {
  const res = await getMusicDetailAPI([musicStore.currentMusic.id])
  musicStore.setMusicUrl(res.data[0].url)
}

const handlePlayClick = () => {
  aplayerRef.value.play()
}
</script>

<style scoped lang="scss">
.play {
  width: 100%;
  max-width: 1280px;
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  transition: all 1s;
  &.isMin {
    width: auto;
    border-radius: 50%;
    bottom: 10px;
    left: 100px;
    border: 5px solid #409eff;
    ::v-deep(.aplayer.aplayer-mini) {
      border-radius: 50%;
      .aplayer-pic {
        animation: roatePic 10s linear infinite;
      }
      @keyframes roatePic {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
}
</style>
