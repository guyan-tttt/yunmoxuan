<template>
  <div id="chart" ref="myChart" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import * as echarts from "echarts"
const myChart = ref(null)

let chart: any = null
onMounted(() => {
  chart = echarts.init(myChart.value)
  chart.setOption({
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [1, 2, 3, 4, 5, 6, 7]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [12, 23, 34, 25, 18, 34, 21],
        type: "line",
        areaStyle: {
          color: "#04c9be" // 填充颜色
        },
        lineStyle: {
          color: "#04c9be" // 线的颜色
        }
      }
    ]
  })
})
</script>

<style lang="scss" scoped>
#chart {
  width: 100%;
  height: 200px;
}
</style>
