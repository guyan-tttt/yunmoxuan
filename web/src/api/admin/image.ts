import request from "@/utils/request"
import type { ResponseData, ImageListResponse } from "@/types/admin/image"
// 上传图片
export const uploadImageAPI = (data: FormData) => {
  return request.post<any, ResponseData>("/admin/image/upload", data)
}

// 获取图片列表
export const getImageListAPI = (page: number, pageSize: number, type: string) => {
  return request.get<any, ImageListResponse>(`/admin/image/list?page=${page}&pageSize=${pageSize}&type=${type}`)
}

// 删除图片
export const deleteImageAPI = (id: string) => {
  return request.delete<any, ResponseData>(`/admin/image/del/${id}`)
}

// 下载图片
export const downloadImageAPI = (id: string) => {
  return request.get<any, ResponseData>(`/admin/image/download/${id}`, { responseType: "blob" })
}
