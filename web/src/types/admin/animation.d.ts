import { ImageItem } from "./image"

// 基本返回类型
export interface ResponseData {
  code: number
  message: string
}

// 动漫列表项
export interface AnimeItem {
  name: string
  desc: string
  link: string
  type: string
  score: number
  hot: number
  createTime?: string
  updateTime?: string
  cover: string
  status: number // 0： 停更，1：连载，2：完结,
  remark: string // 备注 即为停更/完结时间,
  _id?: string
  file?: any
  imgList?: ImageItem[]
}

// 动漫列表返回类型
export interface AnimeListResponse extends ResponseData {
  data: Array<AnimeItem>
  total: number
}

// 动漫详情返回
export interface AnimeDetailResponse extends ResponseData {
  data: AnimeItem
}

// 动漫图片列表返回
export interface AnimeImageListResponse extends ResponseData {
  data: Array<ImageItem>
  total: number
}
