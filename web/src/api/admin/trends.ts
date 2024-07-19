import request from "@/utils/request"

// 添加动态
export const addTrendsAPI = (data: FormData) => {
  return request.post<any, any>("/admin/trends/add", data)
}

// 获取动态列表
export const getTrendsListAPI = (page: number, pageSize: number) => {
  return request.get<any, any>(`/admin/trends/list?page=${page}&pageSize=${pageSize}`)
}

// 获取动态详情
export const getTrendsDetailAPI = (id: string) => {
  return request.get<any, any>(`/admin/trends/detail?id=${id}`)
}

// 修改动态
export const updateTrendsAPI = (data: FormData) => {
  return request.put<any, any>("/admin/trends/update", data)
}
// 删除动态
export const deleteTrendsAPI = (id: string) => {
  return request.delete<any, any>(`/admin/trends/del?id=${id}`)
}

// 浏览动态
export const viewTrendsAPI = (id: string) => {
  return request.put<any, any>(`/admin/trends/browse?id=${id}`)
}

// 点赞
export const likeTrendsAPI = (id: string) => {
  return request.put<any, any>(`/admin/trends/like?id=${id}`)
}
