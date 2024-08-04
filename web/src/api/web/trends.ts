import request from "@/utils/request"
import type { GetTrendsListResponseData, ResponseData, CommentFormData, GetCommentListResponseData } from "@/types/admin/trends"

// 获取动态列表
export const getTrendsListAPI = (page: number, pageSize: number) => {
  return request.get<any, GetTrendsListResponseData>("/web/trends/list", {
    params: {
      page,
      pageSize
    }
  })
}

// 获取评论列表
export const getTrendsCommentListAPI = (page: number, pageSize: number, trendsID: string) => {
  return request.get<any, GetCommentListResponseData>("/web/trends/comment/list", {
    params: {
      page,
      pageSize,
      trendsID
    }
  })
}
// 添加评论
export const addTrendsCommentAPI = (data: CommentFormData) => {
  return request.post<any, ResponseData>("/web/trends/comment/add", data)
}

// 点赞动态
export const likeTrendsAPI = (trendsID: string) => {
  return request.post<any, ResponseData>(`/web/trends/like?id=${trendsID}`)
}
