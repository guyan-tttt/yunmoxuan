import request from "@/utils/request"
import type { ResponseData, GuestbookForm, GuestbookListResponse } from "@/types/web/guestbook.d.ts"
// 添加留言
export const addGuestBookAPI = (data: GuestbookForm) => {
  return request.post<any, ResponseData>("/web/guestbook/add", data)
}

// 获取留言列表
export const getGuestBookListAPI = (page: number, pageSize: number) => {
  return request.get<any, GuestbookListResponse>("/web/guestbook/list", {
    params: {
      page,
      pageSize
    }
  })
}

// 获取留言墙数据
export const getGuestBookWallAPI = () => {
  return request.get<any, GuestbookListResponse>("/web/guestbook/bullet")
}
