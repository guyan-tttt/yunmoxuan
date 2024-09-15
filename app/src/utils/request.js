

// 网络请求模块封装
class Request {
    constructor() {

    }
    defaults = {
        method: "GET",
        header: {
            "content-type": "application/json"
        },
        baseURL: "http://118.31.237.92:3000/api/web",
        timeout: 10000,
        isLoading: true
    }
    // 拦截器
    interceptors = {
        // 请求拦截器
        request: (config) => {
            return config
        },
        // 响应拦截器
        response: (result) => {
            return result
        }
    }
    request(options) {

        // 合并配置项
        options.url = this.defaults.baseURL + options.url
        options = { ...this.defaults, ...options }
        // 请求拦截器
        options = this.interceptors.request(options)
        // 发起请求开启加载
        if(options.isLoading && options.method !== "UPLOAD") {
            uni.showLoading({ title: "加载中..." })
        }
        // 使用Promise封装
        return new Promise((resolve, reject) => {
            if(options.method === "UPLOAD") {
                uni.uploadFile({
                    ...options
                }).then(result => {
                    result.data = JSON.parse(result.data)
                    result = this.interceptors.response(Object.assign({},result,{ config: options,isSuccess: true}))
                    resolve(result)
                }).catch(error => {
                    // 请求失败
                    error = this.interceptors.response(Object.assign({},error,{ config: options, isSuccess: false}))
                    reject(error)
                })
            } else {
                uni.request({
                    ...options
                }).then(result => {
                    // 请求成功
                    result = this.interceptors.response(Object.assign({},result,{ config: options,isSuccess: true}))
                    resolve(result)
                }).catch(err => {
                    // 请求失败
                    err = this.interceptors.response(Object.assign({},err,{ config: options, isSuccess: false}))
                    reject(err)
                }).finally(() => {
                    // 请求完成
                    // 关闭加载
                    if(options.isLoading) {
                        uni.hideLoading()
                    }
                })
            }
        })
    }
    get(url, data = {}, config = {},isLoading = false) {
        this.defaults.isLoading = isLoading
        return this.request(Object.assign({
            data,
            method: "GET",
            url,
        },config))
    }
    post(url,data = {},config = {},isLoading = false) {
        this.defaults.isLoading = isLoading
        return this.request(Object.assign({
            data,
            method: "POST",
            url,
        },config))
    }
    put(url,data = {},config = {},isLoading = false) {
        this.defaults.isLoading = isLoading
        return this.request(Object.assign({
            data,
            method: "PUT",
            url,
        },config))
    }
    delete(url,config = {},isLoading = false) {
        this.defaults.isLoading = isLoading
        return this.request(Object.assign({
            method: "DELETE",
            url,
        },config))
    }
    upload(url,filePath,name,config = {}) {
        return this.request(Object.assign({
            method: "UPLOAD",
            url,
            filePath,
            name,

        }),config)
    }
}

// 请求模块实例
const request = new Request()
// 配置请求拦截器
request.interceptors.request = (config) => {


    return config
}
// 配置响应拦截器
request.interceptors.response = (result) => {
    // 响应数据之前，可以对result进行修改
    if(result.isSuccess) {
        // 判断响应码
        const { data } = result
        if(result.statusCode === 200) {
            // 请求成功
            return data
        } else if(result.statusCode === 403 || result.statusCode === 401) {
            // token过期，跳转到登录页面
        } else {
            // 请求失败
            return Promise.reject(data.msg)
        }


    }

}

export default request