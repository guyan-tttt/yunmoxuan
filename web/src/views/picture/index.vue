<template>
  <div class="picture">
    <el-row justify="space-between" style="min-height: 800px">
      <el-col
        :span="16"
        class=".limit-box"
        v-infinite-scroll="load"
        infinite-scroll-distance="20px"
        style="overflow: auto; height: 800px"
      >
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
          <div class="item" v-for="item in 5" :key="item">
            <div class="info">
              <el-icon><Picture /></el-icon>
              生活记录
            </div>
            <div class="right">
              <el-icon color="#267ee8"><WarningFilled /></el-icon>
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
      <EditCategory />
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import EditCategory from "./modules/EditCategory.vue"
import ImageList from "./modules/ImageList.vue"
// 分类编辑弹框
const categoryDrawer = ref<boolean>(false)

// 分组数据

// 打开弹窗
const openDrawer = () => {
  categoryDrawer.value = true
}

const load = () => {
  console.log(1)
}
</script>

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
    }
  }
}
</style>
