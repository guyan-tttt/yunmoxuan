import { UploadRawFile } from "element-plus"
import type { UserInfo } from "./user"

// 基本返回类型
export interface ResponseData {
  code: number
  message: string
}

// 添加动态表单数据
export interface AddTrendsFormData {
  content: string
  imgList: (UploadRawFile | string)[]
}

// 动态项
export interface TrendsItem {
  _id: string
  content: string
  imgList: string[]
  createTime: string
  updateTime: string
  userInfo: UserInfo
  userID: string
  lookNum: number
  likeNum: number
  commentNum: number
  delImgList?: string[]
}

// 分页数据
export interface TrendsPageData {
  total: number
  pageSize: number
  page: number
}

// 获取动态列表数据
export interface GetTrendsListResponseData extends ResponseData {
  data: TrendsItem[]
  total: number
}

// 获取动态列表详情
export interface GetTrendsListDetailResponseData extends ResponseData {
  data: TrendsItem
}

// 评论表单数据
export interface CommentFormData {
  content: string
  nickname: string
  time: string
  ip: string
  trendsID: string
}

// 评论项
export interface CommentItem {
  _id: string
  content: string
  createTime: string
  updateTime: string
  nickname: string
  ip: string
  time: string
}

// 获取评论列表数据
export interface GetCommentListResponseData extends ResponseData {
  data: CommentItem[]
  total: number
}
