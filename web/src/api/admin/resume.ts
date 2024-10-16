import request from "@/utils/request"

// 添加/修改简历
export const addResumeAPI = (data: FormData) => {
  return request.post<any, any>("/admin/resume/add", data)
}

// 获取简历
export const getResumeAPI = () => {
  return request.get<any, any>("/admin/resume/detail")
}

// 添加教育经历
export const addEducationAPI = (data: FormData) => {
  return request.post<any, any>("/admin/resume/addEducation", data)
}

// 获取教育经历
export const getEducationAPI = (id: string) => {
  return request.get<any, any>("/admin/resume/education?id=" + id)
}
