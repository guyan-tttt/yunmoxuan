import { defineStore } from "pinia"
import { ref } from "vue"

export const useMusicStore = defineStore("music", () => {
  // 音乐列表
  const musicList = ref<any[]>([])

  // 当前播放音乐
  const currentMusic = ref<any>({
    id: "",
    title: "无音乐",
    artist: "无音乐",
    url: "", // 音频播放地址
    pic: "",
    lrc: "", // lrc 歌词
    type: "" // 指定音频的类型
  })

  // 播放音乐
  const playMusic = (item: any) => {
    currentMusic.value = {
      id: item.id,
      title: item.name,
      artist: item.ar[0].name,
      url: "", // 音频播放地址
      pic: item.al.picUrl,
      lrc: "", // lrc 歌词
      type: "" // 指定音频的类型
    }
  }
  //   设置当前播放音乐的url
  const setMusicUrl = (url: string) => {
    console.log(url)

    currentMusic.value.src = url
    // 添加音乐列表
    if (!musicList.value.some((item: any) => item.id === currentMusic.value.id)) {
      musicList.value.push(currentMusic.value)
    }
  }

  //   是否显示迷你
  const isMin = ref(true)

  // 切换迷你模式
  const toggleMin = (value: boolean) => {
    isMin.value = value
  }

  // 播放器当前实例
  const player = ref<any>(null)

  return { musicList, currentMusic, playMusic, setMusicUrl, isMin, toggleMin, player }
})
