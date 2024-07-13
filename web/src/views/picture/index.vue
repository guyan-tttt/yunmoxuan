<script setup lang="ts">
import { ref, onMounted } from "vue"
import EditCategory from "./modules/EditCategory.vue"
import ImageList from "./modules/ImageList.vue"
import { getImageCategoryListAPI } from "@/api/admin/imageCategory"
import { uploadImageAPI } from "@/api/admin/image"
import dayjs from "dayjs"
import { ElMessage, type UploadFile, type UploadRawFile } from "element-plus"
import type { ImageCategoryItem } from "@/types/admin/imageCategory"
import type { ImageUploadForm } from "@/types/admin/image"
// 分类编辑弹框
const categoryDrawer = ref<boolean>(false)

// 打开弹窗
const openDrawer = () => {
  categoryDrawer.value = true
}

// 触底加载所执行的函数
const load = () => {
  console.log(1, 43)
}

// 分类数据
const imageCategoryList = ref<ImageCategoryItem[]>([])

// 获取图片分类数据
const getCategoryList = async () => {
  const res = await getImageCategoryListAPI()

  res.data.forEach((item: ImageCategoryItem) => {
    item.isEdit = false
    item.showDeleteIcon = false
    item.value = item.name
    item.createTime = dayjs(item.createTime).format("YYYY-MM-DD")
  })
  imageCategoryList.value = res.data
}

// 图片上传
const changeUpload = (file: UploadFile) => {
  imageFormData.value.fileList.push(file.raw as UploadRawFile)
  console.log(imageFormData.value.fileList)
}
// 图片上传表单数据
const imageFormData = ref<ImageUploadForm>({
  categoryID: "",
  fileList: []
})
// 图片上传提交
const imageUploadSubmit = async () => {
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
  }
}

// 初始化
onMounted(() => {
  getCategoryList()
})
</script>
<template>
  <div class="picture">
    <el-row justify="space-between" style="min-height: 800px">
      <el-col
        :span="16"
        class=".limit-box"
        v-infinite-scroll="load"
        infinite-scroll-distance="200px"
        style="overflow-y: auto; height: 800px"
      >
        <el-row>
          <div class="title">
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
                action=""
                :auto-upload="false"
                list-type="picture-card"
                :on-change="changeUpload"
                :on-preview="() => {}"
                :on-remove="() => {}"
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
          <div class="title">
            <el-icon size="28" color="#093ddc"><PictureFilled /></el-icon>
            照片展示
          </div>
        </el-row>
        <ImageList />
      </el-col>
      <el-col :span="7">
        <div class="title">
          <el-row>
            <span
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
            <div class="info">
              <el-icon><PictureFilled /></el-icon>
              照片精选
            </div>
          </div>
          <el-carousel height="400px" direction="vertical" type="card" :autoplay="true">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3 text="2xl" justify="center">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
    </el-row>
    <el-drawer size="40%" v-model="categoryDrawer" :with-header="false">
      <EditCategory @update="getCategoryList" :data="imageCategoryList" />
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.picture {
  width: 100%;
  .el-row {
    .el-col:nth-child(2) {
      background-color: #fff;
      border-radius: 20px 0 0 20px;
      padding: 20px;
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
          background-color: #f5f5f5;
          cursor: pointer;
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
      background-color: #fff;
      border-radius: 0 20px 20px 0;
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
</style>
