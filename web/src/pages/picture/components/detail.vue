<template>
  <div style="display: flex; flex-direction: column; align-items: center">
    <div class="list">
      <div class="item" v-for="(item, index) in pictureList" :key="item._id">
        <el-popover placement="top-end" :width="100" trigger="contextmenu">
          <template #reference>
            <el-image
              lazy
              :src="item.src"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              :preview-src-list="srcList"
              :initial-index="index"
              fit="cover"
            />
          </template>
          <el-tooltip class="box-item" effect="dark" content="详情" placement="top-start">
            <SvgIcon class="btn" name="info" @click="showDialog(item)" />
          </el-tooltip>
          <el-tooltip class="box-item" effect="dark" content="下载" placement="top-start">
            <SvgIcon class="btn" name="download" @click="download(item)" />
          </el-tooltip>
        </el-popover>
      </div>
    </div>
    <div v-if="pictureList.length < pageData.total" class="more" @click="loadMore">加载更多</div>
    <el-dialog v-model="dialogShow">
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import { useRoute } from "vue-router"
import { getPictureListAPI } from "@/api/web/picture"
import type { ImageItem } from "@/types/admin/image"
import { ElMessage, ElMessageBox } from "element-plus"
//@ts-ignore
import FileSaver from "file-saver"

// 页面路有对象
const route = useRoute()

// 图片列表
const pictureList = ref<ImageItem[]>([])

// 获取图片列表
const getList = async () => {
  const res = await getPictureListAPI(route.query.id as string, pageData.value.page, pageData.value.pageSize)
  if (res.code === 200) {
    pictureList.value = pictureList.value.concat(res.data)
    pageData.value.total = res.total as number
  }
}

// 图片预览列表
const srcList = computed(() => {
  return pictureList.value.map((item) => item.src)
})

// 分页参数
const pageData = ref({
  page: 1,
  pageSize: 15,
  total: 0
})

// 加载下一页
const loadMore = () => {
  if (pictureList.value.length < pageData.value.total) {
    pageData.value.page++
    getList()
  } else {
    ElMessage.info("没有更多数据了")
  }
}

// 图片信息预览
const dialogShow = ref<boolean>(false)

// 当前预览信息
const currentItemInfo = ref<{
  size?: number
  width: number
  height: number
  name: string
  category: string
}>()

// 查看图片信息
const showDialog = (item: ImageItem) => {
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
  dialogShow.value = true
}

// 图片下载
const download = (item: ImageItem) => {
  ElMessageBox.confirm("温馨提示！", "本站图片仅供学习使用，不可用于商用！", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      FileSaver.saveAs(item.src, "图片.png")
    })
    .catch(() => {})
}
onMounted(() => {
  getList()
})
</script>

<style scoped lang="scss">
.list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  .item {
    width: 210px;
    height: 110px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    border-radius: 10px;
    ::v-deep(img) {
      transition: all 0.3s;
      &:hover {
        filter: saturate(1.5) drop-shadow(rgba(0, 0, 0, 0.66) 0px 0px 5px);
        transform: translateY(-5px);
      }
    }
  }
}
.btn {
  width: 35px;
  height: 35px;
  margin: 10px;
  cursor: pointer;
  border: #ccc solid 1px;
  border-radius: 50%;
  &:hover {
    box-shadow: inset 0 0 1px #ccc;
  }
}

::v-deep(.el-popper) {
  display: flex !important;
  justify-content: center;
}

.more {
  display: inline-block;
  text-align: center;
  margin: 0 auto;
  cursor: pointer;
  background: #fff;
  border-radius: 100px;
  padding: 10px 35px;
  font-size: 15px;
  font-weight: 700;
  margin-top: 20px;
  box-shadow:
    0 10px 13px rgba(31, 45, 61, 0.1),
    0 0 0 -1px rgba(32, 160, 255, 0.2),
    0 0 0 -25px rgba(32, 160, 255, 0.3);
  transition:
    all 0.25s,
    box-shadow 0s;
  letter-spacing: 1px;
  &:hover {
    color: #20a0ff;
    box-shadow:
      0 10px 13px rgba(32, 160, 255, 0.3),
      0 0 0 25px rgba(32, 160, 255, 0),
      0 0 0 25px rgba(32, 160, 255, 0);
    transition:
      all 1s,
      box-shadow 1s ease-out 0.1s;
  }
}
</style>
