import request from "@/utils/request"
import { ResponseData, ArticleList, ArticleDetail, ArticleStatisticsData } from "@/types/admin/article"
// 添加文章
export const addArticleAPI = (data: FormData) => {
  return request.post<any, ResponseData>("/admin/article/add", data)
}

// 获取文章列表
export const getArticleListAPI = (page: number, pageSize: number, articleType: number) => {
  return request.get<any, ArticleList>(`/admin/article/list?page=${page}&pageSize=${pageSize}&articleType=${articleType}`)
}

// 获取文章详情
export const getArticleDetailAPI = (id: string) => {
  return request.get<any, ArticleDetail>(`/admin/article/detail?id=${id}`)
}
// 修改文章
export const updateArticleAPI = (data: FormData) => {
  return request.put<any, ResponseData>("/admin/article/update", data)
}

// 删除文章
export const deleteArticleAPI = (id: string) => {
  return request.delete<any, ResponseData>(`/admin/article/del/${id}`)
}

// 切换发布状态
export const changePublishStatusAPI = (data: any) => {
  return request.put<any, ResponseData>(`/admin/article/publish`, data)
}

/**
 * 搜索文章API
 *
 * @param page 页码
 * @param pageSize 页大小
 * @param articleType 文章类型
 * @param tagsID 标签ID
 * @param categoryID 分类ID
 * @returns 返回文章列表
 */
// 搜索文章
export const searchArticleAPI = (page: number, pageSize: number, articleType: number, tagsID: string, categoryID: string) => {
  return request.get<any, ArticleList>(
    `/admin/article/search?page=${page}&pageSize=${pageSize}&tagsID=${tagsID}&categoryID=${categoryID}&articleType=${articleType}`
  )
}

// 删除文章恢复
export const deleteArticleRecoveryAPI = (id: string) => {
  return request.delete<any, ResponseData>(`/admin/article//recover/${id}`)
}

// 完全删除
export const deleteArticlePermanentlyAPI = (id: string) => {
  return request.delete<any, ResponseData>(`/admin/article/delArticle/${id}`)
}

// 批量删除
export const deleteArticleAll = (data: any) => {
  return request.post<any, ResponseData>(`/admin/article/delAll`, data)
}

// 获取文章统计量
export const getArticleStatisticsAPI = () => {
  return request.get<any, ArticleStatisticsData>(`/admin/article/statistics`)
}
