import request from "@/utils/request"

// 添加动态
export const addTrendsAPI = (data: FormData) => {
  return request.post<any, any>("/admin/trends/add", data)
}
