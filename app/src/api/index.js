import request from "@/utils/request"


// 获取轮播图
export const getBannerAPI = () => {
    return request.get("/index/banner/list")
}