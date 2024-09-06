import { cursor } from "./cursor"
import { imgLoad } from "./imgLoad"
import { cardShow } from "./cardShow"

// 挂载自定义指令
export default function initDirective(app: any) {
  app.directive("cursor-default", cursor.default)
  app.directive("cursor-pointer", cursor.pointer)
  app.directive("bg-load", imgLoad.bg)
  app.directive("img-load", imgLoad.img)
  app.directive("card-scale", cardShow.scaleLoad)
  app.directive("card-scale2", cardShow.scaleLoad2)
}
