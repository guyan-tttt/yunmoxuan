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
  return request.delete<any, ResponseData>(`/admin/resume/deleteEducation?id=${id}&index=${index}`)
}

// 添加技能
export const addSkillAPI = (data: { id: string; value: string }) => {
  return request.post<any, ResponseData>("/admin/resume/addSkill", data)
}

// 获取技能
export const getSkillAPI = (id: string) => {
  return request.get<any, any>(`/admin/resume/skill?id=${id}`)
}

// 删除技能
export const deleteSkillAPI = (id: string, value: string) => {
  return request.delete<any, ResponseData>(`/admin/resume/deleteSkill?id=${id}&value=${value}`)
}

// 添加项目
export const addProjectAPI = (data: FormData) => {
  return request.post<any, ResponseData>("/admin/resume/addProject", data)
}

// 获取项目
export const getProjectAPI = () => {
  return request.get<any, any>(`/admin/resume/project`)
}

// 删除项目
export const deleteProjectAPI = (id: string) => {
  return request.delete<any, ResponseData>(`/admin/resume//deleteProject?id=${id}`)
}
