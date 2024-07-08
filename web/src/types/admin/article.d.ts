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
}
