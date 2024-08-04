import request from "@/utils/request"
import type { ResponseData, GuestbookForm, GuestbookListResponse } from "@/types/web/guestbook"
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
