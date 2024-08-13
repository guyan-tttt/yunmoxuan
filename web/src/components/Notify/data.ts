export interface ListItem {
  avatar?: string
  title: string
  createTime?: string
  content?: string
  status?: "primary" | "success" | "info" | "warning" | "danger"
  extra?: string
  view?: boolean
  type?: number
}
