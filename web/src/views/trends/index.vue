<script setup lang="ts">
import { useUserStore } from "@/store/modules/user"
import { Plus } from "@element-plus/icons-vue"
import * as echarts from "echarts"
import { ref, onMounted } from "vue"

// 用户信息仓库
const userStore = useUserStore()

const srcList = [
  "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
  "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
  "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
  "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
  "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
  "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
  "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg"
]

// 初始化
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
        mark: { show: true },
        dataView: { show: false, readOnly: false },
        restore: { show: false },
        saveAsImage: { show: false }
      }
    },
    series: [
      {
        name: "月发布量占比",
        type: "pie",
        radius: [20, 180],
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

<template>
  <div>
    <el-card>
      <el-page-header icon="" title="">
        <template #icon />
        <template #title />
        <template #content>
          <div class="flex items-center">
            <el-avatar class="mr-3" :size="60" :src="userStore.userInfo?.avatar" />
            <span class="text-large font-600 mr-3"> {{ userStore.userInfo.nickname }}</span>
            <SvgIcon :name="userStore.userInfo?.gender === 1 ? 'boy' : 'girl'" style="width: 30px; height: 30px" />
            <el-tag>管理员</el-tag>
          </div>
        </template>
        <template #extra>
          <div class="flex items-center">
            <el-button type="primary" :icon="Plus">发布动态</el-button>
            <el-button type="success" class="ml-2">修改个人信息</el-button>
          </div>
        </template>

        <el-descriptions :column="3" class="mt-4">
          <el-descriptions-item label="用户昵称">{{ userStore.userInfo.nickname }}</el-descriptions-item>
          <el-descriptions-item label="用户电话"> {{ userStore.userInfo.phone }}</el-descriptions-item>
          <el-descriptions-item label="用户邮箱">{{ userStore.userInfo.email }}</el-descriptions-item>
          <el-descriptions-item label="备注">
            <el-tag size="small" type="success">前端开发</el-tag>
            <el-tag size="small">学生</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="GitHub">
            {{ userStore.userInfo.github }}
          </el-descriptions-item>
        </el-descriptions>
        <p class="mt-4 text-sm">
          {{ userStore.userInfo?.introduction }}
        </p>
      </el-page-header>
    </el-card>
    <el-card style="width: 80%; margin: 0 auto; position: relative">
      <el-timeline style="max-width: 50%">
        <el-timeline-item v-for="i in 4" :key="i" color="#409eff" timestamp="2018/4/12" placement="top">
          <el-row justify="space-between">
            <el-col :span="24">
              <el-card>
                <el-row>
                  <el-avatar class="mr-3" :size="30" :src="userStore.userInfo?.avatar" />
                  <span class="font-600 mr-3"> {{ userStore.userInfo.nickname }}</span>
                </el-row>
                <p>
                  在人生的旅途中，我们每个人都会遇到各种各样的挑战和困难。但请记住，每一次跌倒都是成长的机会，每一次失败都是向成功迈进的一步。
                </p>
                <el-row class="imageList">
                  <el-image
                    v-for="item in 9"
                    :key="item"
                    style="width: 30%; height: auto"
                    src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
                    :zoom-rate="1.2"
                    :max-scale="7"
                    :min-scale="0.2"
                    :preview-src-list="srcList"
                    :initial-index="4"
                    fit="cover"
                  />
                </el-row>
                <el-row justify="end" class="about">
                  <span><SvgIcon style="margin-right: 10px" name="like" size="18" />1213</span>
                  <span
                    ><el-icon style="margin-right: 10px" :size="18"><View /></el-icon>3414</span
                  >
                  <span
                    ><el-icon style="margin-right: 10px" :size="18"><ChatRound /></el-icon>123</span
                  >
                </el-row>
              </el-card></el-col
            >
            <el-col :span="11" />
          </el-row>
        </el-timeline-item>
      </el-timeline>
      <el-card class="echart" style="width: 45%; margin: 20px auto">
        <div class="main" id="look" />
        <div class="main" id="publish" />
        <div class="main" id="like" />
      </el-card>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.text-large {
  font-size: 26px;
}
::v-deep(.el-page-header__back) {
  display: none;
}
::v-deep(.el-divider--vertical) {
  border: 0;
}
.imageList {
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  .el-image {
    border-radius: 10px;
  }
}

.main {
  width: 90%;
  height: 400px;
}
.echart {
  position: absolute;
  top: 23px;
  right: 25px;
}
.about {
  margin-top: 20px;
  span {
    margin: 0 20px;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
}
</style>
