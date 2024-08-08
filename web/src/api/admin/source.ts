import request from "@/utils/request"

// 添加资源分组
export const addSourceGroupAPI = (data: any) => {
  return request.post<any, any>("/admin/source/addGroup", data)
}

// 获取资源分组
export const getSourceGroupAPI = () => {
  return request.get<any, any>("/admin/source/groupList")
}
