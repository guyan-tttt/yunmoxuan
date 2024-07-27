<template>
  <div class="banner">
    <div id="slided">
      <div
        v-for="(item, index) in imgList"
        :key="item.name"
        class="itm"
        :style="{ backgroundImage: `url(${item.src})`, left: index > 1 ? `calc(70% + ${index - 2} * 250px)` : 0 }"
      />
    </div>
    <el-row class="btn" justify="space-between" align="middle" style="height: calc(100vh - 60px)">
      <el-icon :size="30" @click="prev"><ArrowLeftBold /></el-icon>

      <el-icon :size="30" @click="next"><ArrowRightBold /></el-icon>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { onMounted, onUnmounted } from "vue"
import { getBannerAPI } from "@/api/web/index"

const imgList = ref<any[]>([
  {
    url: "http://localhost:3000/images/image/ac25018e749e1661299dcd29601d4bb0.jpeg",
    name: "1"
  },
  {
    url: "http://localhost:3000/images/image/d177519bab9180f7117780f80133ea62.png",
    name: "2"
  },
  {
    url: "http://localhost:3000/images/image/eb9f49a9efc7d7778510d76ceda15c49.jpeg",
    name: "3"
  },
  {
    url: "	http://localhost:3000/images/image/32bfb86f553614a13f43387985671a45.jpeg",
    name: "4"
  },
  {
    url: "http://localhost:3000/images/image/d56afa4ad46c20467ae8773136f46388.jpeg",
    name: "5"
  }
])

// 节流阀
const isChange = ref<boolean>(true)

// 下一张
const next = () => {
  // 暂停自动轮播
  clearInterval(timer.value)
  clearTimeout(delay.value)
  // 判断是否可以切换
  if (isChange.value) {
    isChange.value = false
    const items = imgList.value.shift()
    imgList.value.push(items)
    setTimeout(() => {
      isChange.value = true
    }, 1000)
  }
  // 开启延时器，若一定时间内没有点击，则自动轮播
  delay.value = setTimeout(() => {
    autoPlay(5000)
  }, 10000)
}

// 上一张
const prev = () => {
  // 暂停自动轮播
  clearInterval(timer.value)
  clearTimeout(delay.value)
  if (isChange.value) {
    isChange.value = false
    const items = imgList.value.pop()
    imgList.value.unshift(items)
    setTimeout(() => {
      isChange.value = true
    }, 1000)
  }
  // 开启延时器，若一定时间内没有点击，则自动轮播
  delay.value = setTimeout(() => {
    autoPlay(5000)
  }, 10000)
}

// 定时器
const timer = ref<any>(null)
// 延时器
const delay = ref<any>(null)

// 自动轮播
const autoPlay = (time: number) => {
  timer.value = setInterval(() => {
    const items = imgList.value.shift()
    imgList.value.push(items)
  }, time)
}

// 获取轮播图
const getBanner = async () => {
  const res = await getBannerAPI()
  if (res.code === 200) {
    // console.log(res)
    imgList.value = res.data
  }
}

onMounted(() => {
  getBanner()
  autoPlay(5000)
})

onUnmounted(() => {
  clearInterval(timer.value)
})
</script>

<style scoped lang="scss">
.banner {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  top: -60px;
  .itm {
    width: 240px;
    height: 160px;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-50%);
    border-radius: 10px;
    background-color: #fff;
    background-position: center;
    transition: 1s;
    box-shadow: 0 30px 50px #505050;
    background-repeat: no-repeat;
    background-size: cover;
    // z-index: 1;
  }
  .itm:nth-child(1),
  .itm:nth-child(2) {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateY(0);
    box-shadow: none;
    border-radius: 0;
  }
  .itm:nth-child(n + 3) {
    top: 50%;
  }

  //   .itm:nth-child(3) {
  //     left: 70%;
  //   }
  //   .itm:nth-child(4) {
  //     left: calc(70% + 250px);
  //   }
  //   .itm:nth-child(5) {
  //     left: calc(70% + 500px);
  //   }
  //   .itm:nth-child(6) {
  //     left: calc(70% + 750px);
  //     opacity: 0;
  //   }
  .btn {
    &:hover {
      .el-icon {
        &:nth-child(1) {
          transform: translateX(0);
        }
        &:nth-child(2) {
          transform: translateX(0);
        }
      }
    }
  }
  .btn .el-icon {
    height: 100px;
    width: 50px;
    border-radius: 5px;
    margin: 0 25px;
    color: #fff;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    user-select: none;
    transition: all 0.5s;
    &:nth-child(1) {
      transform: translateX(-100px);
    }
    &:nth-child(2) {
      transform: translateX(100px);
    }
  }
}
</style>
