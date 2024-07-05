import request from "@/utils/request"
import type { AddTagResponseData, GetTagsResponseData } from "@/types/admin/tags"

// 添加标签
export const addTagAPI = (data: FormData) => {
  return request.post<any, AddTagResponseData>("/admin/tag/add", data)
}

// 获取标签列表
export const getTagListAPI = (page: number, pageSize: number) => {
  return request.get<any, GetTagsResponseData>(`/admin/tag/list?page=${page}&pageSize=${pageSize}`)
}

// 修改标签详情
export const updateTagAPI = (data: FormData) => {
  return request.put<any, AddTagResponseData>("/admin/tag/update", data)
}

// 删除标签
export const deleteTagAPI = (id: string) => {
  return request.delete<any, AddTagResponseData>(`/admin/tag/del?id=${id}`)
}
