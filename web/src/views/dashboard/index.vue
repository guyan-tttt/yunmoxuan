<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user"
import { onMounted, computed, ref } from "vue"
import { usePermissionStore } from "@/store/modules/permission"
import SeamLessScroll from "./components/SeamlessScroll.vue"
import EChart from "./components/Echart.vue"
import { CountTo } from "vue3-count-to"
import { getDashboardStatisticsAPI, getDashboardNoticeAPI } from "@/api/admin/dashboard"
import type { StatisticsData } from "@/types/admin/dashboard"
import { getArticleStatisticsAPI } from "@/api/admin/article"
import type { ArticleStatistics } from "@/types/admin/article"
import type { TrendsStatistics } from "@/types/admin/trends"
import { getTrendsStatisticsAPI } from "@/api/admin/trends"
import type { CalendarDateType, CalendarInstance } from "element-plus"

// 权限仓库
const permissionStore = usePermissionStore()
// 用户信息仓库
const userStore = useUserStore()

// 快捷路由
const noHiddenRoutes = computed(() => {
  return permissionStore.routes?.filter((item: any) => !item.meta?.hidden).slice(1) ?? []
})

// 当前时间
const nowTime = ref(new Date())

// 首页统计数据
const dashboardStatistics = ref<StatisticsData>()

// 获取统计数据
const getDashboardStatistics = async () => {
  const res = await getDashboardStatisticsAPI()
  if (res.code === 200) {
    dashboardStatistics.value = res.data
  }
}

// 文章统计数据
const articleStatistics = ref<ArticleStatistics>()

// 获取文章统计数据
const getArticleStatistics = async () => {
  const res = await getArticleStatisticsAPI()
  if (res.code === 200) {
    articleStatistics.value = res.data
  }
}

// 动态统计数据
const trendsStatistics = ref<TrendsStatistics>()

// 获取动态统计数据
const getTrendsStatistics = async () => {
  const res = await getTrendsStatisticsAPI()
  if (res.code === 200) {
    trendsStatistics.value = res.data
  }
}

// 日历对象
const calendar = ref<CalendarInstance>()

// 切换日历
const changeCalendar = (date: CalendarDateType) => {
  if (!calendar.value) return
  calendar.value?.selectDate(date)
}

// 通知公告数据
const notice = ref<any[]>([])

// 获取通知公告信息
const getNotice = async () => {
  const res = await getDashboardNoticeAPI()
  if (res.code === 200) {
    notice.value = res.data
  }
}
// 页面挂载时获取用户信息
onMounted(() => {
  userStore.setUserInfo()
  getDashboardStatistics()
  getArticleStatistics()
  getTrendsStatistics()
  getNotice()
})
</script>

<template>
  <div class="dashboard">
    <el-card>
      <div class="container">
        <!-- 左侧内容 -->
        <div class="left">
          <div class="panel">
            <!-- 个人信息 -->
            <div class="user-info animate__animated animate__bounce">
              <img class="avatar" src="../../assets/layouts/logo.png" alt="" />
              <div class="company-info">
                <div class="title">
                  极客空间-jeekspace
                  <span>开发版</span>
                </div>
                <div class="depart">{{ userStore.userInfo?.nickname }} ｜ 管理员🧑‍💻</div>
              </div>
            </div>
            <!-- 代办 -->
            <div class="todo-list">
              <div class="todo-item">
                <span>文章总数</span>
                <!-- 起始值 终点值  滚动时间 -->
                <countTo :startVal="0" :endVal="dashboardStatistics?.articleNum" :duration="1000" />
              </div>
              <div class="todo-item">
                <span>分类总数</span>
                <countTo :startVal="0" :endVal="dashboardStatistics?.categoryNum" :duration="1000" />
              </div>
              <div class="todo-item">
                <span>标签总数</span>
                <countTo :startVal="0" :endVal="dashboardStatistics?.tagNum" :duration="1000" />
              </div>
              <div class="todo-item">
                <span>图片数量</span>
                <countTo :startVal="0" :endVal="dashboardStatistics?.pictureNum" :duration="1000" />
              </div>
              <div class="todo-item">
                <span>动态数量</span>
                <countTo :startVal="0" :endVal="dashboardStatistics?.trendsNum" :duration="1000" />
              </div>
              <div class="todo-item">
                <span>文章评论数</span>
                <countTo :startVal="0" :endVal="dashboardStatistics?.articleCommentNum" :duration="1000" />
              </div>
              <div class="todo-item">
                <span>动态评论数</span>
                <countTo :startVal="0" :endVal="dashboardStatistics?.trendsCommentNum" :duration="1000" />
              </div>
            </div>
          </div>
          <!-- 快捷入口 -->
          <div class="panel">
            <div class="panel-title animate__animated animate__bounce">⏩ 快捷入口</div>
            <div class="quick-entry">
              <div class="entry-item" v-for="item in noHiddenRoutes" :key="item.path">
                <router-link  class="entry-item" :to="item.path">
                  <div class="entry-icon">
                    <SvgIcon class="icon" :name="item.children![0].meta?.svgIcon as string" />
                  </div>
                  <span>{{ item.children![0].meta?.title }}</span>
                </router-link>
              </div>
            </div>
          </div>
          <!-- 图表数据 -->
          <div class="panel">
            <div class="panel-title animate__animated animate__bounce">📈 文章数据</div>
            <div class="chart-container">
              <div class="chart-info">
                <div class="info-main">
                  <span>文章总数</span>
                  <countTo :startVal="0" :endVal="articleStatistics?.articleNum" :duration="1000" />
                </div>
                <div class="info-list">
                  <div class="info-list-item">
                    <span>已发布</span>
                    <countTo :startVal="0" :endVal="articleStatistics?.articlePublishNum" :duration="1000" />
                  </div>
                  <div class="info-list-item">
                    <span>未发布</span>
                    <countTo :startVal="0" :endVal="articleStatistics?.articleUnPublishNum" :duration="1000" />
                  </div>
                  <div class="info-list-item">
                    <span>回收站</span>
                    <countTo :startVal="0" :endVal="articleStatistics?.articleDeleteNum" :duration="1000" />
                  </div>
                </div>
              </div>
              <div class="chart">
                <EChart :data="articleStatistics?.weekData" />
              </div>
            </div>
          </div>
          <!-- 图表数据 -->
          <div class="panel">
            <div class="panel-title animate__animated animate__bounce">📉 动态数据</div>
            <div class="chart-container">
              <div class="chart-info">
                <div class="info-main">
                  <span>动态发布量</span>
                  <countTo :startVal="0" :endVal="trendsStatistics?.trendNum" :duration="1000" />
                </div>
                <div class="info-list">
                  <div class="info-list-item">
                    <span>点赞量</span>
                    <countTo :startVal="0" :endVal="trendsStatistics?.likeNum" :duration="1000" />
                  </div>
                  <div class="info-list-item">
                    <span>浏览量</span>
                    <countTo :startVal="0" :endVal="trendsStatistics?.lookNum" :duration="1000" />
                  </div>
                  <div class="info-list-item">
                    <span>评论量</span>
                    <countTo :startVal="0" :endVal="trendsStatistics?.commentNum" :duration="1000" />
                  </div>
                </div>
              </div>
              <div class="chart">
                <EChart :data="trendsStatistics?.weekData" />
              </div>
            </div>
          </div>
        </div>
        <!-- 右侧内容 -->
        <div class="right">
          <!-- 帮助链接 -->
          <div class="panel animate__animated animate__fadeInRight">
            <div class="help">
              <div class="help-right">
                <div class="calendar">
                  <el-calendar ref="calendar" v-model="nowTime">
                    <template #header="{ date }">
                      <span class="">年度日历</span>
                      <span>{{ date }}</span>
                      <el-button-group>
                        <el-button size="small" @click="changeCalendar('prev-month')">上个月</el-button>
                        <el-button size="small" @click="changeCalendar('today')">当前时间</el-button>
                        <el-button size="small" @click="changeCalendar('next-month')">下个月</el-button>
                      </el-button-group>
                    </template>
                  </el-calendar>
                </div>
              </div>
            </div>
          </div>
          <!-- 通知公告 -->
          <el-card style="margin-top: 50px" class="panel2 animate__animated animate__fadeInRight">
            <div class="panel-title">🔔 通知公告</div>
            <SeamLessScroll :data="notice" />
          </el-card>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  width: 100%;

  ::v-deep(.el-calendar-day) {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ::v-deep(.el-calendar-table__row td) {
    border: none;
  }
  .date-content {
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
  }
  .date-content .rest {
    border-radius: 50%;
    background: rgb(250, 124, 77);
    width: 20px;
    height: 20px;
    line-height: 20px;
    display: inline-block;
    font-size: 12px;
    margin-left: 10px;
  }
  .date-content .text {
    width: 20px;
    height: 20px;
    line-height: 20px;
    display: inline-block;
  }
  ::v-deep(.el-calendar-table td.is-selected .el-calendar-day) {
    background: rgb(108, 224, 253);
    color: #fff;
    border-radius: 10px;
  }
  .container {
    display: flex;
    .right {
      width: 40%;

      .panel {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 8px;
      }
      .panel2 {
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 8px;
        margin: auto;
        .panel-title {
          font-size: 20px;
          font-weight: 500;
        }
      }
      :nth-child(1) {
        margin-top: 0;
      }
    }
    .left {
      flex: 1;
      :nth-child(1) {
        margin-top: 0;
      }
    }
    .panel {
      margin-top: 8px;
      padding: 20px;
      .panel-title {
        font-size: 20px;
        font-weight: 500;
      }
      // 用户信息样式
      .user-info {
        display: flex;
        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          // background-color: #d9d9d9;
          line-height: 48px;
          text-align: center;
        }
        .username {
          width: 30px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          border-radius: 50%;
          background: #04c9be;

          margin-right: 4px;
        }
        .company-info {
          margin-left: 10px;
          height: 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .title {
            font-weight: 700;
            font-size: 20px;
            font-family:
              PingFang SC,
              PingFang SC-Medium;
            span {
              font-size: 12px;
              background: #5387f0;
              text-align: center;
              padding: 2px 8px;
              color: #fff;
              border-radius: 5px;
            }
          }
          .depart {
            font-size: 14px;

            font-weight: 400;
          }
        }
      }
      // 代办样式
      .todo-list {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        .todo-item {
          width: 18%;
          height: 90px;
          display: flex;
          flex-direction: column;
          padding: 10px;
          justify-content: space-around;
          :nth-child(1) {
            font-size: 14px;
          }
          :nth-child(2) {
            font-size: 30px;
            font-weight: 500;
          }
        }
      }
      // 快捷入口
      .quick-entry {
        margin-top: 16px;
        display: flex;
        .entry-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-left: 60px;
          &:nth-child(1) {
            margin-left: 0px;
          }
          .entry-icon {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            background: #5387f0;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: inset 0px -1px 4px rgba(0, 0, 0, 0.3);
            .icon {
              color: #fff;
              width: 27px;
              height: 27px;
            }
          }
          span {
            font-size: 14px;
            margin-top: 8px;
            &:hover {
              color: #5387f0;
            }
          }
        }
      }
      // 图表数据
      .chart-container {
        display: flex;
        .chart-info {
          width: 240px;
          margin-top: 10px;
          .info-main {
            padding: 10px;
            display: flex;
            flex-direction: column;
            :nth-child(1) {
              font-size: 14px;
            }
            :nth-child(2) {
              margin-top: 10px;
              font-size: 30px;
              color: #04c9be;
              font-weight: 500;
            }
          }
          .info-list {
            // background: #f5f6f8;
            border-radius: 4px;
            padding: 12px 15px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            .info-list-item {
              width: 50%;
              margin-top: 10px;
              display: flex;
              flex-direction: column;

              :nth-child(1) {
                font-size: 14px;
              }
              :nth-child(2) {
                margin-top: 10px;
                font-size: 30px;
                font-weight: 500;
              }
            }
          }
        }
        .chart {
          flex: 1;
        }
      }
      // 帮助链接
      .help {
        display: flex;
        border: 1px solid #ecf5ff;
        .help-left {
          width: 40%;
        }
        .help-right {
          flex: 1;
        }
        .help-list {
          .help-block {
            // background: #f5f6f8;
            border-radius: 4px;
            width: 264px;
            height: 54px;
            padding: 17px 10px;
            font-size: 14px;
            margin-top: 10px;
            i {
              width: 14px;
              height: 14px;
              display: inline-block;
              background-size: cover;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
}
</style>
