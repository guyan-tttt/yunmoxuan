<template>
  <div id="chart" ref="myChart" />
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps, watch } from "vue"
// import * as echarts from "echarts"
import dayjs from "dayjs"
// 图标元素
const myChart = ref(null)

// 图表对象
let chart: any = null

// 获取数据
const props = defineProps<{
  data: Object | undefined
}>()

// 计算数据，渲染图标
const renderEchart = (data: any) => {
  const keys = Object.keys(data)

  const max = keys.sort((a, b) => {
    return dayjs(b).valueOf() - dayjs(a).valueOf()
  })[0]
  const dataX: string[] = []
  const dataY: number[] = []
  for (let i = 0; i < 7; i++) {
    const time = dayjs(max).subtract(i, "day").format("YYYY/MM/DD")
    if (data[time]) {
      dataY.push(data[time])
    } else {
      dataY.push(0)
    }

    dataX.push(dayjs(time).format("MM/DD"))
  }
  chart.setOption({
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: dataX.reverse()
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: dataY.reverse(),
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
}

watch(
  () => props.data,
  () => {
    renderEchart(props.data)
  }
)
onMounted(() => {
  //@ts-ignore
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
