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
