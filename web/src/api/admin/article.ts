import request from "@/utils/request"
import type { ResponseData } from "@/types/admin/article"
// 添加文章
export const addArticleAPI = (data: FormData) => {
  return request.post<any, ResponseData>("/admin/article/add", data)
}

// 获取文章列表
export const getArticleListAPI = (page: number, pageSize: number) => {
  return request.get<any, any>(`/admin/article/list?page=${page}&pageSize=${pageSize}`)
}
