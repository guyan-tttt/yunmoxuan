import type { ArticleItem } from "../admin/article"
// 基本返回类型
export interface ResponseData {
  code: number
  message: string
}

// 文章享详情返回
export interface ArticleDetail extends ResponseData {
  data: ArticleDetailItem
}

// 文章详情项
export interface ArticleDetailItem {
  detail: ArticleItem
  next: {
    _id: string
    title: string
  }[]
  prev: {
    _id: string
    title: string
  }[]
}

// 文章评论项
export interface ArticleCommentItem {
  _id?: string // 评论ID
  content: string // 评论内容
  articleID: string // 文章ID
  createTime?: string // 创建时间
  address: string // 评论者地址
  nickname: string // 评论者昵称
  time: string // 评论时间
}

// 获取文章评论列表返回
export interface ArticleCommentListResponse extends ResponseData {
  data: ArticleCommentItem[]
  total: number
}
