import request from "@/utils/request"
import type { AddCategory, ResponseData, GetCategoryListResponse, CategoryItem } from "@/types/admin/category"

// 添加分类
export const addCategoryAPI = (data: AddCategory) => {
  return request.post<any, ResponseData>("/admin/category/add", data)
}

// 获取分类列表
export const getCategoryListAPI = (page: number, pageSize: number) => {
  return request.get<any, GetCategoryListResponse>(`/admin/category/list?page=${page}&pageSize=${pageSize}`)
}

// 更新分类
export const updateCategoryAPI = (data: CategoryItem) => {
  return request.put<any, ResponseData>("/admin/category/update", data)
}
// 删除分类
export const deleteCategoryAPI = (id: string) => {
  return request.delete<any, ResponseData>(`/admin/category/del?id=${id}`)
}

// 获取全部分类数据
export const getCategoryAllAPI = () => {
  return request.get<any, GetCategoryListResponse>("/admin/category/all")
}
