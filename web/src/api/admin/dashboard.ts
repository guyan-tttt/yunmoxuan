import request from "@/utils/request"
import type { StatisticResponse } from "@/types/admin/dashboard"
// 获取首页统计数据

export const getDashboardStatisticsAPI = () => {
  return request.get<any, StatisticResponse>("/admin/dashboard/statistics")
}

// 获取通知公告信息
export const getDashboardNoticeAPI = () => {
  return request.get<any, any>("/admin/dashboard/notice")
}
