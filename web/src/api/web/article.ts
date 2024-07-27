import request from "@/utils/request"
import { ArticleList } from "@/types/admin/article"

// 获取推荐文章
export const getRecommendArticleAPI = () => {
  return request.get<any, ArticleList>("/web/article/recommends")
}
