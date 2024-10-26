<template>
  <div class="animate__fadeInUp animate__animated">
    <el-card style="width: 80%; margin: 0 auto; overflow: none">
      <el-row align="middle" justify="space-between"><h4>🏆 个人信息</h4> </el-row>
      <el-descriptions title="" direction="vertical" border style="margin-top: 20px">
        <el-descriptions-item label="姓名">
          <span>vdsvsvdsv</span>
        </el-descriptions-item>
        <el-descriptions-item label="性别">
          <span>♂ 男</span>
        </el-descriptions-item>
        <el-descriptions-item :rowspan="3" :width="250" label="照片" align="center">
          <el-image
            style="width: 200px; height: 280px"
            src="https://haowallpaper.com/link/common/file/getCroppingImg/15755452612383040"
            fit="cover"
          />
        </el-descriptions-item>
        <el-descriptions-item label="年龄">
          <span>54岁</span>
        </el-descriptions-item>

        <el-descriptions-item label="电话">
          <span>52533333333</span>
        </el-descriptions-item>

        <el-descriptions-item label="邮箱">
          <span>423424344442</span>
        </el-descriptions-item>
        <el-descriptions-item label="微信">
          <span>g6346366666666666</span>
        </el-descriptions-item>
        <el-descriptions-item label="QQ">
          <span>56346536366</span>
        </el-descriptions-item>
        <el-descriptions-item label="学校">南昌大学（211） </el-descriptions-item>
        <el-descriptions-item label="比赛证书">查看更多 ></el-descriptions-item>
      </el-descriptions>
      <div class="education">
        <el-row align="middle" justify="space-between"><h4>🏆 教育经历</h4> </el-row>
        <div
          class="detail"
          v-for="(item, index) in 2"
          :key="index"
          :style="{ backgroundImage: `url(https://haowallpaper.com/link/common/file/getCroppingImg/15755452612383040)` }"
        >
          <div class="top">
            <div class="logo">
              <img src="https://haowallpaper.com/link/common/file/getCroppingImg/15755452612383040" />
            </div>
            <div class="school">fdwfwfwf</div>
            <div class="time">wffwfff··········fwfwf</div>
          </div>
          <div class="major">fwfwwwwwwwwwwwww</div>
          <div class="desc">fwwwwwwwwwwwwwwwwww</div>
        </div>
      </div>
      <div class="expertise">
        <el-row align="middle" justify="space-between"><h4>🏆专业技能</h4> </el-row>
        <div class="list">
          <span class="item" v-for="(item, index) in 4" :key="item" draggable="true">⚡daaaaaaaaaaaaaaaaaaaaaaaaa</span>
        </div>
      </div>
      <div class="project">
        <el-row align="middle" justify="space-between"><h4>🏆项目经历</h4> </el-row>
        <div class="list">
          <!-- <Project
            @contextmenu.prevent="uploadImage(item._id)"
            draggable="true"
            @dragstart="dragStartProject($event, item._id)"
            v-for="item in projectData"
            :key="item._id"
            :data="item"
            @deleteImg="selectImg"
          /> -->
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
h4 {
  font-size: 30px;
  color: #fff;
  text-shadow: 4px -3px 5px #000;
}

.detail {
  width: 90%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding: 20px 40px;
  border-radius: 20px;
  box-shadow: 0 5px 10px #000;
  margin-top: 20px;
  .top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      width: 100px;
      height: 100px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        box-shadow: inset 0px -15px 30px #000;
      }
    }
    .school {
      font-size: 30px;
      font-weight: 700;
      text-shadow: 5px -5px 5px #000;
      flex: 1;
      margin-left: 30px;
    }
    .time {
      display: flex;
      align-items: center;
      font-weight: 700;
      text-shadow: 0 0 10px #000;
      font-size: 20px;
    }
  }
  .major {
    font-size: 20px;
    text-shadow: 5px -5px 10px #000;
    font-weight: 700;
  }
  .desc {
    font-size: 18px;
    text-shadow: 5px -5px 10px #000;
  }
}
.expertise {
  margin-top: 50px;
  h4 {
    font-size: 30px;
    // text-align: center;
    color: #fff;
    text-shadow: 4px -3px 5px #000;
  }
  .list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .item {
      font-size: 20px;
      background-color: var(--primary-color);
      padding: 5px 10px;
      border-radius: 20px;
      box-shadow: 1px 4px 10px #666;
      text-shadow: 0 0 10px #666;
      color: #fff;
      // width: 300px;
    }
  }
}
.project {
  margin-top: 50px;
  .list {
    display: flex;
    flex-direction: column;
  }
}
.uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.uploader {
  width: 200px;
  height: 280px;
  border: 1px dashed var(--el-border-color);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  // height: 178px;
  text-align: center;
}

::v-deep(.el-card) {
  overflow: visible;
}
</style>
