import { defineStore } from "pinia"
import { ref, watch } from "vue"
import { ElMessage } from "element-plus"

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
      artist: "——" + item.ar.map((i: any) => i.name).join(" · "),
      url: "", // 音频播放地址
      pic: item.al?.picUrl || "",
      lrc: "", // lrc 歌词
      type: "" // 指定音频的类型
    }
  }
  // 设置当前音乐
  const setCurrentMusic = (item: any) => {
    currentMusic.value = { ...item }
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
  // 设置当前音乐的歌词
  const setMusicLrc = (lrc: string) => {
    currentMusic.value.lrc = lrc
  }

  //   是否显示迷你
  const isMin = ref(true)

  // 切换迷你模式
  const toggleMin = (value: boolean) => {
    isMin.value = value
  }

  // 播放器当前实例
  const player = ref<any>(null)

  // 当前播放模式
  const modes = ref([
    {
      name: "顺序播放",
      value: "order",
      icon: "music-order"
    },
    {
      name: "随机播放",
      value: "random",
      icon: "music-random"
    },
    {
      name: "单曲循环",
      value: "loop",
      icon: "music-loop"
    }
  ])
  const playMode = ref(modes.value[0]) // order, random, loop

  // 切换播放模式
  const changeMode = (index: number) => {
    playMode.value = modes.value[index]
  }

  // 删除歌曲
  const deleteMusic = (item: any) => {
    // 判断是否是当前正在播放的歌曲
    if (item.id === currentMusic.value.id) {
      ElMessage.warning("当前歌曲正在播放，无法删除")
      return
    }
    const index = musicList.value.findIndex((music: any) => music.id === item.id)
    if (index !== -1) {
      musicList.value.splice(index, 1)
    }
  }

  // 播放下一首
  const nextMusic = () => {
    // 计算当前歌曲在列表中的索引
    let index = musicList.value.findIndex((item: any) => item.id === currentMusic.value.id)
    if (index === -1) {
      return
    }
    // 判断当前播放模式
    if (playMode.value.value === "random") {
      index = Math.floor(Math.random() * musicList.value.length)
    } else if (playMode.value.value === "order") {
      // 判断当前是否是最后一首歌曲
      if (index === musicList.value.length - 1) {
        index = 0
      } else {
        index++
      }
    }
    setCurrentMusic(musicList.value[index])
  }

  // 播放上一首
  const prevMusic = () => {
    // 计算当前歌曲在列表中的索引
    let index = musicList.value.findIndex((item: any) => item.id === currentMusic.value.id)
    if (index === -1) {
      return
    }
    // 判断当前播放模式
    if (playMode.value.value === "random") {
      index = Math.floor(Math.random() * musicList.value.length)
    } else if (playMode.value.value === "order") {
      // 判断当前是否是最后一首歌曲
      if (index === 0) {
        index = musicList.value.length - 1
      } else {
        index--
      }
    }
    setCurrentMusic(musicList.value[index])
  }

  // 添加音乐列表
  const addMusicList = (item: any) => {
    const music = {
      id: item.id,
      title: item.name,
      artist: "——" + item.ar?.map((i: any) => i.name).join(" · "),
      url: "", // 音频播放地址
      pic: item.al?.picUrl,
      lrc: "", // lrc 歌词
      type: "" // 指定音频的类型
    }
    // 判断是否已经存在
    if (musicList.value.findIndex((i: any) => i.id === item.id) !== -1) {
      ElMessage.warning("该歌曲已存在")
      return
    } else {
      musicList.value.push(music)
    }
  }

  // 添加音乐列表（搜索版）
  const addMusicListSearch = (item: any) => {
    const music = {
      id: item.id,
      title: item.name,
      artist: "——" + item.artists.map((i: any) => i.name).join(" · "),
      url: "", // 音频播放地址
      pic: item.al?.picUrl || "https://tse4-mm.cn.bing.net/th/id/OIP-C.RtkzGRP7cdrZFt7aJcea_wHaE8?w=268&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7",
      lrc: "", // lrc 歌词
      type: "" // 指定音频的类型
    }

    // 判断是否已经存在
    if (musicList.value.findIndex((i: any) => i.id === item.id) !== -1) {
      ElMessage.warning("该歌曲已存在")
      return
    } else {
      musicList.value.push(music)
    }
  }
  // 播放音乐（搜索版）
  const playMusicSearch = (item: any) => {
    currentMusic.value = {
      id: item.id,
      title: item.name,
      artist: "——" + item.artists.map((i: any) => i.name).join(" · "),
      url: "", // 音频播放地址
      pic: "https://tse4-mm.cn.bing.net/th/id/OIP-C.RtkzGRP7cdrZFt7aJcea_wHaE8?w=268&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7",
      lrc: "", // lrc 歌词
      type: "" // 指定音频的类型
    }
  }

  // 监听列表要是有值，默认播放第一首
  watch(
    () => musicList.value.length,
    () => {
      if (musicList.value.length > 0 && !currentMusic.value.id) {
        setCurrentMusic(musicList.value[0])
      }
    }
  )
  return {
    musicList,
    currentMusic,
    playMusic,
    setMusicUrl,
    isMin,
    toggleMin,
    player,
    setMusicLrc,
    setCurrentMusic,
    playMode,
    deleteMusic,
    changeMode,
    modes,
    nextMusic,
    prevMusic,
    addMusicList,
    addMusicListSearch,
    playMusicSearch
  }
})
