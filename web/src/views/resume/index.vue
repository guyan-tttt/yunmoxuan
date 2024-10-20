<template>
  <div>
    <el-card style="width: 70%; margin: 0 auto">
      <el-row align="middle" justify="space-between"
        ><h4>🏆 个人信息</h4>
        <el-button v-if="!edit" type="primary" @click="editResume">编辑简历</el-button>
        <el-button v-else type="success" @click="submitResume">提交简历</el-button>
      </el-row>
      <el-descriptions v-if="resume" title="" direction="vertical" border style="margin-top: 20px">
        <el-descriptions-item label="姓名">
          <span v-if="!edit">{{ resume.name }}</span>
          <el-input v-else v-model="resumeForm.name" placeholder="请输入姓名" />
        </el-descriptions-item>
        <el-descriptions-item label="性别">
          <span v-if="!edit">{{ resume.sex === "1" ? "♂ 男" : "♀︎ 女" }}</span>
          <el-radio-group v-else v-model="resumeForm.sex">
            <el-radio value="1">♂ 男</el-radio>
            <el-radio value="0">♀︎ 女</el-radio>
          </el-radio-group>
        </el-descriptions-item>
        <el-descriptions-item :rowspan="3" :width="250" label="照片" align="center">
          <el-image v-if="!edit" style="width: 200px; height: 280px" :src="resume.photo" fit="cover" />
          <el-upload v-else class="uploader" action="" :show-file-list="false" :auto-upload="false" @change="uploadPhoto">
            <el-image v-if="resumeForm.photo" style="width: 200px; height: 280px" :src="resumeForm.photo" fit="cover" />
            <el-icon v-else class="uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-descriptions-item>
        <el-descriptions-item label="年龄">
          <span v-if="!edit">{{ resume.age }}岁</span>
          <el-input v-else placeholder="请输入年龄" v-model="resumeForm.age" />
        </el-descriptions-item>

        <el-descriptions-item label="电话">
          <span v-if="!edit">{{ resume.phone }}</span>
          <el-input v-else v-model="resumeForm.phone" placeholder="请输入电话号码" />
        </el-descriptions-item>

        <el-descriptions-item label="邮箱">
          <span v-if="!edit">{{ resume.email }}</span>
          <el-input v-else v-model="resumeForm.email" placeholder="请输入邮箱地址" />
        </el-descriptions-item>
        <el-descriptions-item label="微信">
          <span v-if="!edit">{{ resume.weChat }}</span>
          <el-input v-else v-model="resumeForm.weChat" placeholder="请输入微信号" />
        </el-descriptions-item>
        <el-descriptions-item label="QQ">
          <span v-if="!edit">{{ resume.qq }}</span>
          <el-input v-else v-model="resumeForm.qq" placeholder="请输入QQ号" />
        </el-descriptions-item>
        <el-descriptions-item label="学校">南昌大学（211） </el-descriptions-item>
        <el-descriptions-item label="比赛证书">查看更多 ></el-descriptions-item>
      </el-descriptions>
      <div class="education" v-if="resume">
        <el-row align="middle" justify="space-between"
          ><h4>🏆 教育经历</h4>
          <div>
            <el-button size="large" @click="openEducationEdit" type="primary" circle :icon="Plus" />
            <el-button size="large" type="danger" circle :icon="DeleteFilled" @dragover.prevent="() => {}" @drop="deleteEducation" />
          </div>
        </el-row>
        <div
          @dragstart="dragStartEducation($event, index)"
          draggable="true"
          class="detail"
          v-for="(item, index) in education"
          :key="index"
          :style="{ backgroundImage: `url(${item.bg})` }"
        >
          <div class="top">
            <div class="logo">
              <img :src="item.logo" />
            </div>
            <div class="school">{{ item.name }}</div>
            <div class="time">{{ dayjs(item.start_time).format("YYYY.MM") }}··········{{ dayjs(item.end_time).format("YYYY.MM") }}</div>
          </div>
          <div class="major">{{ item.major }}</div>
          <div class="desc">{{ item.desc }}</div>
        </div>
        <EducationEdit :resumeId="resume._id" v-model="educationShow" @update:modelValue="getEducation" />
      </div>
      <div class="expertise" v-if="resume">
        <el-row align="middle" justify="space-between"
          ><h4>🏆专业技能</h4>
          <div>
            <el-button @click="openExpertiseEdit" size="large" type="primary" circle :icon="Plus" />
            <el-button size="large" type="danger" circle :icon="DeleteFilled" @dragover.prevent="() => {}" @drop="deleteSkill" />
          </div>
        </el-row>
        <div class="list">
          <span class="item" v-for="(item, index) in skill" :key="item" draggable="true" @dragstart="dragStartSkill($event, index)"
            >⚡{{ item }}</span
          >
        </div>
        <ExpertiseEdit @update:modelValue="getSkill" :resumeId="resume._id" v-model="expertiseShow" />
      </div>
      <div class="project" v-if="resume">
        <el-row align="middle" justify="space-between"
          ><h4>🏆项目经历</h4>
          <div>
            <el-button size="large" type="primary" circle :icon="Plus" @click="openProjectEdit" />
            <el-button size="large" type="danger" circle :icon="DeleteFilled" @dragover.prevent="() => {}" />
          </div>
        </el-row>
        <div class="list">
          <Project v-for="item in projectData" :key="item._id" :data="item" />
        </div>
        <projectEdit v-model="projectShow" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import Project from "./components/projectItem.vue"
import EducationEdit from "./components/educationEdit.vue"
import ExpertiseEdit from "./components/expertiseEdit.vue"
import projectEdit from "./components/projectEdit.vue"

import { ref, onMounted } from "vue"
import { addResumeAPI, getResumeAPI, getEducationAPI, deleteEducationAPI, getSkillAPI, deleteSkillAPI, getProjectAPI } from "@/api/admin/resume"
import { ElMessage, ElMessageBox } from "element-plus"
import { Plus, DeleteFilled } from "@element-plus/icons-vue"
import dayjs from "dayjs"
import type { EducationInfo, ResumeInfo } from "@/types/admin/resume"

// 当前编辑状态
const edit = ref<boolean>(false)

// 开启编辑
const editResume = () => {
  edit.value = true
  resumeForm.value = { ...resume.value } as ResumeInfo
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
  if (res.code === 200) {
    ElMessage.success("提交成功")
    getResume()
  }
}

interface ResumeForm {
  name: string
  sex: string
  age: number
  phone: string
  email: string
  weChat: string
  qq: string
  photo: string
  file: any
}

// 个人信息表单
const resumeForm = ref<ResumeForm | ResumeInfo>({
  name: "",
  sex: "1",
  age: 20,
  phone: "",
  email: "",
  weChat: "",
  qq: "",
  photo: "",
  file: null
})

// 照片上传
const uploadPhoto = (file: any) => {
  const url = URL.createObjectURL(file.raw)
  resumeForm.value.photo = url
  resumeForm.value.file = file.raw as any
  console.log(file)
}

// 简历信息
const resume = ref<ResumeInfo>()

// 获取简历信息
const getResume = async () => {
  const res = await getResumeAPI()
  if (res.code === 200) {
    resume.value = res.data
  }
}

// 教育信息编辑弹框
const educationShow = ref<boolean>(false)

// 打开教育编辑弹框
const openEducationEdit = () => {
  educationShow.value = true
}

// 获取教育信息
const getEducation = async () => {
  const res = await getEducationAPI(resume.value?._id as string)
  if (res.code === 200) {
    education.value = res.data
    console.log(res)
  }
}

// 教育数据
const education = ref<EducationInfo[]>([])

// 拖拽开始
const dragStartEducation = (e: any, index: number) => {
  e.dataTransfer.setData("text/plain", `${index}-education`)
}

// 教育删除
const deleteEducation = (e: any) => {
  e.preventDefault()
  const type = (e.dataTransfer.getData("text/plain") as string).split("-")[1] as string
  if (type !== "education") return

  const index = (e.dataTransfer.getData("text/plain") as string).split("-")[0]

  ElMessageBox.confirm("确定删除吗？", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async () => {
    const res = await deleteEducationAPI(resume.value?._id as string, parseInt(index))
    console.log(res)
    if (res.code === 200) {
      ElMessage.success("删除成功")
      getEducation()
    }
  })
}

// 专业技能编辑弹框
const expertiseShow = ref<boolean>(false)

// 开启专业技能编辑弹框
const openExpertiseEdit = () => {
  expertiseShow.value = true
}

// 专业技能
const skill = ref<string[]>([])

// 获取专业技能列表
const getSkill = async () => {
  const res = await getSkillAPI(resume.value?._id as string)
  if (res.code === 200) {
    skill.value = res.data.filter((item: string) => item !== "")
    console.log(res)
  }
}

// 拖拽开始
const dragStartSkill = (e: any, index: number) => {
  e.dataTransfer.setData("text/plain", `${index}-skill`)
}

// 删除技能
const deleteSkill = (e: any) => {
  const type = (e.dataTransfer.getData("text/plain") as string).split("-")[1] as string
  const index = (e.dataTransfer.getData("text/plain") as string).split("-")[0]
  if (type !== "skill") return
  ElMessageBox.confirm("确定删除吗？", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async () => {
    const res = await deleteSkillAPI(resume.value?._id as string, skill.value[parseInt(index)])
    if (res.code === 200) {
      ElMessage.success("删除成功")
      getSkill()
    }
  })
}

// 项目经历弹框
const projectShow = ref<boolean>(false)

// 打开项目经历弹框
const openProjectEdit = () => {
  projectShow.value = true
}

// 项目经历数据
const projectData = ref<any[]>([])

// 获取项目经历
const getProject = async () => {
  const res = await getProjectAPI()
  if (res.code === 200) {
    projectData.value = res.data
  }
}
onMounted(async () => {
  await getResume()
  getEducation()
  getSkill()
  getProject()
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
</style>
