import type { Tag } from "./tags"
import type { CategoryItem } from "./category"

// 基本返回类型
export interface ResponseData {
  code: number
  message: string
}

// 添加文章数据
export interface AddArticleData {
  title: string // 文章标题
  content: string // 文章内容
  categoryID: string // 文章分类ID
  tags: string[] // 文章标签ID
  desc: string // 文章描述
  cover: string // 文章封面
  authorID: string // 作者ID
  isPublish: boolean // 是否发布
  isTop: boolean // 是否置顶
  isOriginal: boolean // 是否原创
  file?: any // 封面文件
  _id?: string // 文章ID
}

// 文章项
export interface ArticleItem {
  _id?: string // 文章ID
  title: string // 文章标题
  content: string // 文章内容
  categoryID: string // 文章分类ID
  tags?: string[] | Tag[] // 文章标签ID
  desc: string // 文章描述
  cover: string // 文章封面
  authorID: string // 作者ID
  isPublish: boolean // 是否发布
  isTop: boolean // 是否置顶
  isOriginal: boolean // 是否原创
  aboutInfo: {
    category: CategoryItem // 文章分类
    tags?: Tag[] // 文章标签

    author: string // 文章作者昵称
  }
  createTime?: string // 文章创建时间
  updateTime?: string // 文章更新时间
}
//获取文章列表
export interface ArticleList extends ResponseData {
  data: ArticleItem[]
  total: number
}

// 获取文章详情
export interface ArticleDetail extends ResponseData {
  data: ArticleItem
}

// 文章搜索数据
export interface ArticleSearchForm {
  tagID: string // 文章标题
  categoryID: string // 文章分类ID
  articleType?: ArticleType // 文章类型
  page?: number // 当前页
  pageSize?: number // 每页数量
}

// 文章类型
export enum ArticleType {
  All = 1,
  Publish = 2,
  NoPublish = 3,
  Deleted = 4
}

// 文章统计量
export interface ArticleStatistics {
  articleNum: number // 文章数量
  articlePublishNum: number // 已发布文章数量
  articleUnPublishNum: number // 未发布文章数量
  articleDeleteNum: number // 已删除文章数量
  weekData: Object // 最近一周发布文章数量
}

// 获取文航统计量
export interface ArticleStatisticsData extends ResponseData {
  data: ArticleStatistics
}
