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

// 添加系统日志
export const addSystemJournalAPI = (data: any) => {
  return request.post<any, any>("/admin/dashboard/journal", data)
}

// 获取系统日志列表
export const getSystemJournalListAPI = (page: number, pageSize: number) => {
  return request.get<any, any>("/admin/dashboard/journal", {
    params: {
      page,
      pageSize
    }
  })
}
