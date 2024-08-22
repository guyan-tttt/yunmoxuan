import request from "@/utils/request"
import { AnimeListResponse, ResponseData, AnimeDetailResponse, AnimeImageListResponse } from "@/types/admin/animation"
import type { ImageItem } from "@/types/admin/image"
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

// 获取动漫图片
export const getAnimationImageListAPI = (id: string, page: number, pageSize: number) => {
  return request.get<any, AnimeImageListResponse>(`/admin/animation/imgList?id=${id}&page=${page}&pageSize=${pageSize}`)
}

// 删除动漫
export const deleteAnimationAPI = (id: string) => {
  return request.delete<any, ResponseData>(`/admin/animation/del?id=${id}`)
}

// 更新动漫
export const updateAnimationAPI = (data: FormData) => {
  return request.put<any, ResponseData>("/admin/animation/update", data)
}

// 删除动漫图片
export const deleteAnimationImgAPI = (data: ImageItem[]) => {
  return request.post<any, ResponseData>("/admin/animation/delImg", data)
}
