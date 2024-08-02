// 基本返回数据
export interface ResponseData {
  code: number
  message: string
}

// 分类列表项
export interface ImageCategoryItem {
  _id?: string
  name: string
  desc?: string
  createTime?: string
  updateTime?: string
  isEdit?: boolean
  showDeleteIcon?: noolean
  value?: string
  id?: string
  cover?: string
}

// 获取分类列表数据
export interface GetCategoryListResponse extends ResponseData {
  data: ImageCategoryItem[]
}
