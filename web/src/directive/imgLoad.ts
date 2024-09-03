export const imgLoad = {
  bg: {
    mounted(el: any, binding: any) {
      // 创建一个图片对象
      const img = new Image()
      // 获取图片地址
      const url = binding.value
      // 设置图片
      img.src = url
      // 图片加载完成
      img.onload = function () {
        // 设置宽高
        el.style.backgroundImage = `url(${img.src})`
      }
      img.onerror = function () {
        console.log("加载失败")
      }
    }
  },
  img: {
    mounted(el: any, binding: any) {
      el.src = "/src/assets/picture/img-loading.gif"
      const img = new Image()
      const url = binding.value
      img.src = url
      img.onload = function () {
        el.src = img.src
      }
    }
  }
}
