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
