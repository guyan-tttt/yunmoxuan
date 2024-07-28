import request from "@/utils/request"
import { ArticleList } from "@/types/admin/article"

// 获取推荐文章
export const getRecommendArticleAPI = () => {
  return request.get<any, ArticleList>("/web/article/recommends")
}

// 获取去文章列表
export const getArticleListAPI = (page: number, pageSize: number) => {
  return request.get<any, ArticleList>("/web/article/list", { params: { page, pageSize } })
}

// 文章点赞
export const articleLikeAPI = (id: string) => {
  return request.post<any, ArticleList>(`/web/article/like?id=${id}`)
}
