// 基本返回数据
export interface ResponseData {
  code: number
  message: string
}

// 返回简历信息
export interface ResumeInfo {
  _id: string
  name: string
  age: number
  educationInfo: array
  email: string
  phone: string
  photo: string
  project: array
  qq: string
  weChat: string
  sex: string
  race: array
  expertise: array
  updateTime: string
  file?: any
}
// 获取简历信息
export interface ResumeInfoResponseData extends ResponseData {
  data: ResumeInfo
}

// 教育经历数据项
export interface EducationInfo {
  name: string
  bg: string
  desc: string
  end_time: string
  start_time: string
  major: string
  resume_id: string
  logo: string
}

// 教育经历数据项返回
export interface EducationInfoResponseData extends ResponseData {
  data: EducationInfo[]
}

// 专业技能返回数据项
export interface ExpertiseResponseData extends ResponseData {
  data: string[]
}

// 项目经验数据项
export interface ProjectInfo {
  bgImg: string
  content?: string
  desc: string
  end_time: string
  link?: string
  logo: string
  name: string
  start_time: string
  _id: string
}

// 项目经验返回数据项
export interface ProjectInfoResponseData extends ResponseData {
  data: ProjectInfo[]
}
// 获取项目详情
export interface ProjectDetailResponseData extends ResponseData {
  data: ProjectInfo
}

// 获取简历信息返回
export interface ResumeWebInfoResponseData extends ResponseData {
  data: ResumeWebInfo
}

// 简历信息
export interface ResumeWebInfo {
  _id: string
  name: string
  age: number
  educationInfo: EducationInfo[]
  email: string
  phone: string
  photo: string
  project: ProjectInfo[]
  qq: string
  weChat: string
  sex: string
  race: any[]
  expertise: string[]
  updateTime: string
}
