<template>
  <div id="bullet-wall">
    <div
      class="bullet"
      :style="{
        top: item.track?.offset * trackHeight + 'px',
        animationDuration: item.duration + 's',
        color: item.color
      }"
      :id="item.id"
      v-for="item in bulletWallData"
      :key="item.id"
      :class="`bullet-${item.status}`"
      @animationend="stop(item)"
      v-cursor-pointer
    >
      <div class="avatar">
        <el-avatar v-if="item.avatar" :size="40" :src="item.avatar" />
        <span
          :style="{
            color: item.color
          }"
          v-else
          >{{ item.nickname?.slice(0, 1) }}</span
        >
      </div>
      <div class="nickname">{{ item.nickname }}:</div>
      <div class="content">{{ item.content }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, watch } from "vue"

// 接受父组件参数
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

console.log(props.data)

const bulletWallData = ref<any[]>(
  props.data.map((item: any) => {
    return {
      ...item,
      status: "waiting"
    }
  })
)

// 轨道列表
const trackList = ref<any[]>([])

// 轨道高度
const trackHeight = 50

// 轨道数量
const trackNum = ref<number>(10)

// 生成轨道
const generateTrack = () => {
  const height = document.getElementById("bullet-wall")?.getBoundingClientRect().height
  trackNum.value = height ? Math.floor(height / trackHeight) - 1 : 15
  for (let i = 0; i < trackNum.value; i++) {
    trackList.value.push({
      id: i,
      offset: i,
      disabled: false
    })
  }
}

// 开启弹幕
const startBullet = (item: any) => {
  item.status = "running"
  item.duration = Math.floor(Math.random() * 15) + 10
  item.color = getRandomColor()
  assignTrack(item)
}
// 停止弹幕
const stop = (item: any) => {
  item.status = "done"
  setTimeout(() => {
    startBullet(item)
  }, 1000)
}

// 批量插入弹幕
const insertBullet = () => {
  for (let i = 0; i < Math.ceil(bulletWallData.value.length / trackNum.value); i++) {
    const start = i * trackNum.value
    const end = (i + 1) * trackNum.value
    setTimeout(() => {
      console.log(bulletWallData.value.slice(start, end))

      bulletWallData.value.slice(start, end).forEach((item: any) => {
        startBullet(item)
      })
    }, i * 2000)
  }
}

// 分配轨道
const assignTrack = (item: any) => {
  // 获取可用的轨道
  const availableTrack = trackList.value.filter((item) => !item.disabled)
  // 随机获取一个轨道
  const track = availableTrack[Math.floor(Math.random() * availableTrack.length)]
  // 分配轨道
  item.track = track
  // 禁用该轨道
  track.disabled = true
  // 计算延迟时间
  const w1 = document.getElementById("bullet-wall")?.getBoundingClientRect().width
  const w2 = document.getElementById(item.id)?.getBoundingClientRect().width
  const delay = (w2! / (w1! + w2!)) * item.duration * 1000 || 500
  setTimeout(() => {
    track.disabled = false
  }, delay)
}

// 随机取色
const getRandomColor = function () {
  // const colorAngle = Math.floor(Math.random() * 360)
  const color = "#fff"
  return color
}

// 监听父组件数据
watch(
  () => props.data.length,
  () => {
    bulletWallData.value = props.data.map((item: any) => {
      return {
        ...item,
        status: "waiting"
      }
    })
    setTimeout(() => {
      // console.log(bulletWallData.value)
      insertBullet()
    }, 1000)
  }
)
onMounted(async () => {
  await generateTrack()

  setTimeout(() => {
    // console.log(bulletWallData.value)
    insertBullet()
  }, 1000)
})
</script>

<style scoped lang="scss">
#bullet-wall {
  width: 100%;
  height: 100%;
  // background-color: red;
  position: relative;
  .bullet {
    position: absolute;
    top: 0;
    z-index: 100;
    color: #fff;
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 25px;
    padding-right: 10px;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
      animation-play-state: paused;
      box-shadow: 0px 0px 15px #fff;
      transition: all 0.5s;
    }
    .nickname {
      margin-left: 5px;
      margin-right: 5px;
      font-weight: 700;
    }
  }

  .bullet-waiting {
    left: 100%;
  }
  .bullet-done {
    left: 0%;
    transform: translateX(-100%);
  }
  .bullet-running {
    animation: run 5s linear;
  }
  @keyframes run {
    from {
      left: 100%;
      transform: translateX(0);
    }
    to {
      left: 0%;
      transform: translateX(-100%);
    }
  }

  .track {
    width: 100%;
    // background-color: #000;
    &:nth-child(2n) {
      // background-color: #fff;
    }
  }
}
.avatar {
  .el-avatar {
    border: 2px solid #fff;
  }
  span {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #e0c3f3;
    display: inline-block;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    border: 2px solid #fff;
  }
}
</style>
