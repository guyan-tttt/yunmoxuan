import request from "@/utils/request"
import type { ResponseData, ResumeInfoResponseData, EducationInfoResponseData } from "@/types/admin/resume"
// 添加/修改简历
export const addResumeAPI = (data: FormData) => {
  return request.post<any, ResponseData>("/admin/resume/add", data)
}

// 获取简历
export const getResumeAPI = () => {
  return request.get<any, ResumeInfoResponseData>("/admin/resume/detail")
}

// 添加教育经历
export const addEducationAPI = (data: FormData) => {
  return request.post<any, ResponseData>("/admin/resume/addEducation", data)
}

// 获取教育经历
export const getEducationAPI = (id: string) => {
  return request.get<any, EducationInfoResponseData>("/admin/resume/education?id=" + id)
}

// 删除教育经历
export const deleteEducationAPI = (id: string, index: number) => {
  return request.delete(`/admin/resume/deleteEducation?id=${id}&index=${index}`)
}
