<template>
  <div class="container" @contextmenu.prevent="forbidContentMenu">
    <Waterfall v-if="props.data.length > 0" :list="props.data" :crossOrigin="true" :breakpoints="breakPoints" :lazyload="false">
      <template #item="{ item, url, index }">
        <div class="card" :name="[index, item]" @mouseleave="closeMenu(item)">
          <LazyImg class="image" @click="handleClick(url)" style="border-radius: 10px" :url="url" @contextmenu.prevent.stop="showContextMenu(item)" />
          <div v-show="item.isShowMenu" id="contextMenu" class="context-menu">
            <ul @mouseleave="closeMenu(item)">
              <li class="menu-item" @click="showInfoPanel(item)">查看属性</li>
              <li class="menu-item" @click="handleClick(url)">预览</li>
              <li class="menu-item" @click="downloadImage(item)">下载</li>
              <li class="menu-item" @click="deleteImage(item)">删除</li>
            </ul>
          </div>
        </div>
      </template>
    </Waterfall>
    <div v-else>
      <el-empty :image-size="200" />
    </div>
  </div>
  <el-dialog class="menu" v-model="showInfo" style="top: 40%; z-index: 10000">
    <el-descriptions class="margin-top" title="图片属性" :column="3" size="large" border>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">宽度</div>
        </template>
        {{ currentItemInfo?.width }} px
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">高度</div>
        </template>
        {{ currentItemInfo?.height }} px
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">大小</div>
        </template>
        {{ currentItemInfo?.size !== 0 ? currentItemInfo?.size + "KB" : "未知" }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">分类</div>
        </template>
        <el-tag size="small">{{ currentItemInfo?.category }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">名称</div>
        </template>
        {{ currentItemInfo?.name }}
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>
  <ImagePreview class="privew" v-model="showImage" :url="currentImage" />
</template>

<script setup lang="ts">
import type { ImageItem } from "@/types/admin/image"
import { LazyImg, Waterfall } from "vue-waterfall-plugin-next"
import { defineProps } from "vue"
import "vue-waterfall-plugin-next/dist/style.css"
import ImagePreview from "./imagPreview.vue"
import { ref } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import { deleteImageAPI, downloadImageAPI } from "@/api/admin/image"
import FileSaver from "file-saver"

// 瀑布流布局配置
const breakPoints = {
  1200: { rowPerView: 4 }, // 1200px 宽度四列
  300: { rowPerView: 1 }
}

// 页面右键禁止
const forbidContentMenu = () => {
  ElMessage.warning("禁止右键菜单")
}
// 接受传递的数据
const props = defineProps<{
  data: ImageItem[]
}>()
const emit = defineEmits(["update"])

// 点击图片事件
const handleClick = (url: string) => {
  // 关闭右键菜单
  showMenu.value = false
  // 预览图片
  showImage.value = true
  currentImage.value = url
}

// 预览弹框显示
const showImage = ref<boolean>(false)

// 当前选中图片
const currentImage = ref<string>()

// 鼠标右击事件
const showContextMenu = (item: ImageItem) => {
  item.isShowMenu = true
}

// 右键菜单显示
const showMenu = ref<boolean>(false)

// 关闭菜单
const closeMenu = (item: ImageItem) => {
  item.isShowMenu = false
}

// 当前所需要操作的图片
const currentItemInfo = ref<{
  size?: number
  width: number
  height: number
  name: string
  category: string
}>()

// 信息面板显示
const showInfo = ref<boolean>(false)

// 查看图片信息
const showInfoPanel = (item: ImageItem) => {
  showInfo.value = true
  // 解析图片大小

  const img = new Image()
  img.src = item.src
  img.onload = () => {
    currentItemInfo.value = {
      size: item?.size ? Math.floor(item.size / 1024) : 0,
      width: img.width,
      height: img.height,
      name: item.name,
      category: item.categoryName
    }
  }
}

// 删除图片
const deleteImage = async (item: ImageItem) => {
  // 开启弹框提示
  ElMessageBox.confirm(`确定删除这张图片吗？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      // 发送请求
      const res = await deleteImageAPI(item._id)
      if (res.code == 200) {
        // 删除成功
        ElMessage.success("删除成功")
        // 重新加载数据
        emit("update")
      }
    })
    .catch(() => {})
}

// 下载图片
const downloadImage = async (item: ImageItem) => {
  const res = await downloadImageAPI(item._id)
  //@ts-ignore
  FileSaver.saveAs(res, "图片.jpg")
}
</script>

<style scoped lang="scss">
.card {
  position: relative;
  width: 100%;
  height: 100%;
}
.container {
  padding: 10px;
  // height: 900px;
  overflow: auto;
}

::v-deep(.lazy__img:hover) {
  transform: scale(1.2);
  transition: transform 0.5s;
  overflow: hidden;
}
.context-menu {
  position: absolute;
  z-index: 1000;
  // box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background-color: #fff;
  border: 1px solid #999;
  box-shadow: 2px 2px 5px #666;
}

.context-menu ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  border-radius: 5px;
}

.menu-item {
  padding: 12px 16px;
  cursor: pointer;
  // background-color: #fff;
  color: #000;
}

.menu-item:hover {
  background-color: #ece9e9;
}
.container {
  position: relative;
}
.waterfall-list {
  background-color: transparent;
}
// ::v-deep(.el-overlay) {
//   width: 100vw;
// }

::v-deep(.waterfall-list[data-v-fa08b5ca]) {
  overflow: visible;
}
.menu {
  z-index: 100;
  top: 40%;
}
</style>
