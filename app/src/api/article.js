import request from "@/utils/request"

// 获取推荐文章
export const getRecommendArticleAPI = () => {
    return request.get("/article/recommendArticle")
}
