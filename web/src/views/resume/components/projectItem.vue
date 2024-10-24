<template>
  <div class="book" :class="{ active }" @click="active = !active">
    <div
      class="item cover"
      :style="{
        backgroundImage: `url(${props.data.bgImg})`
      }"
      ref="projectItem"
    >
      <div class="top">
        <div class="name"><img :src="props.data.logo" alt="" />{{ props.data.name }}</div>
        <div class="time">{{ dayjs(props.data.start_time).format("YYYY-MM") }} ~ {{ dayjs(props.data.end_time).format("YYYY-MM") }}</div>
      </div>
      <div class="link" v-if="props.data.link">
        <div class="name">🧬 项目链接</div>
        <a :href="props.data.link">{{ props.data.link }}</a>
      </div>

      <div class="desc">
        {{ props.data.desc }}
      </div>
      <div class="tech" v-html="props.data.content" />
    </div>
    <div class="img" :style="{ height: imgHeight + 'px' }">
      <div class="list">
        <el-image
          v-for="(item, index) in imgList"
          :key="item._id"
          :src="item.src"
          fit="cover"
          lazy
          hide-on-click-modal
          :preview-src-list="imgList.map((item: any) => item.src)"
          :initial-index="index"
          @click.stop="() => {}"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs"
import { ref, onMounted, watch } from "vue"
import { getProjectImageAPI } from "@/api/admin/resume"
const props = defineProps<{
  data: any
}>()

const projectItem = ref<HTMLElement | null>(null)

const imgHeight = ref(0)

onMounted(() => {
  imgHeight.value = projectItem.value?.clientHeight || 0
  if (props.data) {
    getImgList()
  }
})

// 获取到图片列表
const imgList = ref([])

const getImgList = async () => {
  const res = await getProjectImageAPI(props.data._id)
  console.log(res)
  if (res.code === 200) {
    imgList.value = res.data
    console.log(res)
  } else {
    console.log("获取图片列表失败")
  }
}
watch(
  () => props.data,
  () => {
    if (props.data) {
      getImgList()
    }
  }
)

// 当前是否激活
const active = ref(false)
</script>

<style scoped lang="scss">
.item {
  width: 100%;
  // margin-top: 20px;
  width: 100%;
  color: #fff;
  padding: 20px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  border: 2px solid #f8f8f8;
  box-shadow: 4px 4px 10px #000;
  background-color: #fff;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name {
      font-size: 26px;
      text-shadow: 5px -5px 10px #000;
      font-weight: 700;
      display: flex;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        margin-right: 10px;
        border-radius: 50%;
        box-shadow: inset 0px -15px 30px #000;
      }
    }
    .time {
      font-size: 16px;
      text-shadow: 5px -5px 10px #000;
    }
  }
  .link {
    display: flex;
    margin-top: 10px;
    .name {
      font-size: 16px;
      text-shadow: 5px -5px 10px #000;
      font-weight: 700;
    }
    a {
      color: var(--primary-color);
      margin-left: 20px;
      font-weight: 700;
    }
  }
  ::v-deep(.tech) {
    width: 100%;
    color: #333 !important;
  }
  .desc {
    font-size: 16px;
    text-shadow: 5px -5px 10px #000;
    margin-top: 20px;
  }
}

/* From Uiverse.io by eslam-hany */
.book {
  position: relative;
  border-radius: 10px;
  width: 100%;
  margin-top: 20px;
  // height: 300px;
  -webkit-box-shadow: 1px 1px 12px #000;
  box-shadow: 1px 1px 12px #000;
  -webkit-transform: preserve-3d;
  -ms-transform: preserve-3d;
  transform: preserve-3d;
  -webkit-perspective: 2000px;
  perspective: 2000px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  color: #000;
}

.cover {
  top: 0;
  position: absolute;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.5s;
  transform-origin: 0;
  box-shadow: 1px 1px 12px #000;
  background-color: #000;
}

.book.active .cover {
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  -webkit-transform: rotatey(-80deg);
  -ms-transform: rotatey(-80deg);
  transform: rotatey(-80deg);
}

.img {
  width: 100%;
  height: 700px;
  background-color: #fff;
  z-index: -3;
  overflow: hidden;
  .list {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    width: 100%;
    padding: 0 20px;
    gap: 10px;
    height: 100%;
    overflow: scroll;
    padding-bottom: 20px;
    margin-top: 20px;
    .el-image {
      width: 200px;
      height: 120px;
      margin-top: 10px;
      border-radius: 10px;
      box-shadow: 0 0 10px #999;
    }
  }
}
</style>
