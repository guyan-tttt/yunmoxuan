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
      :currentTime="60"
      @timeupdate="songTimeUpdate"
      @onEnded="onSongEnded"
      order="random"
      @click="handlePlayClick"
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
import { useRouter } from "vue-router"

const router = useRouter()
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
      // 开启播放器自动播放
      aplayerRef.value.audio.autoplay = true
      console.dir(aplayerRef.value)
      // 将播放器存起来
      musicStore.player = aplayerRef.value.audio
    }
  }
)

// 获取音乐信息
const getMusicInfo = async () => {
  const res = await getMusicDetailAPI([musicStore.currentMusic.id])
  musicStore.setMusicUrl(res.data[0].url)
}

const songTimeUpdate = () => {
  // console.log("播放时间", aplayerRef.value.audio.currentTime)
}

// 音乐播放完成
const onSongEnded = () => {
  console.log("dadaddadad")
}

// 点击播放器
const handlePlayClick = () => {
  // 判断当前是否是折叠状态，如果是折叠状态就处理逻辑
  if (musicStore.isMin) {
    // 判断当前是否有音乐可以播放
    if (musicStore.musicList && musicStore.musicList.length > 0) {
      return
    } else {
      router.push("/home-music")
    }
  } else {
    // 跳转到歌词详情页面
    router.push(`/home-music/index/song-detail?id=${musicStore.currentMusic.id}`)
  }
}
</script>

<style scoped lang="scss">
.play {
  width: 100%;
  max-width: 1280px;
  position: fixed;
  bottom: 10px;
  left: 50%;
  margin: 0 -35%;
  z-index: 1000;
  transition: all 1s;
  &.isMin {
    width: auto;
    border-radius: 50%;
    bottom: 10px;
    left: 50px;
    border: 5px solid #409eff;
    margin: 0;
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
