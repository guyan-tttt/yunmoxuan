import request from "@/utils/request"

// 添加/修改简历
export const addResumeAPI = (data: FormData) => {
  return request.post<any, any>("/admin/resume/add", data)
}
