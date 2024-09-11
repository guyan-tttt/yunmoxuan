import request from "@/utils/service"

// 获取推荐歌单分类
export const getRecommendSongCategoryAPI = (limit: number, cat = "古风") => {
  //   return request.get(`/top/playlist?limit=${limit}`)
  return request.get<any, any>(`/top/playlist?limit=${limit}&cat=${cat ? cat : ""}`)
}
// 获取推荐歌单
export const getRecommendSongAPI = (limit: number, before?: number) => {
  return request.get<any, any>(`/top/playlist/highquality?limit=${limit}&before=${before ? before : 0}`)
}

// 获取歌手分类
export const getSingerCategoryAPI = (limit: number, cat?: string) => {
  return request.get<any, any>(`/artist/list?limit=${limit}&cat=${cat ? cat : ""}`)
}

// 获取歌单详情
export const getSongCategoryDetailAPI = (id: number) => {
  return request.get<any, any>(`/playlist/detail?id=${id}`)
}

// 获取音乐详情
export const getMusicDetailAPI = (ids: number[]) => {
  const id = ids.join(",")
  return request.get<any, any>(`/song/url?id=${id}`)
}

// 获取歌词
export const getMusicLyricAPI = (id: number) => {
  return request.get<any, any>(`/lyric?id=${id}`)
}
