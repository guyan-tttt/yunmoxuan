import request from "@/utils/service"

// 获取推荐歌单分类
export const getRecommendSongCategoryAPI = (limit: number) => {
  //   return request.get(`/top/playlist?limit=${limit}`)
  return request.get<any, any>(`/top/playlist?limit=${limit}`)
}

// 获取推荐歌单
export const getRecommendSongAPI = (limit: number) => {
  return request.get<any, any>(`/top/playlist/highquality?limit=${limit}`)
}

// 获取歌手分类
export const getSingerCategoryAPI = (limit: number) => {
  return request.get<any, any>(`/artist/list?limit=${limit}`)
}
