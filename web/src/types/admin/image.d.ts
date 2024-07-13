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
