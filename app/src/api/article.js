import request from "@/utils/request"

// 获取推荐文章
export const getRecommendArticleAPI = () => {
    return request.get("/article/recommendArticle")
}

// 获取文章列表
export const getArticleListAPI = (page, pageSize) => {
    return request.get(`/article/articleList?page=${page}&pageSize=${pageSize}`)
}

// 获取文章详情
export const getArticleDetailAPI = (id) => {
    return request.get(`/article/detail/${id}`)
}

// 获取文章评论
export const getArticleCommentAPI = ({id, page, pageSize}) => {
    return request.get(`/article/comment/list/${id}?page=${page}&pageSize=${pageSize}`)
}

// 添加评论
export const addCommentAPI = (data) => {
    return request.post("/article/comment", data)
}

// 文章搜索
export const searchArticleAPI = (keyWord) => {
    return request.get(`/article/search?keyword=${keyWord}`)
}