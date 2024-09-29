
import request from "@/utils/request"

export const getSourceListAPI = () => {
    return request.get("/source/lists")
}