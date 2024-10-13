<template>
  <div>
    <el-card style="width: 70%; margin: 0 auto">
      <el-row align="middle" justify="space-between"
        ><h4>🏆 个人信息</h4>
        <el-button v-if="!edit" type="primary" @click="editResume">编辑简历</el-button>
        <el-button v-else type="success" @click="submitResume">提交简历</el-button>
      </el-row>
      <el-descriptions title="" direction="vertical" border style="margin-top: 20px">
        <el-descriptions-item label="姓名">
          <span v-if="!edit">张三</span>
          <el-input v-else v-model="resumeForm.name" placeholder="请输入姓名" />
        </el-descriptions-item>
        <el-descriptions-item label="性别">
          <span v-if="!edit">张三</span>
          <el-radio-group v-else v-model="resumeForm.sex">
            <el-radio :value="1">♂ 男</el-radio>
            <el-radio :value="0">♀︎ 女</el-radio>
          </el-radio-group>
        </el-descriptions-item>
        <el-descriptions-item :rowspan="3" :width="250" label="照片" align="center">
          <el-image v-if="!edit" style="width: 200px; height: 280px" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <el-upload v-else class="uploader" action="" :show-file-list="false" :auto-upload="false" @change="uploadPhoto">
            <el-image v-if="resumeForm.photo" style="width: 200px; height: 280px" :src="resumeForm.photo" fit="cover" />
            <el-icon v-else class="uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-descriptions-item>
        <el-descriptions-item label="年龄">
          <span v-if="!edit">张三</span>
          <el-input v-else placeholder="请输入年龄" v-model="resumeForm.age" />
        </el-descriptions-item>

        <el-descriptions-item label="电话">
          <span v-if="!edit">张三</span>
          <el-input v-else v-model="resumeForm.phone" placeholder="请输入电话号码" />
        </el-descriptions-item>

        <el-descriptions-item label="邮箱">
          <span v-if="!edit">张三</span>
          <el-input v-else v-model="resumeForm.email" placeholder="请输入邮箱地址" />
        </el-descriptions-item>
        <el-descriptions-item label="微信">
          <span v-if="!edit">张三</span>
          <el-input v-else v-model="resumeForm.wechat" placeholder="请输入微信号" />
        </el-descriptions-item>
        <el-descriptions-item label="QQ">
          <span v-if="!edit">张三</span>
          <el-input v-else v-model="resumeForm.qq" placeholder="请输入QQ号" />
        </el-descriptions-item>
        <el-descriptions-item label="学校">南昌大学（211） </el-descriptions-item>
        <el-descriptions-item label="比赛证书">查看更多 ></el-descriptions-item>
      </el-descriptions>
      <div class="education">
        <h4>🏆 教育信息</h4>
        <div class="detail">
          <div class="top">
            <div class="logo">
              <img src="https://www.shanghairanking.cn/_uni/logo/25119833.png" />
            </div>
            <div class="school">南昌大学</div>
            <div class="time">2017.9··········2021.6</div>
          </div>
          <div class="major">信息管理与信息系统</div>
          <div class="desc">主修课程：javascript高级程序设计，网页开发与设计，数据库原理，数据结构，java高级程序设计，web程序设计等等。</div>
        </div>
      </div>
      <div class="expertise">
        <h4>🏆 专业技能</h4>
        <div class="list">
          <div class="item" v-for="item in 4" :key="item">⚡掌握Vue.js开发全家桶，Vue3,pinia,VueRouter及相关技术栈。</div>
        </div>
      </div>
      <div class="project">
        <h4>🏆 项目经历</h4>
        <div class="list">
          <Project v-for="item in 3" :key="item" />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import Project from "./components/projectItem.vue"
import { ref } from "vue"
import { addResumeAPI } from "@/api/admin/resume"

// 当前编辑状态
const edit = ref(false)

// 开启编辑
const editResume = () => {
  edit.value = true
}

// 提交简历
const submitResume = async () => {
  edit.value = false
  const formData = new FormData()
  for (const key in resumeForm.value) {
    // @ts-ignore
    formData.append(key, resumeForm.value[key])
  }

  const res = await addResumeAPI(formData)
  console.log(res)
}

// 个人信息表单
const resumeForm = ref({
  name: "",
  sex: 1,
  age: 20,
  phone: "",
  email: "",
  wechat: "",
  qq: "",
  photo: "",
  file: null
})

// 照片上传
const uploadPhoto = (file: any) => {
  const url = URL.createObjectURL(file.raw)
  resumeForm.value.photo = url
  resumeForm.value.file = file.raw
  console.log(file)
}
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
  background-image: url(https://haowallpaper.com/link/common/file/getCroppingImg/786d50481e9c29b09d0ced4c83ca67f0786d50481e9c29b09d0ced4c83ca67f0);
  color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding: 20px 40px;
  border-radius: 20px;
  box-shadow: 0 5px 10px #000;
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
      box-shadow: 1px 4px 10px #000;
      text-shadow: 0 0 10px #000;
      color: #fff;
      display: inline;
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
</style>
