import request from "@/utils/request"
import type { GetCategoryListResponse } from "@/types/admin/imageCategory"
import type { ImageListResponse } from "@/types/admin/image"

// 获取图片分类
export const getPictureCategoryAPI = () => {
  return request.get<any, GetCategoryListResponse>("/web/picture/category")
}

// 获取图片列表
export const getPictureListAPI = (categoryID: string, page: number, pageSize: number) => {
  return request.get<any, ImageListResponse>(`/web/picture/list/${categoryID}`, {
    params: {
      page,
      pageSize
    }
  })
}
