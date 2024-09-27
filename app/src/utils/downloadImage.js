
export const showActions = (url) => {
    // 调用 uni.showActionSheet() 显示操作菜单
    uni.showActionSheet({
        itemList: ["保存", "转发", "收藏"],
        success: (res) => {
            // 处理用户的选择
            if(res.tapIndex + 1 === 1) {
                // 下载图片
                uni.downloadFile({
                    url: url, // 图片的网络链接
                    success: (downloadResult) => {
                        if (downloadResult.statusCode === 200) {
                            // 下载成功，获取临时文件路径
                            const tempFilePath = downloadResult.tempFilePath
                            // 保存图片到相册
                            saveImageToAlbum(tempFilePath)
                        }
                    },
                    fail: (error) => {
                        console.error("下载失败:", error)
                    }
                })
            }

        },
        fail: (err) => {
            // 处理错误
            console.error("操作菜单显示失败", err)
        }
    })
}

// 保存相册
export const saveImageToAlbum = (tempFilePath) => {
    uni.saveImageToPhotosAlbum({
        filePath: tempFilePath,
        success: () => {
            uni.showToast({
                title: "保存成功",
                icon: "success"
            })
        },
        fail: (err) => {
            console.error("保存失败:", err)
        }
    })
}