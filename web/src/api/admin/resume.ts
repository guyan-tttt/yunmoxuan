import request from "@/utils/request"
import type {
  ResponseData,
  ResumeInfoResponseData,
  EducationInfoResponseData,
  ExpertiseResponseData,
  ProjectInfoResponseData,
  ProjectDetailResponseData
} from "@/types/admin/resume"
import type { ImageListResponse } from "@/types/admin/image"

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
  return request.get<any, ExpertiseResponseData>(`/admin/resume/skill?id=${id}`)
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
  return request.get<any, ProjectInfoResponseData>(`/admin/resume/project`)
}

// 删除项目
export const deleteProjectAPI = (id: string) => {
  return request.delete<any, ResponseData>(`/admin/resume//deleteProject?id=${id}`)
}

// 获取项目
export const getProjectDetailAPI = (id: string) => {
  return request.get<any, ProjectDetailResponseData>(`/admin/resume/projectDetail?id=${id}`)
}

// 更新项目
export const updateProjectAPI = (data: FormData) => {
  return request.put<any, ResponseData>("/admin/resume//updateProject", data)
}

// 上传项目截图
export const uploadProjectImageAPI = (data: FormData) => {
  return request.post<any, ResponseData>("/admin/resume/uploadProjectImage", data)
}

// 获取项目截图
export const getProjectImageAPI = (id: string) => {
  return request.get<any, ImageListResponse>(`/admin/resume/projectImage?projectId=${id}`)
}

// 删除项目截图
export const deleteProjectImageAPI = (data: { imgList: string[] }) => {
  return request.post<any, ResponseData>(`/admin/resume/deleteImgList`, data)
}
