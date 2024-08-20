import request from "@/utils/request"
import { AnimeListResponse, ResponseData, AnimeDetailResponse } from "@/types/admin/animation"
import axios from "axios"

// 添加动漫
export const addAnimationAPI = (data: FormData) => {
  return request.post<any, ResponseData>("/admin/animation/add", data)
}

/**
 *
 * @param page 页码
 * @param pageSize 页数
 * @returns
 */
// 获取动漫列表
export const getAnimationListAPI = (page: number, pageSize: number) => {
  return request.get<any, AnimeListResponse>("/admin/animation/list", {
    params: {
      page,
      pageSize
    }
  })
}

// 获取动漫详情
export const getAnimationDetailAPI = (id: string) => {
  return request.get<any, AnimeDetailResponse>(`/admin/animation/detail?id=${id}`)
}

// 上传动漫图片
export const uploadAnimationImageAPI = (data: FormData) => {
  return request.post<any, ResponseData>("/admin/animation/addImg", data)
}
