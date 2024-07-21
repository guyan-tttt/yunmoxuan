<template>
  <div id="look" />
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import * as echarts from "echarts"

onMounted(() => {
  // 浏览量统计
  const myChart1 = echarts.init(document.getElementById("look"))
  // 绘制图表
  myChart1.setOption({
    title: {
      text: "近6个月浏览量"
    },
    xAxis: {
      type: "category",
      data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [
          {
            value: 200,
            itemStyle: {
              color: "#ff5800"
            }
          },
          {
            value: 120,
            itemStyle: {
              color: "#a90000"
            }
          },
          {
            value: 242,
            itemStyle: {
              color: "#ffaf00"
            }
          },
          {
            value: 109,
            itemStyle: {
              color: "#9e42ff"
            }
          },
          {
            value: 183,
            itemStyle: {
              color: "#3b93ff"
            }
          },
          {
            value: 161,
            itemStyle: {
              color: "#74ff3c"
            }
          }
        ],
        type: "bar"
      }
    ]
  })
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
