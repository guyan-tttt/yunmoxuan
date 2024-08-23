import request from "@/utils/request"
import type { SourceGroupResponseData } from "@/types/admin/source"

// 获取全部资源
export const getSourceListAPI = () => {
  return request.get<any, SourceGroupResponseData>("/web/source/lists")
}
