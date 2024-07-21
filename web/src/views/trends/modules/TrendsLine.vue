<template>
  <div id="like" />
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import * as echarts from "echarts"
onMounted(() => {
  //   点赞数统计量
  const myChart3 = echarts.init(document.getElementById("like"))
  // 绘制图表
  myChart3.setOption({
    title: {
      text: "近6个月点赞量"
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        areaStyle: {}
      }
    ]
  })
})
</script>

<style scoped>
#like {
  width: 100%;
  height: 400px;
  margin: 0 auto;
  margin-top: 50px;
  z-index: 100;
}
</style>
