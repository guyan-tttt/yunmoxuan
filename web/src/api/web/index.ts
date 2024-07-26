import request from "@/utils/request"
import type { UserInfoResponseData } from "@/types/admin/user"

// 获取网站作者信息
export const getAuthorInfoAPI = () => {
  return request.get<any, UserInfoResponseData>("/web/index/user")
}
