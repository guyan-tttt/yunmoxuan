import request from "@/utils/request"

// 获取推荐文章
export const getRecommendArticleAPI = () => {
    return request.get("/article/recommendArticle")
}

// 获取文章列表
export const getArticleListAPI = (page, pageSize) => {
    return request.get(`/article/articleList?page=${page}&pageSize=${pageSize}`)
}


