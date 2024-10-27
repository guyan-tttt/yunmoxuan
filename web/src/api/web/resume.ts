import request from "@/utils/request"
import type { ResumeWebInfoResponseData, ProjectDetailResponseData } from "@/types/admin/resume"
import type { ImageListResponse } from "@/types/admin/image"

// 获取简历信息
export const getResumeInfoAPI = () => {
  return request.get<any, ResumeWebInfoResponseData>("/web/resume/detail")
}

// 获取项目详情
export const getProjectDetailAPI = (id: string) => {
  return request.get<any, ProjectDetailResponseData>(`/web/resume/project/detail?id=${id}`)
}

// 获取项目图片列表
export const getProjectImageListAPI = (projectId: string) => {
  return request.get<any, ImageListResponse>(`/web/resume/project/image?projectId=${projectId}`)
}
