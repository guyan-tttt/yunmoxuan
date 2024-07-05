import axios from "axios"
import { useUserStore } from "@/store/modules/user"
import { ElMessage } from "element-plus"

const request = axios.create({
  baseURL: "/api",
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const userStore = useUserStore()
    const token = userStore.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    const userStore = useUserStore()
    // token过期
    if (response.status === 401) {
      ElMessage.warning("登录状态已过期，请重新登录")
      userStore.resetToken()
      window.location.href = "/login"
    }
    // 提取token
    const token = response.headers.authorization
    if (token) {
      userStore.setUserToken(token)
    }
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default request
