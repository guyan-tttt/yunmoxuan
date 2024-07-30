<template>
  <div class="map">
    <el-button @click="openMap">选择地址</el-button>
    <el-card id="container" :class="{ active: showMap }">
      <div style="width: 100%; height: 400px" />
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import AMapLoader from "@amap/amap-jsapi-loader"

let map = null

const emit = defineEmits(["select"])

// 地图显示
const showMap = ref(false)

// 开启地图
const openMap = () => {
  showMap.value = !showMap.value
}

onMounted(() => {
  // 加载高德地图api
  window._AMapSecurityConfig = {
    securityJsCode: "ec3fde27e024d61be62726e5f135ff78"
  }
  AMapLoader.load({
    key: "2c96cb3131bb8f60cd7c3810a5cf0727", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.Geocoder"] // 需要使用的插件列表
  })
    .then((AMap) => {
      map = new AMap.Map("container", {
        zoom: 10, // 初始化地图层级
        center: [116.397428, 39.90923] // 初始化地图中心点
      })

      const geocoder = new AMap.Geocoder({
        radius: 1000, // 范围，默认1000米
        extensions: "all", // 返回地址组成的部件
        async: true, // 是否异步返回结果
        timeout: 10000 // 超时时间
      })

      //   点击选择位置
      map.on("click", function (ev) {
        // 触发事件的地理坐标，AMap.LngLat 类型
        const lnglat = ev.lnglat

        const { KL, lat } = lnglat
        const info = [KL, lat]
        //   解析地址
        geocoder.getAddress(info, (status, result) => {
          if (status == "complete" && result.info == "OK") {
            emit("select", result.regeocode)
          } else {
            console.log("地理编码失败", result)
          }
        })
      })
    })
    .catch((e) => {
      console.log(e)
    })
})
</script>

<style lang="scss" scoped>
.map {
  position: relative;
  width: 100px;
}
#container {
  height: 400px;
  width: 500px;
  position: absolute;
  top: -450px;
  right: -37px;
  transform: scale(0);
  transition: all 0.3s;
  z-index: 999;
  &.active {
    transform: scale(1);
  }
}
</style>
