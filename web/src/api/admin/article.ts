import request from "@/utils/request"
import type { ResponseData, ArticleList, ArticleDetail } from "@/types/admin/article"
// 添加文章
export const addArticleAPI = (data: FormData) => {
  return request.post<any, ResponseData>("/admin/article/add", data)
}

// 获取文章列表
export const getArticleListAPI = (page: number, pageSize: number) => {
  return request.get<any, ArticleList>(`/admin/article/list?page=${page}&pageSize=${pageSize}`)
}

// 获取文章详情
export const getArticleDetailAPI = (id: string) => {
  return request.get<any, ArticleDetail>(`/admin/article/detail?id=${id}`)
}
// 修改文章
export const updateArticleAPI = (data: FormData) => {
  return request.put<any, any>("/admin/article/update", data)
}
