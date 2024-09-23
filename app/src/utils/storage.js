// 存储数据
export const setStorage = (key,value) => {
    try{
        uni.setStorageSync(key,value)
    } catch(e) {
        console.log(e)
    }
}

// 获取数据
export const getStorage = (key) => {
    try{
        return uni.getStorageSync(key)
    } catch(e) {
        console.log(e)
    }
}

// 删除数据
export const removeStorage = (key) => {
    try{
        uni.removeStorageSync(key)
    } catch(e) {
        console.log(e)
    }
}