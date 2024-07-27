import type { UploadRawFile } from "element-plus"
// 基本返回类型
export interface ResponseData {
  code: number
  message: string
}

// 图片上传表单数据类型
export interface ImageUploadForm {
  categoryID: string // 分类ID
  fileList: UploadRawFile[] // 文件列表
}

// 图片项
export interface ImageItem {
  _id: string // ID
  name: string // 名称
  src: string // 图片地址
  categoryID: string // 分类ID
  categoryName: string // 分类名称
  createTime?: string // 创建时间
  updateTime?: string // 更新时间
  isShowMenu: boolean // 是否显菜
  size?: number // 图片大小
}

// 获取图片列表接口返回类型
export interface ImageListResponse extends ResponseData {
  data: ImageItem[]
  total?: number // 总条数
}

// 分页数据
export interface ImagePage {
  page: number // 当前页码
  pageSize: number // 每页条数
}
