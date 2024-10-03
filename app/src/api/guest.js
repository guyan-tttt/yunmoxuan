// /lists
import request from "@/utils/request"

export const getGuestListAPI = (page,pageSize) => {
    return request.get(`/guestbook/lists?page=${page}&pageSize=${pageSize}`)
}
// 添加留言
export const addGuestAPI = (data) => {
    return request.post("/guestbook/add",data)
}