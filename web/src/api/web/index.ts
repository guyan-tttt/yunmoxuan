import request from "@/utils/request"
import type { UserInfoResponseData } from "@/types/admin/user"
import type { ImageListResponse } from "@/types/admin/image"
import type { GetCategoryListResponse } from "@/types/admin/category"
import type { GetTagsResponseData } from "@/types/admin/tags"

// 获取网站作者信息
export const getAuthorInfoAPI = () => {
  return request.get<any, UserInfoResponseData>("/web/index/user")
}

// 获取轮播图信息
export const getBannerAPI = () => {
  return request.get<any, ImageListResponse>("/web/index/banner")
}

// 获取分类列表
export const getCategoryAPI = () => {
  return request.get<any, GetCategoryListResponse>("/web/index/category")
}

// 获取文章标签
export const getTagAPI = () => {
  return request.get<any, GetTagsResponseData>("/web/index/tag")
}
