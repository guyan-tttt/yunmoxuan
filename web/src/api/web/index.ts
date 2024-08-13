import request from "@/utils/request"
import type { UserInfoResponseData } from "@/types/admin/user"
import type { ImageListResponse } from "@/types/admin/image"
import type { GetCategoryListResponse } from "@/types/admin/category"
import type { GetTagsResponseData } from "@/types/admin/tags"
import type { LogResponse } from "@/types/admin/dashboard"
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

// 获取日志列表
export const getJournalAPI = (page: number, pageSize: number) => {
  return request.get<any, LogResponse>(`/web/index/journal?page=${page}&pageSize=${pageSize}`)
}
