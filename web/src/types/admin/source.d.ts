// 基本返回类型
export interface ResponseData {
  code: number
  message: string
}

// 分组项
export interface GroupItem {
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 分组描述
   */
  desc: string
  /**
   * 分组logo
   */
  logo: string
  /**
   * 分组名称
   */
  name: string
  /**
   * 资源列表
   */
  source?: SourceItem[]
  /**
   * 修改时间
   */
  updateTime?: string
  /**
   * 资源id
   * */
  _id?: string
}
// 资源项
export interface SourceItem {
  /**
   * 资源背景图
   */
  bg: string
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 资源描述
   */
  desc: string
  /**
   * 资源所属分组
   */
  groupId: string
  /**
   * 资源所属分组名称
   */
  groupName: string
  /**
   * 资源链接
   */
  link: string
  /**
   * 资源logo
   */
  logo: string
  /**
   * 资源名称
   */
  name: string
  /**
   * 更新时间
   */
  updateTime?: string
  /**
   * 资源id
   * */
  _id?: string
}

// 资源分组返回数据类型
export interface SourceGroupResponseData extends ResponseData {
  data: GroupItem[]
}
