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
