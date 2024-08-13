import request from "@/utils/request"
import type { StatisticResponse, LogData, ResponseData, LogResponse } from "@/types/admin/dashboard"
// 获取首页统计数据

export const getDashboardStatisticsAPI = () => {
  return request.get<any, StatisticResponse>("/admin/dashboard/statistics")
}

// 获取通知公告信息
export const getDashboardNoticeAPI = () => {
  return request.get<any, any>("/admin/dashboard/notice")
}

// 添加系统日志
export const addSystemJournalAPI = (data: LogData) => {
  return request.post<any, ResponseData>("/admin/dashboard/journal", data)
}

// 获取系统日志列表
export const getSystemJournalListAPI = (page: number, pageSize: number, view?: boolean) => {
  return request.get<any, LogResponse>("/admin/dashboard/journal", {
    params: {
      page,
      pageSize,
      view
    }
  })
}

// 删除日志
export const deleteJournalAPI = (id: string) => {
  return request.delete<any, ResponseData>(`/admin/dashboard/journal/${id}`)
}

// 阅读日志
export const readJournalAPI = (id: string) => {
  return request.put<any, ResponseData>(`/admin/dashboard/journal/${id}`)
}

// 获取通知消息
export const getNotificationAPI = (page: number, pageSize: number, view?: boolean) => {
  return request.get<any, LogResponse>("/admin/dashboard/message", {
    params: {
      page,
      pageSize,
      view
    }
  })
}

export const readMessageAPI = (id: string) => {
  return request.put<any, ResponseData>(`/admin/dashboard/message/${id}`)
}
