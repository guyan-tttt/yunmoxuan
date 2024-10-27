<template>
  <div class="div bg-white m-auto rounded-[1em] relative group p-2 z-0 overflow-hidden card">
    <div class="h-[7em] w-[7em] bg-[#FDEE00] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[600%] z-[-1] duration-[400ms]" />
    <div class="h-[6em] w-[6em] bg-[#7CFC00] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[450%] z-[-1] duration-[400ms]" />
    <div class="h-[5em] w-[5em] bg-[#007FFF] rounded-full absolute bottom-full -left-[3.5em] group-hover:scale-[300%] z-[-1] duration-[400ms]" />

    <el-button
      class="text-[0.8em] absolute bottom-[0.8em] left-[1.4em] text-[#6C3082] group-hover:text-white duration-100"
      circle
      type="success"
      size="large"
      :icon="View"
      @click="openDialog"
    />

    <el-row justify="space-between" align="middle">
      <div class="header">
        <el-avatar :size="80" :src="props.data.logo" fit="cover" />
        <span>{{ props.data.name }}</span>
      </div>
      <div class="time mr-5">
        <span>📅 {{ dayjs(props.data.start_time).format("YYYY-MM-DD") }}</span>
      </div>
    </el-row>
    <div class="desc">简介：{{ props.data.desc }}</div>
    <Teleport to="#app">
      <div class="dialog">
        <el-dialog class="no-header-dialog" v-model="dialog" width="60%" :show-close="false" style="padding: 0">
          <div class="book" :class="{ active }" @click="changeActive">
            <div
              class="item cover"
              :style="{
                backgroundImage: `url(${props.data.bgImg})`
              }"
              ref="projectItem"
            >
              <div class="top">
                <div class="name"><img :src="props.data.logo" alt="" />{{ props.data.name }}</div>
                <div class="time">
                  {{ dayjs(props.data.start_time).format("YYYY-MM-DD") }} ~ {{ dayjs(props.data.end_time).format("YYYY-MM-DD") }}
                </div>
              </div>
              <div class="link" v-if="props.data.link">
                <div class="name">🧬 项目链接</div>
                <a :href="props.data.link">{{ props.data.link }}</a>
              </div>

              <div class="desc">{{ props.data.desc }}</div>
              <div class="tech" v-html="projectDetail?.content" />
            </div>
            <div class="img">
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
                  @contextmenu.prevent.stop="() => {}"
                >
                  <template #placeholder> <Loading /> </template
                ></el-image>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { View } from "@element-plus/icons-vue"
import { ref } from "vue"
import dayjs from "dayjs"
import type { ImageItem } from "@/types/admin/image"
import type { ProjectInfo } from "@/types/admin/resume"
import { getProjectDetailAPI, getProjectImageListAPI } from "@/api/web/resume"
import Loading from "@/components/Loading/index.vue"
const dialog = ref(false)

const props = defineProps<{
  data: ProjectInfo
}>()

// 打开对话框
const openDialog = () => {
  dialog.value = true
  if (imgList.value.length === 0) {
    getProjectDetail()
    getImgList()
  }
}

const projectDetail = ref<ProjectInfo>()

// 获取项目详情
const getProjectDetail = async () => {
  const res = await getProjectDetailAPI(props.data._id)
  if (res.code === 200) {
    projectDetail.value = res.data
  }
}

// 获取项目图片
const imgList = ref<ImageItem[]>([])

const getImgList = async () => {
  const res = await getProjectImageListAPI(props.data._id)
  if (res.code === 200) {
    imgList.value = res.data
  }
}
// 当前是否激活
const active = ref<boolean>(false)

// 切换激活
const changeActive = () => {
  active.value = !active.value
}
</script>

<style scoped lang="scss">
.dialog {
  ::v-deep(.no-header-dialog) {
    .el-dialog__header {
      display: none;
    }
  }
}

.card {
  width: 100%;
  height: 200px;
  border: 1px solid #ececec;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.3);
  background-image: url(https://haowallpaper.com/link/common/file/getCroppingImg/15755452612383040);
  background-size: cover;
  background-position: center;

  .header {
    font-size: 30px;
    margin-bottom: 0.5em;
    color: #333;
    font-weight: 600;
    margin: 10px 0px 0 20px;
    font-family: "楷体", "微软雅黑", sans-serif;
    text-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    span {
      margin-left: 20px;
      color: #fff;
      text-shadow: 0 0 10px #000;
    }
  }
  .time {
    color: #fff;
    text-shadow: 0 0 10px #000;
    font-size: 20px;
  }
  .desc {
    margin: 0 20px;
    margin-top: 10px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: #fff;
    text-shadow: 0 0 10px #000;
    letter-spacing: 0.1em;
  }
}

.item {
  width: 100%;
  // margin-top: 20px;
  width: 100%;
  height: 600px;
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
  margin-top: 40px;
  height: 600px;
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
  height: 100%;
  background-color: #fff;
  z-index: -3;
  overflow: hidden;
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 20px;
    gap: 10px;
    height: 100%;
    overflow: scroll;
    padding-bottom: 20px;
    margin-top: 20px;
    .el-image {
      width: 300px;
      height: 170px;
      margin-top: 10px;
      border-radius: 10px;
      box-shadow: 0 0 10px #999;
      transition: all 0.5s;
      &.active {
        box-shadow: 0 0 15px red;
      }
    }
  }
}
</style>
