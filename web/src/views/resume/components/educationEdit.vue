<template>
  <div>
    <el-dialog v-model="dialogShow" title="添加教育经历" width="30%">
      <el-form ref="formRef" :model="formData" :rules="rules" :label-width="100">
        <el-form-item label="学校名称" prop="name">
          <el-input placeholder="请输入学校名称" v-model="formData.name" />
        </el-form-item>
        <el-form-item label="专业/学科" prop="major">
          <el-input placeholder="请输入专业/学科" v-model="formData.major" />
        </el-form-item>
        <el-form-item label="时间阶段" prop="time">
          <el-date-picker type="yearrange" range-separator="至" v-model="formData.time" start-placeholder="开始时间" end-placeholder="结束时间" />
        </el-form-item>
        <el-form-item label="学校logo" prop="logo">
          <el-upload class="avatar-uploader" action="" :show-file-list="false" :auto-upload="false" :on-change="uploadImg">
            <el-image v-if="formData.logo" class="avatar" :src="formData.logo" fit="cover" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="背景图片" prop="bgImg">
          <el-input placeholder="请输入背景链接" v-model="formData.bgImg" />
        </el-form-item>
        <el-form-item label="相关描述" prop="desc">
          <el-input type="textarea" v-model="formData.desc" placeholder="请输入相关描述" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">确定</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineModel } from "vue"
import { type UploadFile, type FormRules, type FormInstance } from "element-plus"

const props = defineProps<{
  resumeId: string
}>()
const dialogShow = defineModel({
  type: Boolean,
  default: false,
  set(val) {
    return val
  }
})

const formData = ref({
  name: "",
  major: "",
  time: "",
  logo: "",
  bgImg: "",
  desc: "",
  file: null,
  resumeId: ""
})

// 校验规则
const rules: FormRules = {
  name: [{ required: true, message: "请输入学校名称", trigger: "blur" }],
  major: [{ required: true, message: "请输入专业/学科", trigger: "blur" }],
  time: [{ required: true, message: "请输入时间阶段", trigger: "blur" }],
  logo: [
    { required: true, message: "请上传学校logo", trigger: "blur" },
    {
      //@ts-ignore
      validator: (rule: any, value: any) => {
        if (!value && formData.value.file == null) return Promise.reject("请上传学校logo")
        return Promise.resolve()
      },
      trigger: "blur"
    }
  ],
  bgImg: [{ required: true, message: "请输入背景链接", trigger: "blur" }],
  desc: [{ required: true, message: "请输入相关描述", trigger: "blur" }]
}

// 表单
const formRef = ref<FormInstance>()
// 提交
const submit = () => {
  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      formData.value.resumeId = props.resumeId

      console.log(formData.value)
    }
  })
}

// 图片上传
const uploadImg = (file: UploadFile) => {
  formData.value.logo = URL.createObjectURL(file.raw as File)
  formData.value.file = file.raw as any
}

const cancel = () => {
  dialogShow.value = false
  formData.value = {
    name: "",
    major: "",
    time: "",
    logo: "",
    bgImg: "",
    desc: "",
    file: null,
    resumeId: props.resumeId
  }
  formRef.value?.resetFields()
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
