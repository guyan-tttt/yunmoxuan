import router from "@/router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { constantRoutes } from "./index"
import { useUserStore } from "@/store/modules/user"
import { ElMessage } from "element-plus"

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // 拦截后台路由
  if (constantRoutes.some((item) => item.path === to.path) && to.path !== "/login") {
    // 判断当前是否有token
    const userStore = useUserStore()
    if (userStore.token) {
      next()
    } else {
      ElMessage.error("请先登录")
      next("/login")
    }
  } else {
    next()
  }

  next()
})

router.afterEach((to) => {
  NProgress.done()
})
