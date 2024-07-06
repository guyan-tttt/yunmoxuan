// 基本返回类型
export interface ResponseData {
  code: number
  message: string
}

// 添加分类
export interface AddCategory {
  name: string
  desc: string
}

// 获取分类列表返回
export interface GetCategoryListResponse extends ResponseData {
  data: CategoryItem[]
  total: number
}
// 分类列表项
export interface CategoryItem {
  _id?: string
  name: string
  desc: string
  createTime?: string
  updateTime?: string
}
