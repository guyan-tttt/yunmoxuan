<template>
  <div id="like" />
</template>

<script setup lang="ts">
import { onMounted, defineProps, ref, watch } from "vue"
import * as echarts from "echarts"

const props = defineProps<{
  data: any
}>()

// 数据
const dataX = ref<string[]>([])
const dataY = ref<number[]>([])
// 数据处理
const handleData = (data: any) => {
  const keys = Object.keys(data)
  dataX.value = keys
  for (const key in data) {
    const item = data[key]
    if (item.length === 0) {
      dataY.value.push(0)
    } else {
      const sum = item.reduce((p: number, i: any) => p + i.likeNum, 0)
      // 取一个随机颜色
      dataY.value.push(sum)
    }
  }
  // 更新图表数据
  myChart3.setOption({
    title: {
      text: "近7天点赞量"
    },
    tooltip: {
      trigger: "item"
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: dataX.value
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: dataY.value,
        type: "line",
        areaStyle: {},
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
let myChart3: any = null

onMounted(() => {
  //   点赞数统计量
  myChart3 = echarts.init(document.getElementById("like"))
  // 绘制图表
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
