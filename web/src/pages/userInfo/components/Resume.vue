<template>
  <div class="animate__fadeInUp animate__animated">
    <el-card style="width: 80%; margin: 0 auto; overflow: none">
      <el-row align="middle" justify="space-between"><h4>🏆 个人信息</h4> </el-row>
      <el-descriptions title="" direction="vertical" border style="margin-top: 20px">
        <el-descriptions-item label="姓名">
          <span>{{ projectData?.name }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="性别">
          <span>{{ projectData?.sex === "0" ? "男" : "女" }}</span>
        </el-descriptions-item>
        <el-descriptions-item :rowspan="3" :width="250" label="照片" align="center">
          <el-image style="width: 200px; height: 280px; border-radius: 20px" :src="projectData?.photo" fit="cover" />
        </el-descriptions-item>
        <el-descriptions-item label="年龄">
          <span>{{ projectData?.age }}岁</span>
        </el-descriptions-item>

        <el-descriptions-item label="电话">
          <span>{{ projectData?.age }}</span>
        </el-descriptions-item>

        <el-descriptions-item label="邮箱">
          <span>{{ projectData?.email }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="微信">
          <span>{{ projectData?.weChat }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="QQ">
          <span>{{ projectData?.qq }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="学校"><el-tag type="primary">南昌大学（211） </el-tag></el-descriptions-item>
        <el-descriptions-item label="比赛证书">查看更多 ></el-descriptions-item>
      </el-descriptions>
      <div class="education">
        <el-row align="middle" justify="space-between"><h4>🏆 教育经历</h4> </el-row>
        <div class="detail" v-for="(item, index) in projectData?.educationInfo" :key="index" :style="{ backgroundImage: `url(${item.bg})` }">
          <div class="top">
            <div class="logo">
              <img :src="item.logo" fit="cover" />
            </div>
            <div class="school">{{ item.name }}</div>
            <div class="time">{{ dayjs(item.start_time).format("YYYY-MM") }}·········{{ dayjs(item.end_time).format("YYYY-MM") }}</div>
          </div>
          <div class="major">{{ item.major }}</div>
          <div class="desc">{{ item.desc }}</div>
        </div>
      </div>
      <div class="expertise">
        <el-row align="middle" justify="space-between"><h4>🏆专业技能</h4> </el-row>
        <div class="list">
          <span class="item" v-for="item in projectData?.expertise" :key="item" draggable="true">⚡{{ item }}</span>
        </div>
      </div>
      <div class="project">
        <el-row align="middle" justify="space-between"><h4>🏆项目经历</h4> </el-row>
        <div class="list">
          <ProjectCard v-for="item in projectData?.project" :key="item._id" :data="item" />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import ProjectCard from "./projectCard.vue"
import { getResumeInfoAPI } from "@/api/web/resume"
import { ref, onMounted } from "vue"
import type { ResumeWebInfo } from "@/types/admin/resume"
import dayjs from "dayjs"
// 简历信息
const projectData = ref<ResumeWebInfo>()

// 获取简历
const getResumeInfo = async () => {
  const res = await getResumeInfoAPI()
  if (res.code === 200) {
    // console.log(res)
    if (res.code === 200) {
      projectData.value = res.data
    }
  }
}

onMounted(() => {
  getResumeInfo()
})
</script>

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
      width: 80px;
      height: 80px;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        box-shadow: inset 0px -15px 30px #000;
      }
    }
    .school {
      font-size: 26px;
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
