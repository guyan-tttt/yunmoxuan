import request from "@/utils/request"
import type { ImageCategoryItem, ResponseData, GetCategoryListResponse } from "@/types/admin/imageCategory"

// 添加图片分类
export const addImageCategoryAPI = (data: ImageCategoryItem) => {
  return request.post<any, ResponseData>("/admin/imageCategory/add", data)
}

// 获取全部分类
export const getImageCategoryListAPI = () => {
  return request.get<any, GetCategoryListResponse>("/admin/imageCategory/list")
}

// 更新图片分类
export const updateImageCategoryAPI = (data: ImageCategoryItem) => {
  return request.put<any, ResponseData>("/admin/imageCategory/update", data)
}

// 删除图片分类
export const deleteImageCategoryAPI = (id: string) => {
  return request.delete<any, ResponseData>(`/admin/imageCategory/del?id=${id}`)
}
