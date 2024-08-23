import request from "@/utils/request"
import { AnimeListResponse, AnimeDetailResponse, AnimeImageListResponse } from "@/types/admin/animation"

/**
 *
 * @param page 页码
 * @param pageSize 页数
 * @returns
 */
// 获取动漫列表
export const getAnimationListAPI = (page: number, pageSize: number) => {
  return request.get<any, AnimeListResponse>("/web/animation/list", {
    params: {
      page,
      pageSize
    }
  })
}

// 获取动漫详情
export const getAnimationDetailAPI = (id: string) => {
  return request.get<any, AnimeDetailResponse>(`/web/animation/detail?id=${id}`)
}

// 获取动漫图片
export const getAnimationImageListAPI = (id: string, page: number, pageSize: number) => {
  return request.get<any, AnimeImageListResponse>(`/web/animation/imgList?id=${id}&page=${page}&pageSize=${pageSize}`)
}
