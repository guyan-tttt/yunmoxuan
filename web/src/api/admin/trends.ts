import request from "@/utils/request"
import axios from "axios"

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

// 获取省份信息
export const getProvinceAPI = () => {
  const key = "9a9209f6b06f46573c5f93f5e9836bfd"
  return axios.get(`https://restapi.amap.com/v3/config/district?key=${key}&keywords=中国`)
}

// 添加评论
export const addCommentAPI = (data: any) => {
  return request.post<any, any>("/admin/trends/comment/add", data)
}
// 获取评论列表
export const getCommentListAPI = (page: number, pageSize: number, trendsID: string) => {
  return request.get<any, any>(`/admin/trends/comment/list?page=${page}&pageSize=${pageSize}&trendsID=${trendsID}`)
}
// 删除评论
export const deleteCommentAPI = (id: string) => {
  return request.delete<any, any>(`/admin/trends/comment/del?id=${id}`)
}
