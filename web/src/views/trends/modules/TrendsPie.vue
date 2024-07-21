<template>
  <div id="publish" />
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import * as echarts from "echarts"

onMounted(() => {
  //   发布量统计
  const myChart2 = echarts.init(document.getElementById("publish"))
  // 绘制图表
  myChart2.setOption({
    title: {
      text: "近6个月发布量"
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      top: "bottom"
    },
    toolbox: {
      show: true,
      feature: {
        // mark: { show: true },
        dataView: { show: false, readOnly: false },
        restore: { show: false },
        saveAsImage: { show: false }
      }
    },
    series: [
      {
        name: "月发布量占比",
        type: "pie",
        radius: [20, 150],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8
        },

        data: [
          { value: 40, name: "1月" },
          { value: 38, name: "2月" },
          { value: 32, name: "3月" },
          { value: 30, name: "4月" },
          { value: 28, name: "5月" },
          { value: 26, name: "6月" }
        ]
      }
    ]
  })
})
</script>

<style scoped>
#publish {
  width: 100%;
  height: 400px;
  margin: 0 auto;
  margin-top: 50px;
  z-index: 100;
}
</style>
