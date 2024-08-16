import { cursor } from "./cursor"

// 挂载自定义指令
export default function initDirective(app: any) {
  app.directive("cursor-default", cursor.default)
  app.directive("cursor-pointer", cursor.pointer)
}
