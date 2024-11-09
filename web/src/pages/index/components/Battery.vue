<template>
  <el-card class="mb-3">
    <div class="mb-2 font-bold text-gray-900 uppercase dark:text-white head">🔋 本机电量</div>
    <div class="loader">
      <div
        class="bg"
        :class="{ active: charging }"
        :style="{
          width: `${level * 100}%`,
          backgroundColor: `${level < 0.2 ? 'red' : 'var(--primary-color)'}`
        }"
      />
      <div class="progress" />
      <span class="num"> 当前电量:{{ level * 100 }}% {{ charging ? "⚡" : "" }}</span>
    </div>
    <div class="list">
      <div class="item">
        <span class="name"> 电池状态 </span>
        <span class="value" v-if="charging"> {{ chargingTime !== 0 ? "正在充电" : "已充满" }}</span>
        <span class="value" v-else> 未充电</span>
      </div>
      <div class="item" v-if="isFinite(dischargingTime)">
        <span class="name">预计还能用 </span>
        <span class="value"> {{ formatDuration(dischargingTime) }}</span>
      </div>
      <div class="item" v-if="isFinite(chargingTime)">
        <span class="name">预计充满还需 </span>
        <span class="value"> {{ chargingTime }}</span>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
// import { computed } from "vue"
import { useBattery } from "@vueuse/core"

const { charging, chargingTime, dischargingTime, level } = useBattery()

console.log(charging.value, chargingTime.value, dischargingTime.value, level.value)

function formatDuration(milliseconds: any) {
  milliseconds = parseInt(milliseconds)
  // 计算小时数
  const hours = Math.floor(milliseconds / 3600)
  // 计算分钟数
  const minutes = Math.floor((milliseconds % 3600) / 60)
  // 计算秒数
  const seconds = Math.floor(milliseconds % 60)

  // 格式化为两位数
  const formatNumber = (n: number) => (n < 10 ? "0" + n : n)

  // 返回格式化的时间字符串
  return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`
}
</script>

<style scoped lang="scss">
.head {
  border-bottom: 1px dashed #ccc;
  padding-bottom: 10px;
}
.loader {
  width: 100%;
  height: 50px;
  background-color: #ececec;
  border-radius: 10px;
  border: 1px solid #ececec;
  margin: 0 auto;
  display: flex;
  // justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-direction: column;
  position: relative;
  .bg {
    width: 50%;
    height: 50px;

    background-color: var(--primary-color);
    position: absolute;
    left: 0;
    z-index: 10;
    box-shadow: #409eff 0px 2px 5px 0px;
    background-size: 40px 40px;
    animation: 9s linear 0s infinite normal none running identifier;
    @keyframes identifier {
      0% {
        background-position: 0px 0px;
      }
      100% {
        background-position: 400px 0px;
      }
    }
    &.active {
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
    }
  }
  .nprogess {
    width: 100%;
    height: 50px;
    background-color: #ececec;
    position: absolute;
    left: 0;
    z-index: 0;
    border-radius: 20px;
  }
  .num {
    width: 100%;
    font-size: 18px;
    position: absolute;
    text-align: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
    filter: drop-shadow(0 0 1px #000);
    color: #fff;
  }
}
.list {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  .item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    .name {
      font-size: 16px;
      color: #666;
    }
    .value {
      font-size: 14px;
      color: #fff;
      filter: drop-shadow(0 0 1px #000);
    }
  }
}
</style>
