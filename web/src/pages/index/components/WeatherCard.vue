<template>
  <div class="card2 mb-3" v-loading="loading">
    <div class="container" v-if="weather.iconInfo">
      <i :class="weather.iconInfo.icon" :style="{ color: weather.iconInfo.color }" />
    </div>
    <div class="card-header" v-if="weather">
      <span
        >🎏{{ weather.windDirection }}*<i>{{ weather.windScale }}</i></span
      >
      <span class="date">📅 {{ dayjs(new Date()).format("MM月DD日") }}</span>
      <span class="pressure">💨{{ weather.pressure }}帕</span>
    </div>
    <span class="temp" v-if="weather">{{ weather.temperature }}°C</span>
    <div class="temp-scale" v-if="weather">
      <span>{{ weather.place }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAddress } from "@/hooks/useAddress"
import { ref, onMounted } from "vue"
import { getWeatherAPI } from "@/api/web/weather"
import dayjs from "dayjs"

const data = ref({})
const loading = ref(true)

const weatherList = [
  {
    icon: "qi-104-fill",
    color: "#a1c4fd",
    text: "阴"
  },
  {
    icon: "qi-100-fill",
    color: "#ffdf00",
    text: "晴"
  },
  {
    icon: "qi-101-fill",
    color: "#ffd748",
    text: "多云"
  },
  {
    icon: "qi-305-fill",
    color: "#76b9e7",
    text: "小雨"
  },
  {
    icon: "qi-306-fill",
    color: "#00b4d9",
    text: "中雨"
  },
  {
    icon: "qi-307-fill",
    color: "#00a7e0",
    text: "大雨"
  },
  {
    icon: "qi-302-fill",
    color: "#b1e2ff",
    text: "雷阵雨"
  },
  {
    icon: "qi-501-fill",
    color: "#d1d1d1",
    text: "雾"
  },

  {
    icon: "qi-400-fill",
    color: "#ffffff",
    text: "雪"
  },
  {
    icon: "qi-404-fill",
    color: "#a8d6ff",
    text: "雨夹雪"
  }
]

const weather = ref<any>({})
onMounted(async () => {
  loading.value = true
  const address: any = await useAddress()
  console.log(address)
  data.value = address
  const res = await getWeatherAPI({
    city: "南昌",
    province: "江西"
  })
  if (res.status === 200) {
    // data.icon = weatherList[data.code - 100].icon
    // console.log(res)
    weather.value = res.data
    weather.value.iconInfo = weatherList.find((item) => item.text === weather.value.weather1)
  }
  loading.value = false
})

// {
//     "precipitation": 0,
//     "temperature": 17.4,
//     "pressure": 1016,
//     "humidity": 88,
//     "windDirection": "东北风",
//     "windDirectionDegree": 63,
//     "windSpeed": 0.3,
//     "windScale": "微风",
//     "code": 200,
//     "place": "中国, 江西, 南昌",
//     "weather1": "晴",
//     "weather2": "晴"
// }
</script>

<style scoped lang="scss">
/* From Uiverse.io by zanina-yassine */
.card2 {
  width: 100%;
  height: 235px;
  position: relative;
  padding: 25px;
  background:
    radial-gradient(178.94% 106.41% at 26.42% 106.41%, #fff7b1 0%, rgba(255, 255, 255, 0) 71.88%)
      /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
    #ffffff;

  border-radius: 10px;
  transition: all 0.8s cubic-bezier(0.15, 0.83, 0.66, 1);
  cursor: pointer;
}

.card:hover {
  transform: scale(1.05);
}

.container {
  width: 250px;
  height: 250px;
  position: absolute;
  right: -35px;
  top: -50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0.7);
  > i {
    font-size: 120px;
  }
}

.card-header {
  display: flex;
  flex-direction: column;
  gap: 10px;
  // font-size: 12px;
  font-size: 15px;
  margin-top: 20px;
  i {
    font-size: 12px;
  }
  .date {
    color: #666;
  }
  .pressure {
    color: rgba(87, 77, 51, 0.66);
    // color: rgba(87, 77, 51, 0.33);
  }
}

.temp {
  position: absolute;
  left: 25px;
  bottom: 12px;
  font-weight: 700;
  font-size: 40px;
  line-height: 77px;
  color: rgba(87, 77, 51, 1);
}

.temp-scale {
  height: 36px;
  position: absolute;
  right: 25px;
  bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
}

.temp-scale span {
  font-weight: 700;
  font-size: 13px;
  line-height: 134.49%;
  color: rgba(87, 77, 51, 0.66);
}
</style>
