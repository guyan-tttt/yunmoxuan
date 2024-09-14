<template>
  <div class="lyric">
    <ul ref="listRef" class="list" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue"
import { useMusicStore } from "@/store/modules/music"

const musicStore = useMusicStore()

const musicWords = ref(musicStore.currentMusic.lrc.replace("undefined", ""))

const data = ref([])
const handleLrc = () => {
  // 处理歌词
  data.value = musicWords.value.split("\n").map((item) => {
    return {
      text: item.split("]")[1],
      time: item
        .split("]")[0]
        .replace("[", "")
        .split(":")
        .reduce((p, c) => {
          return p * 60 + parseFloat(c)
        })
    }
  })
  const pop = data.value.pop()
  if (pop.text === "undefined") {
    pop.text = ""
    data.value.push(pop)
  }
}

const listRef = ref(null)
const liList = ref([])
let index = -1
const maxOffect = ref(0)

// 添加歌词
const addLyric = () => {
  data.value.forEach((item) => {
    const li = document.createElement("li")
    li.innerText = item.text
    li.className = "item"
    listRef.value.appendChild(li)
    liList.value.push(li)
  })
}

const timer = ref(null)

// 初始化歌词
const initLrc = async () => {
  // 互殴歌词
  musicWords.value = musicStore.currentMusic.lrc.replace("undefined", "")
  console.log(musicWords.value)
  // 清除歌词
  listRef.value.innerHTML = ""
  liList.value = []
  index = -1
  // 处理歌词
  handleLrc()
  console.log()
  // 添加歌词
  await addLyric()
  // 获取高度
  maxOffect.value = listRef.value.clientHeight - 210
  // 清除定时器
  clearInterval(timer.value)
  // 开启定时器
  timer.value = setInterval(activeIndex, 500)
}

function activeIndex() {
  // 获取当前播放时间
  const currentTime = musicStore?.player.currentTime
  //   获取当前播放的歌词序号
  index = data.value.findIndex((item) => item.time >= currentTime) - 1
  if (index >= 0) {
    // listRef.value.style.transform = `translateY(-${(index - 1) * 34}px)`
    liList.value.forEach((item) => {
      item.classList.remove("active")
    })
    liList.value[index].classList.add("active")

    let transformY = (liList.value[index].clientHeight + 10) * index + 10 - 210
    if (transformY < 0) transformY = 0
    if (transformY > maxOffect.value) transformY = maxOffect
    listRef.value.style.transform = `translateY(-${transformY}px)`
  }
}

// 监听仓库变化
watch(
  () => musicStore.currentMusic,
  () => {
    console.log("musicStore.currentMusic")
    initLrc()
  }
)

onMounted(async () => {
  if (musicStore.player) {
    initLrc()
  } else {
    listRef.value.innerHTML = "无音乐信息"
  }
})

onUnmounted(() => {
  clearInterval(timer.value)
})
</script>

<style scoped lang="scss">
.lyric {
  width: 100%;
  height: 420px;
  overflow: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
}
.list {
  transition: all 0.5s;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 0;
}

::v-deep(.list[data-v-65520677]) {
  color: #fff;
  .item {
    line-height: 20px;
    height: 20px;
    transition: all 0.5s;
    color: #fff;
    font-size: 18px;
    &.active {
      color: #409eff;
      transform: scale(1.2);
      text-shadow: 0 0 10px #999;
      font-weight: 700;
    }
  }
}
</style>
