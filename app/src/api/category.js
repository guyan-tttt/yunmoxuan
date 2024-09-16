import request from "@/utils/request"

// 获取分类列表
export const getCategoryListAPI = () => {
    return request.get("/index/categorys")
}
