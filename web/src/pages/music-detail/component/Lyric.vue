<template>
  <div class="lyric">
    <ul ref="listRef" class="list" />
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, onUnmounted } from "vue"
import { useMusicStore } from "@/store/modules/music"

const musicStore = useMusicStore()

const musicWords = `[00:00.000] 作词 : 张国祥\n[00:01.000] 作曲 : 汤小康\n[00:04.050]\n[00:12.570]难以忘记初次见你\n[00:16.860]一双迷人的眼睛\n[00:21.460]在我脑海里\n[00:23.960]你的身影 挥散不去\n[00:30.160]握你的双手感觉你的温柔\n[00:34.940]真的有点透不过气\n[00:39.680]你的天真 我想珍惜\n[00:43.880]看到你受委屈 我会伤心\n[00:48.180]喔\n[00:50.340]只怕我自己会爱上你\n[00:55.070]不敢让自己靠的太近\n[00:59.550]怕我没什么能够给你\n[01:04.030]爱你也需要很大的勇气\n[01:08.190]只怕我自己会爱上你\n[01:12.910]也许有天会情不自禁\n[01:17.380]想念只让自己苦了自己\n[01:21.840]爱上你是我情非得已\n[01:28.810]难以忘记初次见你\n[01:33.170]一双迷人的眼睛\n[01:37.700]在我脑海里 你的身影 挥散不去\n[01:46.360]握你的双手感觉你的温柔\n[01:51.120]真的有点透不过气\n[01:55.910]你的天真 我想珍惜\n[02:00.150]看到你受委屈 我会伤心\n[02:04.490]喔\n[02:06.540]只怕我自己会爱上你\n[02:11.240]不敢让自己靠的太近\n[02:15.750]怕我没什么能够给你\n[02:20.200]爱你也需要很大的勇气\n[02:24.570]只怕我自己会爱上你\n[02:29.230]也许有天会情不自禁\n[02:33.680]想念只让自己苦了自己\n[02:38.140]爱上你是我情非得已\n[03:04.060]什么原因 耶\n[03:07.730]我竟然又会遇见你\n[03:13.020]我真的真的不愿意\n[03:16.630]就这样陷入爱的陷阱\n[03:20.700]喔\n[03:22.910]只怕我自己会爱上你\n[03:27.570]不敢让自己靠的太近\n[03:32.040]怕我没什么能够给你\n[03:36.560]爱你也需要很大的勇气\n[03:40.740]只怕我自己会爱上你\n[03:45.460]也许有天会情不自禁\n[03:49.990]想念只让自己苦了自己\n[03:54.510]爱上你是我情非得已\n[03:58.970]爱上你是我情非得已\n[04:03.000]`

// 处理歌词
const data = musicWords.split("\n").map((item) => {
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

const listRef = ref(null)
const liList = ref([])
let index = -1
const maxOffect = ref(0)

// 添加歌词
const addLyric = () => {
  data.forEach((item) => {
    const li = document.createElement("li")
    li.innerText = item.text
    li.className = "item"
    listRef.value.appendChild(li)
    liList.value.push(li)
  })
}

const timer = ref(null)

function activeIndex() {
  // 获取当前播放时间
  const currentTime = musicStore?.player.currentTime
  //   获取当前播放的歌词序号
  index = data.findIndex((item) => item.time >= currentTime) - 1
  if (index >= 0) {
    listRef.value.style.transform = `translateY(-${(index - 1) * 40}px)`
    liList.value.forEach((item, i) => {
      item.classList.remove("active")
    })
    liList.value[index].classList.add("active")
    // console.log(index);
    let transformY = liList.value[index].clientHeight * index + 15 - 210
    if (transformY < 0) transformY = 0
    if (transformY > maxOffect.value) transformY = maxOffect
    listRef.value.style.transform = `translateY(-${transformY}px)`
  }
}



// setInterval(activeIndex, 500)

onMounted(async () => {
  maxOffect.value = listRef.value.clientHeight - 210

  if (musicStore.player) {
    await addLyric()
    timer.value = setInterval(activeIndex, 1000)
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
    }
  }
}
</style>
