<template>
  <div id="look" />
</template>

<script setup lang="ts">
import { onMounted, defineProps, ref, watch } from "vue"
import * as echarts from "echarts"
const props = defineProps<{
  data: any
}>()

// 随机色彩库
const colors = ["#ff5800", "#a90000", "#ffaf00", "#9e42ff", "#0096ff", "#00ff00", "#00ff00"]

// 数据
const dataX = ref<string[]>([])
const dataY = ref<{ value: number; itemStyle: any }[]>([])
// 数据处理
const handleData = (data: any) => {
  const keys = Object.keys(data)
  dataX.value = keys
  for (const key in data) {
    const item = data[key]
    if (item.length === 0) {
      dataY.value.push({
        value: 0,
        itemStyle: {
          color: "#00ff00"
        }
      })
    } else {
      const sum = item.reduce((p: number, i: any) => p + i.lookNum, 0)
      // 取一个随机颜色
      const color = colors[Math.floor(Math.random() * 7)]
      dataY.value.push({
        value: sum,
        itemStyle: {
          color: color
        }
      })
    }
  }
  // 更新图表数据
  myChart1.setOption({
    title: {
      text: "近7天浏览量"
    },
    tooltip: {
      trigger: "item"
    },
    xAxis: {
      type: "category",
      data: dataX.value
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: dataY.value,
        type: "bar",
        label: {
          normal: {
            show: true, // 开启显示标签
            position: "top", // 标签显示位置
            formatter: function (params: any) {
              return params.value // 显示的数据标签内容
            }
          }
        }
      }
    ]
  })
}

watch(
  () => props.data,
  () => {
    handleData(props.data)
  }
)

// 图表对象
let myChart1: any = null

// 初始化
onMounted(() => {
  // 数据计算

  // 浏览量统计
  //@ts-ignore
  myChart1 = echarts.init(document.getElementById("look"))
  // 绘制图表
})
</script>

<style scoped>
#look {
  width: 100%;
  height: 400px;
  margin: 0 auto;
  margin-top: 50px;
  z-index: 100;
}
</style>
