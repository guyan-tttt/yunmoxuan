import request from "@/utils/request"

// 上传图片
export const uploadImageAPI = (data: FormData) => {
  return request.post("/admin/image/upload", data)
}
