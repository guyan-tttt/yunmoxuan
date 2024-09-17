import request from "@/utils/request"


// 获取轮播图
export const getBannerAPI = () => {
    return request.get("/index/banner/list")
}

// 获取用户信息
export const getUserInfoAPI = () => {
    return request.get("/index/user/info")
}