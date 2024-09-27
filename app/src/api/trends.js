import request from "@/utils/request"

// 获取动态列表
export const getTrendsListAPI = (page, pageSize) => {
    return request.get("/trends/lists?page=" + page + "&pageSize=" + pageSize)
}

// 获取评论列表
export const getTrendsCommentListAPI = ({page,pageSize,trendsID}) => {
    return request.get("/trends/comment/list?page=" + page + "&pageSize=" + pageSize + "&trendsID=" + trendsID)
}