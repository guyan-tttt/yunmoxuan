<template>
  <div>
    <el-drawer v-model="drawerShow" title="添加项目经历" size="50%">
      <el-form ref="formRef" :model="projectForm" :rules="rules" :label-width="100">
        <el-form-item label="项目名称" prop="name">
          <el-input placeholder="请输入项目名称" v-model="projectForm.name" />
        </el-form-item>
        <el-form-item label="项目链接" prop="link">
          <el-input placeholder="请输入项目链接" v-model="projectForm.link" />
        </el-form-item>
        <el-form-item label="时间阶段" prop="time">
          <el-date-picker
            :default-value="new Date()"
            unlink-panels
            type="monthrange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            v-model="projectForm.time"
          />
        </el-form-item>
        <el-form-item label="项目logo" prop="logo">
          <el-upload class="avatar-uploader" action="" :show-file-list="false" :auto-upload="false" :on-change="uploadImg">
            <el-image v-if="projectForm.logo" class="avatar" :src="projectForm.logo" fit="cover" />
            <el-icon v-else class="avatar-uploader-icon" size="30"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="背景图片" prop="bgImg">
          <el-input placeholder="请输入背景链接" v-model="projectForm.bgImg" />
        </el-form-item>
        <el-form-item label="相关描述" prop="desc">
          <el-input type="textarea" placeholder="请输入相关描述" v-model="projectForm.desc" />
        </el-form-item>
        <el-form-item label="项目简介" prop="content">
          <QuillEditor
            v-model:content="projectForm.content"
            ref="quillRef"
            style="width: 100%; height: 300px"
            contentType="html"
            :options="Options"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">确定</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, defineModel } from "vue"
import { QuillEditor } from "@vueup/vue-quill"
import "@vueup/vue-quill/dist/vue-quill.snow.css"
import "@vueup/vue-quill/dist/vue-quill.bubble.css"
import { type FormInstance } from "element-plus"
import { addProjectAPI } from "@/api/admin/resume"
import { ElMessage } from "element-plus"

const drawerShow = defineModel({
  type: Boolean,
  default() {
    return false
  },
  set(val: boolean) {
    return val
  }
})

const projectForm = ref({
  name: "",
  link: "",
  logo: "",
  file: null,
  bgImg: "",
  desc: "",
  time: "",
  content: ""
})

const rules = {
  name: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
  logo: [
    {
      required: true,
      message: "请上传项目logo",
      trigger: "blur"
    },
    {
      validator: (rule: any, value: any) => {
        if (!value && projectForm.value.file == null) {
          return new Error("请上传项目logo")
        } else {
          return true
        }
      },
      trigger: "blur"
    }
  ],
  bgImg: [{ required: true, message: "请输入背景链接", trigger: "blur" }],
  desc: [{ required: true, message: "请输入相关描述", trigger: "blur" }],
  content: [{ required: true, message: "请输入项目简介", trigger: "blur" }],
  time: [{ required: true, message: "请选择时间阶段", trigger: "blur" }]
}

const uploadImg = (file: any) => {
  const url = URL.createObjectURL(file.raw)
  projectForm.value.logo = url
  projectForm.value.file = file.raw
}

// 富文本编辑器配置
const Options = {
  theme: "snow",
  placeholder: "请在这里输入",
  modules: {
    toolbar: {
      container: [
        // [{ 'header': 1 }, { 'header': 2 }], // 标题 —— 独立平铺
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题 —— 下拉选择
        [{ size: ["small", false, "large", "huge"] }], // 字体大小
        [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
        ["blockquote", "code-block"], // 引用  代码块
        // 链接按钮需选中文字后点击
        ["link", "image", "video"], // 链接、图片、视频
        [{ align: [] }], // 对齐方式// text direction
        [{ indent: "-1" }, { indent: "+1" }], // 缩进
        ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
        [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
        [{ script: "sub" }, { script: "super" }], // 下标/上标
        [{ font: [] }], //字体
        ["clean"] // 清除文本格式
      ]
    },
    syntax: {
      highlight: (text: string) => {
        //@ts-ignore
        return hljs.highlightAuto(text).value // 这里就是代码高亮需要配置的地方
      }
    }
  }
}

const formRef = ref<FormInstance>()

// 提交
const submit = () => {
  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      const formData = new FormData()
      for (const key in projectForm.value) {
        // @ts-ignore
        formData.append(key, projectForm.value[key])
      }
      const res = await addProjectAPI(formData)
      if (res.code === 200) {
        ElMessage.success("添加成功")
        drawerShow.value = false
      }
    }
  })
}
</script>

<style scoped lang="scss">
.avatar-uploader {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #999;
  border-radius: 10px;
  ::v-deep(.avatar) {
    width: 100px;
    height: 100px;
    border-radius: 10px;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #999;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: 1px solid #999;
}
</style>
