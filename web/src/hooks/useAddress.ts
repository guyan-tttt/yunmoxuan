import AMapLoader from "@amap/amap-jsapi-loader"
import { ref } from "vue"

const AMAP_KEY = import.meta.env.AMAP_KEY
/**
 * 获取地理位置信息
 * @param { Longitude, Latitude } 坐标
 * @returns { address }
 */
// 地理位置信息
export const useAddress = async (position?: { Longitude: number; Latitude: number }) => {
  const positionInfo = ref<any>({
    Longitude: 116.397428,
    Latitude: 39.90923,
    address: "北京市海淀区中关村软件园A座1001"
  })

  const getAddress = (resolve: any, reject: any) => {
    AMapLoader.load({
      key: AMAP_KEY, // 替换为你的高德地图API Key
      version: "2.0", // 指定要加载的 JSAPI 的版本
      plugins: ["AMap.Geocoder"] // 需要使用的插件列表，这里使用逆地理编码插件
    })
      .then((AMap) => {
        // 实例化逆地理编码对象
        const geocoder = new AMap.Geocoder({
          radius: 1000 // 范围，默认：1000米
        })

        // 使用逆地理编码方法，参数为经纬度
        geocoder.getAddress(new AMap.LngLat(positionInfo.value.Longitude, positionInfo.value.Latitude), (status: any, result: any) => {
          if (status === "complete" && result.info === "OK") {
            // result即为逆地理编码返回的结果
            resolve(result as any)
          } else {
            reject("逆地理编码失败")
          }
        })
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return new Promise((resolve, reject) => {
    //   判断是否需要制定经纬度
    if (position) {
      positionInfo.value.Longitude = position.Longitude
      positionInfo.value.Latitude = position.Latitude
      getAddress(resolve, reject)
    } else {
      navigator.geolocation.getCurrentPosition((info) => {
        positionInfo.value.Longitude = info.coords.longitude
        positionInfo.value.Latitude = info.coords.latitude
        console.log(info, 1)
        getAddress(resolve, reject)
      })
    }
  })
}
