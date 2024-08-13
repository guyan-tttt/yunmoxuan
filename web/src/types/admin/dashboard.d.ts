// 基本返回类型
export interface ResponseData {
  code: number
  message: string
}

// 统计数据
export interface StatisticsData {
  articleNum: number
  categoryNum: number
  tagNum: number
  pictureNum: number
  trendsNum: number
  trendsCommentNum: number
  articleCommentNum: number
}

// 统计接口返回数据
export interface StatisticResponse extends ResponseData {
  data: StatisticsData
}

// 日志数据
export interface LogData {
  _id?: string
  title: string
  content: string
  createTime?: string
}
// 日志接口返回数据
export interface LogResponse extends ResponseData {
  data: LogData[]
  total: number
}
