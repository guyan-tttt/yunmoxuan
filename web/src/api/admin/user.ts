import request from "@/utils/request"
import type { LoginRequestData, LoginResponseData, UserInfoResponseData } from "@/types/admin/user"

// 用户登录
export const loginAPI = (data: LoginRequestData) => {
  return request.post<any, LoginResponseData>("/admin/user/login", data)
}
// 获取个人信息
export const getUserInfoAPI = () => {
  return request.get<any, UserInfoResponseData>("/admin/user/userInfo")
}

// 修改个人信息
export const updateUserInfoAPI = (data: FormData) => {
  return request.post<any, any>("/admin/user/update", data)
}
