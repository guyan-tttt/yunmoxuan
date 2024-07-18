<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue"
import type { UserInfo } from "@/types/admin/user"
import { useUserStore } from "@/store/modules/user"
import { ref } from "vue"
import { ElMessage } from "element-plus"
import { updateUserInfoAPI } from "@/api/admin/user"
import { useRouter } from "vue-router"

// 全局路有对象
const router = useRouter()

// 用户仓库对象
const userStore = useUserStore()

// 用户信息
const userInfo = ref<UserInfo>(Object.assign({}, userStore.userInfo))

// 用户头象选择
const selectAvatar = ref<string>("")

// 上传图片
const handleAvatar = (file: any) => {
  const isJPG = file.raw.type === "image/jpeg"
  const isPNG = file.raw.type === "image/png"

  const isLt2M = file.raw.size / 1024 / 1024 < 2

  if (!isJPG && !isPNG) {
    ElMessage.error("上传头像图片只能是 JPG / PNG 格式!")
    return
  }
  if (!isLt2M) {
    ElMessage.error("上传头像图片大小不能超过 2MB!")
    return
  }
  const url = URL.createObjectURL(file.raw)
  selectAvatar.value = url
  userInfo.value.file = file.raw
}

// 提交更新
const submitUpdate = async () => {
  // 表单校验
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      userInfo.value.avatar = selectAvatar.value ? selectAvatar.value : userInfo.value.avatar
      const formData = new FormData()
      for (const key in userInfo.value) {
        //@ts-ignore
        formData.append(key, userInfo.value[key])
      }
      const res = await updateUserInfoAPI(formData)
      if (res.code === 200) {
        ElMessage.success("更新成功")
        userStore.setUserInfo()
        cancelUpdate()
      }
    }
  })
}

// 取消
const cancelUpdate = () => {
  // 清除头像信息
  selectAvatar.value = ""
  // 清除用户信息
  userInfo.value = Object.assign({}, userStore.userInfo)
  // 清除表单校验
  formRef.value.resetFields()
  // 跳转到首页
  router.back()
}

// 校验规则
const rules: any = {
  username: [
    { required: true, message: "请输入用户名称", trigger: "blur" },
    { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入用户密码", trigger: "blur" },
    { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
  ],
  email: [
    { required: true, message: "请输入用户邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }
  ],
  nickname: [{ required: true, message: "请输入用户昵称", trigger: "blur" }],
  gender: [{ required: true, message: "请选择用户性别", trigger: "blur" }],
  avatar: [{ required: true, message: "请上传用户头像", trigger: "blur" }],
  phone: [
    { required: true, message: "请输入用户手机号", trigger: "blur" },
    { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" }
  ]
}
// 表单对象
const formRef = ref<any>()
</script>

<template>
  <el-card shadow="never" :body-style="{ padding: '20px' }">
    <el-form ref="formRef" :model="userInfo" :rules="rules" style="max-width: 60%; margin: 0 auto" topwidth="160px">
      <el-form-item label="用户名称" prop="username">
        <el-input v-model="userInfo.username" clearable />
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input v-model="userInfo.password" type="password" clearable />
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="userInfo.nickname" clearable />
      </el-form-item>
      <el-form-item label="用户性别" prop="gender">
        <el-radio-group v-model="userInfo.gender" style="display: flex; align-items: center">
          <el-radio :value="1" style="display: flex; align-items: center">
            <SvgIcon name="boy" style="width: 30px; height: 30px" />
          </el-radio>
          <el-radio :value="2" style="display: flex; align-items: center">
            <SvgIcon name="girl" style="width: 30px; height: 30px" />
          </el-radio>
          <el-radio :value="0" style="display: flex; align-items: center"> 未知性别 </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="userInfo.email" clearable />
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="userInfo.phone" clearable />
      </el-form-item>
      <el-form-item label="用户头像" prop="avatar">
        <el-upload
          :on-change="handleAvatar"
          class="avatar-uploader"
          action="#"
          :auto-upload="false"
          :show-file-list="false"
        >
          <img class="img" v-if="userInfo.avatar" :src="selectAvatar ? selectAvatar : userInfo.avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户简介">
        <el-input v-model="userInfo.introduction" type="textarea" />
      </el-form-item>

      <el-form-item label="GihHub 访问地址">
        <el-input v-model="userInfo.github" clearable />
      </el-form-item>
      <el-form-item label="Gitee 访问地址">
        <el-input v-model="userInfo.gitee" clearable />
      </el-form-item>
      <el-form-item label="CSDN 访问地址">
        <el-input v-model="userInfo.csdn" clearable />
      </el-form-item>
      <el-form-item>
        <div style="margin: 0 auto">
          <el-button size="large" type="primary" @click="submitUpdate">保存</el-button>
          <el-button size="large" type="default" @click="cancelUpdate">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
}
.img {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
  border-color: var(--el-color-primary);
}
</style>
