<template>
  <div class="picture">
    <el-row justify="space-between" style="min-height: 400px">
      <el-col :span="16">1</el-col>
      <el-col :span="7">
        <div class="title">
          <el-row>
            <span
              ><el-icon><FolderOpened /></el-icon>相册分组</span
            >
            <el-button type="primary">编辑分组</el-button>
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
          <div class="swiper" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup></script>

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
      }
    }
    .el-col:nth-child(1) {
      background-color: #fff;
      border-radius: 0 20px 20px 0;
    }
  }
}
</style>
