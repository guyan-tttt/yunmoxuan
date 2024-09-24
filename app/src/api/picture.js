import request from "@/utils/request"

// 获取图片分类
export const getPictureCategoryAPI = () => {
    return request.get("/picture/category/list")
}

export const getPictureListAPI = ({id,page,pageSize}) => {
    return request.get(`/picture/list/${id}?page=${page}&pageSize=${pageSize}`)
}
