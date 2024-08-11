import request from "@/utils/request"
import type { SourceGroupResponseData, ResponseData, GroupItem, SourceItem } from "@/types/admin/source"

// 添加资源分组
export const addSourceGroupAPI = (data: GroupItem) => {
  return request.post<any, ResponseData>("/admin/source/addGroup", data)
}

// 获取资源分组
export const getSourceGroupAPI = () => {
  return request.get<any, SourceGroupResponseData>("/admin/source/groupList")
}

// 添加资源
export const addSourceAPI = (data: SourceItem) => {
  return request.post<any, ResponseData>("/admin/source/addSource", data)
}

// 更新资源
export const updateSourceAPI = (data: SourceItem) => {
  return request.put<any, ResponseData>("/admin/source/updateSource", data)
}

// 删除资源
export const deleteSourceAPI = (id: string) => {
  return request.delete<any, ResponseData>(`/admin/source/delSource/${id}`)
}

// 更新分组
export const updateSourceGroupAPI = (data: GroupItem) => {
  return request.put<any, ResponseData>("/admin/source/updateGroup", data)
}

// 删除分组
export const deleteSourceGroupAPI = (id: string) => {
  return request.delete<any, ResponseData>(`/admin/source/delGroup/${id}`)
}
