import request from "@/utils/request"

// 添加动漫
export const addAnimationAPI = (data: any) => {
  return request.post("/admin/animation/add", data)
}
