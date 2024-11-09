<template>
  <el-card class="mb-3">
    <div class="mb-2 font-bold text-gray-900 uppercase dark:text-white head">⌛ 似水流年</div>
    <ul class="list">
      <li class="item" v-for="item in timeObj" :key="item.num">
        <p>{{ item.text }}</p>
        <div class="line">
          <div class="bg" :style="{ backgroundColor: item.color, width: `${item.percentage * 180}px` }" />
          <div class="nprogess" />
          <div class="num">{{ (item.percentage * 100).toFixed(0) }} %</div>
        </div>
      </li>
    </ul>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
// 当前时间的对象数据
const timeObj = ref<any>([
  {
    num: 0,
    text: "",
    percentage: 0,
    color: "red"
  }
])

// 生成随机颜色的函数
const setColor = () => {
  const deg = Math.floor(360 * Math.random())
  const color = `hsl(${deg}, 54%, 63%)`
  return color
}

onMounted(() => {
  // 生成本日数据
  const day = {
    num: new Date().getHours(),
    text: `今天已经过去了${new Date().getHours()}小时`,
    percentage: new Date().getHours() / 24,
    color: setColor()
  }
  timeObj.value[0] = day

  //   生成本周数据
  const week = {
    num: new Date().getDay(),
    text: `本周已经过去了${new Date().getDay()}天`,
    percentage: new Date().getDay() / 7,
    color: setColor()
  }
  timeObj.value[1] = week
  //   生成本月数据
  const mounth = {
    num: new Date().getDate() - 1,
    text: `本月已经过去了${new Date().getDate() - 1}天`,
    percentage: (new Date().getDate() - 1) / 30,
    color: setColor()
  }
  timeObj.value[2] = mounth
  //   生成本年数据
  const year = {
    num: new Date().getMonth() + 1,
    text: `今年已经过去了${new Date().getMonth() + 1}月`,
    percentage: (new Date().getMonth() + 1) / 12,
    color: setColor()
  }
  timeObj.value[3] = year
  //   计算下一年数据
  //   计算当前时间到下一年还差多少天
  const nextYear = new Date().getFullYear() + 1
  //   计算两年之间的时间差
  const time = new Date(nextYear, 0, 1).getTime() - new Date().getTime()

  const date = Math.floor(time / 1000 / 60 / 60 / 24)
  const year2 = {
    num: date,
    text: `距离${nextYear}年还差${date}天`,
    percentage: (365 - date) / 365,
    color: setColor()
  }
  timeObj.value[4] = year2
})
</script>

<style scoped lang="scss">
.head {
  border-bottom: 1px dashed #ccc;
  padding-bottom: 10px;
}
.list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  padding: 0 !important;
  margin: 0;
  color: rgb(119, 119, 119);
  .item {
    width: 100%;
    p {
      font-size: 14px;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .line {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: end;
      position: relative;

      .bg {
        width: 100px;
        height: 10px;

        position: absolute;
        left: 0;
        z-index: 100;
        border-radius: 20px;
        box-shadow: #409eff 0px 2px 5px 0px;
        background-size: 40px 40px;
        background-image: linear-gradient(
          45deg,
          rgba(255, 255, 255, 0.5) 25%,
          transparent 25%,
          transparent 50%,
          rgba(255, 255, 255, 0.5) 50%,
          rgba(255, 255, 255, 0.5) 75%,
          transparent 75%,
          transparent
        );
        animation: 9s linear 0s infinite normal none running identifier;
        @keyframes identifier {
          0% {
            background-position: 0px 0px;
          }
          100% {
            background-position: 400px 0px;
          }
        }
      }
      .nprogess {
        width: 180px;
        height: 10px;
        background-color: #eee;
        position: absolute;
        left: 0;
        z-index: 0;
        border-radius: 20px;
      }
      .num {
        font-size: 14px;
      }
    }
  }
}
</style>
