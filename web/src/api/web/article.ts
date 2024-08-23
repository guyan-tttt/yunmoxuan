import request from "@/utils/request"
import { ArticleList } from "@/types/admin/article"
import { ArticleDetail, ResponseData } from "@/types/web/article"
import type { ArticleCommentItem, ArticleCommentListResponse } from "@/types/web/article"

// 获取推荐文章
export const getRecommendArticleAPI = () => {
  console.log("dadadd")

  return request.get<any, ArticleList>("/web/article/recommendArticle")
}

// 获取去文章列表
export const getArticleListAPI = (page: number, pageSize: number) => {
  return request.get<any, ArticleList>("/web/article/articleList", { params: { page, pageSize } })
}

// 文章点赞
export const articleLikeAPI = (id: string) => {
  return request.post<any, ArticleList>(`/web/article/like?id=${id}`)
}

// 获取文章详情
export const getArticleDetailAPI = (id: string) => {
  return request.get<any, ArticleDetail>(`/web/article/detail/${id}`)
}

// 添加文章评论
export const addCommentAPI = (data: ArticleCommentItem) => {
  return request.post<any, ResponseData>(`/web/article/comment`, data)
}

// 获取文章评论列表
export const getCommentListAPI = (id: string, page: number, pageSize: number) => {
  return request.get<any, ArticleCommentListResponse>(`/web/article/comment/list/${id}?page=${page}&pageSize=${pageSize}`)
}

// 搜索文章
export const searchArticleAPI = (keyword: string) => {
  return request.get<any, ArticleList>(`/web/article/search?keyword=${keyword}`)
}
