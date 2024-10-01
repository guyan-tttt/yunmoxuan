<template>
    <div class="contact">
        <image
            @longpress="showActions"
            :src="url"
            mode="widthFix"
            :show-menu-by-longpress="true"
            @click="preview"
        />
        <text class="title">微信扫一扫，公众号留言</text>
        <text class="title">感谢您的反馈!</text>
        <text class="title">长按可以保存二维码哦😊😊😊</text>
    </div>
</template>

<script setup>

const url = "https://jeek-space-blog.top:3000/images/wx/wx-code.jpg"
const preview = () => {
    uni.previewImage({
        urls: [url],

    })
}


const showActions = () => {
    // 调用 uni.showActionSheet() 显示操作菜单
    uni.showActionSheet({
        itemList: ["保存到相册"],
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
const saveImageToAlbum = (tempFilePath) => {
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

</script>

<style scoped  lang="scss">
.contact {
  width: 700rpx;
  margin: 0 auto;
  display: flex;
  height: 100vh;

  align-items: center;
  flex-direction: column;
  background-color: #fff;
  border-radius: 20rpx;
  justify-content: center;
  image {
    width: 400rpx;
  }
}
</style>