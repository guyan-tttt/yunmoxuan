// /lists
import request from "@/utils/request"

export const getGuestListAPI = (page,pageSize) => {
    return request.get(`/guestbook/lists?page=${page}&pageSize=${pageSize}`)
}