import request from "@/utils/request"
import type { ResponseData, GuestbookListResponse } from "@/types/web/guestbook.d.ts"

// 获取留言列表
export const getGuestBookListAPI = (page: number, pageSize: number) => {
  return request.get<any, GuestbookListResponse>("/admin/guestbook/list", {
    params: {
      page,
      pageSize
    }
  })
}

// 删除留言
export const deleteGuestBookAPI = (id: string) => {
  return request.delete<any, ResponseData>(`/admin/guestbook/del/${id}`)
}
