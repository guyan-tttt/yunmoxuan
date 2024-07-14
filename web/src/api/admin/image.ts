import request from "@/utils/request"

// 上传图片
export const uploadImageAPI = (data: FormData) => {
  return request.post<any, any>("/admin/image/upload", data)
}

// 获取图片列表
export const getImageListAPI = (page: number, pageSize: number, type: string) => {
  return request.get<any, any>(`/admin/image/list?page=${page}&pageSize=${pageSize}&type=${type}`)
}
