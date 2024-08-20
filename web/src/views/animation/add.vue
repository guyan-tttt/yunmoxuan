<template>
  <div>
    <el-card>
      <el-row align="middle">
        <div class="back" @click="cancel">
          <el-icon :size="26"> <Back /></el-icon>
          <span>返回</span>
        </div>
        <div class="title">⭐添加动漫⭐</div>
      </el-row>
    </el-card>
    <el-card>
      <el-form ref="animationRef" :rules="rules" :model="animationForm">
        <el-form-item label="动漫名称" prop="name">
          <el-input v-model="animationForm.name" placeholder="请输入动漫名称" />
        </el-form-item>
        <el-form-item label="动漫描述" prop="desc">
          <el-input type="textarea" v-model="animationForm.desc" placeholder="请输入动漫描述" />
        </el-form-item>
        <el-form-item label="动漫封面" prop="cover" required>
          <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-change="handleBg" :auto-upload="false">
            <img v-if="animationForm.cover" :src="animationForm.cover" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="动漫评分" prop="score">
          <el-input type="number" :max="10" :min="0" v-model="animationForm.score" placeholder="请输入动漫评分" />
        </el-form-item>
        <el-form-item label="动漫链接" prop="link">
          <el-input v-model="animationForm.link" placeholder="请输入动漫链接" />
        </el-form-item>
        <el-form-item label="动漫类型" prop="type">
          <el-select v-model="animationForm.type" placeholder="请选择动漫类型">
            <el-option label="2D" value="2D" />
            <el-option label="3D" value="3D" />
          </el-select>
        </el-form-item>
        <el-form-item label="动漫热度" prop="hot">
          <el-input v-model="animationForm.hot" type="number" placeholder="请输入动漫热度" />
        </el-form-item>
        <el-form-item label="动漫状态" prop="status" required>
          <el-radio-group v-model="animationForm.status">
            <el-radio v-for="item in status" :key="item.value" :value="item.value" size="large">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-popover placement="bottom" title="备注类型" :width="200" trigger="click" content="即为动漫停更时间/播出时间/完结时间">
            <template #reference>
              <el-input type="date" v-model="animationForm.remark" />
            </template>
          </el-popover>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" @click="cancel">取消</el-button>
          <el-button class="btn" type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { addAnimationAPI } from "@/api/admin/animation"
import { useRouter } from "vue-router"
import { ElMessage, type FormInstance } from "element-plus"
import { AnimeItem } from "@/types/admin/animation"

// 全局路由
const router = useRouter()

// 表单数据
const animationForm = ref<AnimeItem>({
  name: "",
  desc: "",
  cover: "",
  score: 0,
  link: "",
  type: "",
  hot: 0,
  file: null,
  status: 1,
  // 备注
  remark: ""
})

// 动漫状态
const status = [
  {
    value: 0,
    label: "⏸停更中"
  },
  {
    value: 1,
    label: "⏹连载中"
  },
  {
    value: 2,
    label: "⏫已完结"
  }
]
// 表单校验
const rules: any = {
  name: [
    { required: true, message: "请输入名称", trigger: "blur" },
    { min: 2, max: 10, message: "长度在 2 到 20 个字符", trigger: "blur" }
  ],
  desc: [{ required: true, message: "请输入描述", trigger: "blur" }],
  score: [
    { required: true, message: "请输入评分", trigger: "blur" },
    {
      validator: (rule: any, value: string) => {
        const type = Number.parseFloat(value)
        if (isNaN(type)) {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              reject("请输入正确的评分")
            }, 100)
          })
        }
        if (type < 0 || type > 10) {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              reject("评分在 0 到 10 之间")
            }, 100)
          })
        }
        animationForm.value.score = type
        return true
      },
      trigger: "blur"
    }
  ],
  cover: [
    {
      validate: (rule: any, value: any) => {
        if (value) {
          return true
        } else {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              reject("请上传封面")
            }, 100)
          })
        }
      },
      trigger: "blur"
    }
  ],
  link: [{ required: true, message: "请输入链接", trigger: "blur" }],
  type: [{ required: true, message: "请选择类型", trigger: "blur" }],
  hot: [
    { required: true, message: "请输入热度", trigger: "blur" },
    {
      validator: (rule: any, value: string) => {
        const type = Number.parseInt(value)
        if (isNaN(type)) {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              reject("请输入正确的评分")
            }, 100)
          })
        }
        animationForm.value.hot = type
        return true
      },
      trigger: "blur"
    }
  ],
  remark: [{ required: true, message: "请输入备注", trigger: "blur" }]
}
// 上传图片
const handleBg = (file: any) => {
  const img = URL.createObjectURL(file.raw)
  animationForm.value.cover = img
  animationForm.value.file = file.raw
}

// 表单对象
const animationRef = ref<FormInstance>()

// 点击提交
const handleSubmit = () => {
  console.log(animationForm.value)

  animationRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      const formData = new FormData()
      formData.append("name", animationForm.value.name)
      formData.append("desc", animationForm.value.desc)
      formData.append("score", animationForm.value.score + "")
      formData.append("link", animationForm.value.link)
      formData.append("type", animationForm.value.type)
      formData.append("hot", animationForm.value.hot + "")
      formData.append("file", animationForm.value.file as any)
      formData.append("status", animationForm.value.status + "")
      formData.append("remark", animationForm.value.remark)
      const res = await addAnimationAPI(formData)
      if (res.code === 200) {
        ElMessage.success("添加成功")
        cancel()
      } else {
        ElMessage.error(res.message)
      }
    }
  })
}

// 取消
const cancel = () => {
  animationForm.value = {
    name: "",
    desc: "",
    score: 0,
    link: "",
    type: "1",
    hot: 0,
    cover: "",
    status: 1,
    file: null,
    remark: ""
  }
  animationRef.value?.resetFields()
  router.back()
}
</script>

<style scoped lang="scss">
.back {
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: #409eff;
  }
}
.title {
  font-size: 20px;
  margin-left: 15px;
  text-shadow: 0 0 2px #000;
}
.avatar {
  width: 178px;
  object-fit: cover;
}
::v-deep(.el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  height: 100px;
}

::v-deep(.avatar-uploader .el-upload:hover) {
  border-color: var(--el-color-primary);
}

::v-deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.btn {
  width: 200px;
}
</style>
