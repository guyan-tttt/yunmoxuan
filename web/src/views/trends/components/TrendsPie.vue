<template>
  <div id="publish" />
</template>

<script setup lang="ts">
import { onMounted, defineProps, watch } from "vue"
// import * as echarts from "echarts"
// 接收数据
const props = defineProps<{
  data: any
}>()

// 数据处理
const handleData = (data: any) => {
  const dataValue = []
  for (const key in data) {
    dataValue.push({
      value: data[key].length,
      name: key
    })
    myChart2.setOption({
      title: {
        text: "近7天发布量"
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
          name: "发布量占比",
          type: "pie",
          radius: [20, 100],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 8
          },

          data: dataValue
        }
      ]
    })
  }
}

// 数据监听
watch(
  () => props.data,
  () => {
    handleData(props.data)
  }
)

// 图表对象
let myChart2: any = null
onMounted(() => {
  //   发布量统计
  //@ts-ignore
  myChart2 = echarts.init(document.getElementById("publish"))
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
