// 基本返回类型
export interface ResponseData {
  code: number
  message: string
}

// 留言表单数据
export interface GuestbookForm {
  nickname: string
  email: string
  content: string
  avatar: string
}

// 留言项
export interface GuestbookItem {
  _id: number
  nickname: string
  email: string
  content: string
  avatar: string
  os: string
}
// 留言列表
export interface GuestbookListResponse extends ResponseData {
  data: GuestbookItem[]
  total: number
}
