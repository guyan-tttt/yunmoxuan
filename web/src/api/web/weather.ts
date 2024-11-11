import axios from "axios"

export const getWeatherAPI = ({ province = "四川", city = "成都" }: { province: string; city: string }) => {
  return axios.get<any, any>(`https://cn.apihz.cn/api/tianqi/tqyb.php?id=88888888&key=88888888&sheng=${province}&place=${city}`)
}
