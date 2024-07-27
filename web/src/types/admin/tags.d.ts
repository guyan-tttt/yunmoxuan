// 基本返回类型
export interface ResponseData {
  code: number
  message: string
}

// 添加标签提交数据
export interface AddTagData {
  name: string // 标签名
  icon: string // 标签图标
  desc: string // 标签描述
  file?: any // 标签图片
}

// 添加标签返回数据类型
export interface AddTagResponseData extends ResponseData {
  data: AddTagData
}

// 获取标签列表数据返回类型
export interface GetTagsResponseData extends ResponseData {
  data: Tag[]
  total?: number // 标签总数
}

// 标签项类型
export interface Tag {
  name: string // 标签名
  icon: string // 标签图标
  desc: string // 标签描述
  _id?: string // 标签id
  createTime?: Date // 标签创建时间
  updateTime?: Date // 标签更新时间
}

// 页码
export interface Page {
  page: number // 当前页码
  pageSize: number // 每页数量
  total: number // 总数量
}
