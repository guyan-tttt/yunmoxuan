<script setup lang="ts">
import { ref, onMounted, computed } from "vue"
import EditCategory from "./modules/EditCategory.vue"
import ImageList from "./modules/ImageList.vue"
import { getImageCategoryListAPI } from "@/api/admin/imageCategory"
import { uploadImageAPI, getImageListAPI } from "@/api/admin/image"
import dayjs from "dayjs"
import { ElMessage, type UploadFile, type UploadRawFile, type ElUpload } from "element-plus"
import type { ImageCategoryItem } from "@/types/admin/imageCategory"
import type { ImageUploadForm, ImageItem, ImagePage } from "@/types/admin/image"

// 分类编辑弹框
const categoryDrawer = ref<boolean>(false)

// 打开弹窗
const openDrawer = (e: any) => {
  console.log(e)

  categoryDrawer.value = true
}

// 分类数据
const imageCategoryList = ref<ImageCategoryItem[]>([])

// 获取图片分类数据
const getCategoryList = async () => {
  const res = await getImageCategoryListAPI()
  // 处理分类数据。添加一些必要字段
  res.data.forEach((item: ImageCategoryItem) => {
    item.isEdit = false
    item.showDeleteIcon = false
    item.value = item.name
    item.createTime = dayjs(item.createTime).format("YYYY-MM-DD")
  })
  // 保存
  imageCategoryList.value = res.data
  // 初始化照片当前展示分类
  currentCategory.value = res.data[0]._id as string
}

// 图片上传
const changeUpload = (file: UploadFile) => {
  // 校验图片格式大小
  if (file.raw?.type !== "image/jpeg" && file.raw?.type !== "image/png") {
    ElMessage.error("图片格式不正确")
    uploadRef.value?.handleRemove(file)
    return
  }
  if (file.raw?.size > 1024 * 1024 * 5) {
    ElMessage.error("图片大小不能超过5MB")
    uploadRef.value?.handleRemove(file)
    return
  }
  // 判断上传图片数量是否超过10张
  if (imageFormData.value.fileList.length >= 10) {
    ElMessage.error("图片数量不能超过10张")
    uploadRef.value?.handleRemove(file)
    return
  }
  // 添加到图片上传表单数据
  imageFormData.value.fileList.push(file.raw as UploadRawFile)
}

// 图片上传表单数据
const imageFormData = ref<ImageUploadForm>({
  categoryID: "",
  fileList: []
})

// 图片上传器对象
const uploadRef = ref<typeof ElUpload>()

// 图片上传提交
const imageUploadSubmit = async () => {
  // 判断是否有图片上传
  if (imageFormData.value.fileList.length === 0) return ElMessage.error("请选择图片")
  // 判断是选择分类
  if (imageFormData.value.categoryID === "") return ElMessage.error("请选择分类")
  // 创建FormData
  const formData = new FormData()
  formData.append("categoryID", imageFormData.value.categoryID)
  imageFormData.value.fileList.forEach((item: any) => {
    formData.append("files", item)
  })
  formData.append(
    "categoryName",
    imageCategoryList.value.find((item: any) => item._id === imageFormData.value.categoryID)!.name
  )
  const res = await uploadImageAPI(formData)
  if (res.code === 200) {
    ElMessage.success("上传成功")
    imageFormData.value.fileList = []
    imageFormData.value.categoryID = ""
    uploadRef.value?.clearFiles()
    // 初始化分页数据
    imageListPagination.value.page = 1
    // 更新图片列表
    getImageList()
  }
}

// 导航栏配置
const options = computed(() => {
  if (imageCategoryList.value.length === 0) return []
  return imageCategoryList.value.map((item: ImageCategoryItem) => {
    return {
      label: item.name,
      value: item._id
    }
  })
})

// 当前选定分类
const currentCategory = ref<string | undefined>()

// 图片列表
const imageList = ref<ImageItem[]>([])

// 图片分页数据
const imageListPagination = ref<ImagePage>({
  page: 1,
  pageSize: 15
})

// 获取图片列表
const getImageList = async () => {
  const res = await getImageListAPI(
    imageListPagination.value.page,
    imageListPagination.value.pageSize,
    currentCategory.value as string
  )

  if (res.code === 200) {
    // 如果图片列表为空，则禁用滚动加载
    if (res.data.length === 0) {
      scrollDisabled.value = true
      imageListPagination.value.page = 1
      if (imageList.value.length === res.total) {
        ElMessage.info("没有更多图片了")
      }
    } else {
      scrollDisabled.value = false
      res.data.forEach((item: ImageItem) => {
        item.isShowMenu = false
      })
      imageList.value = res.data
    }
  }
}

// 导航栏切换
const navChange = () => {
  imageList.value = []
  imageListPagination.value.page = 1
  getImageList()
}

// 精选图片
const wellImageList = ref<ImageItem[]>([])

// 获取精选图片
const getWellImageList = async () => {
  const res = await getImageListAPI(
    imageListPagination.value.page,
    imageListPagination.value.pageSize,
    imageCategoryList.value.filter((item) => item.name === "精选照片")[0]._id as string
  )
  wellImageList.value = res.data
}

// 触底加载
const load = () => {
  imageListPagination.value.page++
  getImageList()
}

// 是否禁用触底加载
const scrollDisabled = ref<boolean>(false)

// 更新图片列表
const updateImageList = () => {
  imageList.value = []
  imageListPagination.value.page = 1
  getImageList()
}
// 初始化
onMounted(async () => {
  imageListPagination.value.page = 1
  await getCategoryList()
  getImageList()
  getWellImageList()
})
</script>
<template>
  <div
    class="picture"
    v-infinite-scroll="load"
    :infinite-scroll-disabled="scrollDisabled"
    :infinite-scroll-distance="0"
  >
    <el-row justify="space-between" style="min-height: 800px">
      <el-col :span="16" class=".limit-box animate__animated animate__fadeInLeft">
        <el-card>
          <el-row>
            <div class="title animate__animated animate__swing">
              <el-icon size="30" color="#093ddc"><UploadFilled /></el-icon>
              上传照片
            </div>
          </el-row>
          <el-row>
            <el-form style="margin-left: 20px; width: 100%">
              <el-form-item>
                <el-select v-model="imageFormData.categoryID" style="width: 28%">
                  <el-option
                    v-for="item in imageCategoryList"
                    :key="item._id"
                    :value="item._id as string"
                    :label="item.name"
                    >{{ item.name }}</el-option
                  >
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-upload
                  ref="uploadRef"
                  action=""
                  :auto-upload="false"
                  list-type="picture-card"
                  :on-change="changeUpload"
                  :on-preview="() => {}"
                  :on-remove="() => {}"
                  :multiple="true"
                  :drag="true"
                >
                  <el-icon><UploadFilled /></el-icon>
                  <div>上传图片</div>
                </el-upload>
              </el-form-item>
            </el-form>
          </el-row>
          <el-row>
            <el-button @click="imageUploadSubmit" type="primary" size="large" style="margin-left: 20px"
              >上传提交</el-button
            >
          </el-row>
          <el-row>
            <div class="title animate__animated animate__swing">
              <el-icon size="28" color="#093ddc"><PictureFilled /></el-icon>
              照片展示
            </div>
          </el-row>
          <el-segmented @change="navChange" v-model="currentCategory" :options="options" block />
          <ImageList :data="imageList" @update="updateImageList" />
          <el-row justify="center">
            <div class="nomore" v-if="scrollDisabled">没有更多了………………</div>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="8" class="animate__animated animate__fadeInRight">
        <el-card>
          <div class="title">
            <el-row>
              <span class="animate__animated animate__bounce"
                ><el-icon><FolderOpened /></el-icon>相册分组</span
              >
              <el-button type="primary" @click="openDrawer">编辑分组</el-button>
            </el-row>
          </div>
          <div class="list">
            <div class="item" v-for="item in imageCategoryList" :key="item._id">
              <div class="info">
                <el-icon><Picture /></el-icon>
                {{ item.name }}
              </div>
              <div class="right">
                <el-icon size="20" color="#49d027"><SuccessFilled /></el-icon>
              </div>
            </div>
          </div>
          <div class="banner">
            <div class="header">
              <div class="info animate__animated animate__bounce">
                <el-icon><PictureFilled /></el-icon>
                照片精选
              </div>
            </div>
            <el-carousel height="450px" direction="vertical" type="card" :autoplay="true">
              <el-carousel-item v-for="item in wellImageList" :key="item._id">
                <img style="width: 100%; height: auto" :src="item.src" alt="" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-drawer size="40%" v-model="categoryDrawer" :with-header="false">
      <EditCategory @update="getCategoryList" :data="imageCategoryList" />
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
::v-deep(.el-card) {
  padding: 0;
  margin: 0;
}
.picture {
  width: 100%;
  .el-row {
    position: relative;
    .el-col:nth-child(2) {
      width: 80%;
      position: sticky;
      top: 0;
      height: 100%;
      right: 0;
      // background-color: #fff;
      border-radius: 20px 0 0 20px;
      ::v-deep(.el-card) {
        border-radius: 20px 0 0 20px;
      }
      .title {
        .el-row {
          justify-content: space-between;

          align-items: center;
          span {
            font-size: 20px;
            font-weight: bold;
            .el-icon {
              color: #109becce;
              margin-right: 10px;
            }
            display: flex;
            align-items: center;
          }
        }
      }
      .list {
        width: 100%;
        margin-top: 20px;
        .item {
          width: 90%;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          margin-bottom: 10px;
          background-color: #efefef;
          cursor: pointer;
          color: #000;
          .el-icon {
            margin-right: 10px;
          }
        }
      }
      .banner {
        margin-top: 20px;
        width: 100%;
        .header {
          font-size: 20px;
          font-weight: bold;
          display: flex;
          justify-content: space-between;
          font-size: 20px;
          font-weight: bold;
          .el-icon {
            color: #109becce;
            margin-right: 10px;
          }
          display: flex;
          align-items: center;
        }
        .el-carousel {
          margin-top: 30px;
        }
        .el-carousel__item h3 {
          color: #475669;
          opacity: 0.75;
          line-height: 200px;
          margin: 0;
          text-align: center;
        }
        .el-carousel__item {
          border-radius: 10px;
        }

        .el-carousel__item:nth-child(2n) {
          background-color: #99a9bf;
        }

        .el-carousel__item:nth-child(2n + 1) {
          background-color: #d3dce6;
        }
      }
    }
    .el-col:nth-child(1) {
      border-radius: 0 20px 20px 0;
      padding-bottom: 20px;
      ::v-deep(.el-card__body) {
        padding-left: 0 !important;
      }
      ::v-deep(.el-card) {
        border-radius: 0 20px 20px 0;
      }
      .title {
        width: 30%;
        min-width: 200px;
        height: 60px;
        line-height: 60px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        .el-icon {
          margin-right: 10px;
        }
        font-size: 24px;
        font-weight: 800;
        color: #333;
        background-color: #fff;
        border-radius: 0 20px 20px 0;
        box-shadow: 0 0 10px #ccc;
        margin: 10px 0;
      }
    }
  }
}
.nomore {
  padding: 10px;
  font-size: 25px;
  text-align: center;
  color: #999;
  border-radius: 10px;
  margin: 10px 0;
}
</style>
