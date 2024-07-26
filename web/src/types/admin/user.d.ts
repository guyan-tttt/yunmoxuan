// 用户相关接口类型
// 基本返回类型
export interface ResponseData {
  code: number
  message: string
}
// 登录请求数据
export interface LoginRequestData {
  username: string
  password: string
}

// 登录响应数据
export interface LoginResponseData extends ResponseData {
  token: string
}

// 用户信息数据
export interface UserInfo {
  _id: string // 用户id
  username: string // 用户名
  password?: string // 密码
  email: string // 邮箱
  phone: string // 手机号
  gender: number // 性别
  introduction: string // 个人简介
  avatar: string // 头像
  nickname: string // 昵称
  github?: string // github地址
  gitee?: string // gitee地址
  csdn?: string // csdn地址
  file?: any // 文件信息
}

// 个人信息返回
export interface UserInfoResponseData extends ResponseData {
  data: UserInfo
}
