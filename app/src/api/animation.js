import request from "@/utils/request"

// 获取动漫列表
export const getAnimationListAPI = (page,pageSize) => {
    return request.get(`/animation/list?page=${page}&pageSize=${pageSize}`)
}

// 获取动漫详情
export const getAnimationDetailAPI = (id) => {
    return request.get(`/animation/detail?id=${id}
`)
}

// 获取动漫图片列表
export const getAnimationImgListAPI = ({id,page,pageSize}) => {
    return request.get(`/animation/imgList?id=${id}&page=${page}&pageSize=${pageSize}`)
}