<script lang="ts" setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { ElMessage, type FormInstance, type FormRules, ElNotification } from "element-plus"
import { User, Lock, Key, Picture, Loading } from "@element-plus/icons-vue"
import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
import Owl from "./components/Owl.vue"
import { useFocus } from "./hooks/useFocus"
import { loginAPI } from "@/api/admin/user"
import { useUserStore } from "@/store/modules/user"
import type { LoginResponseData } from "@/types/admin/user"

const router = useRouter()
const { isFocus, handleBlur, handleFocus } = useFocus()

// 用户信息仓库
const userStore = useUserStore()

/** 登录表单元素的引用 */
const loginFormRef = ref<FormInstance | null>(null)

/** 登录按钮 Loading */
const loading = ref(false)
/** 验证码图片 URL */
const codeUrl = ref("")
/** 登录表单数据 */
const loginFormData: any = reactive({
  username: "admin",
  password: "123456",
  code: "V3Admin"
})
/** 登录表单校验规则 */
const loginFormRules: FormRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
  ],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
}

/** 登录逻辑 */
const handleLogin = () => {
  loginFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      // 开启按钮加载
      loading.value = true
      // 调用接口发送请求
      const res: LoginResponseData = await loginAPI({
        username: loginFormData.username,
        password: loginFormData.password
      })
      // 关闭按钮加载
      loading.value = false
      // 判断登录状态
      if (res.code === 200) {
        // 保存token
        userStore.setUserToken(res.token)
        ElMessage.success("登录成功")

        // 弹出提示语
        ElNotification({
          title: "欢迎回来！",
          type: "success",
          dangerouslyUseHTMLString: true,
          message: "<p>今天是2024年6月2日</p><p>天气晴朗</p>",
          duration: 0,
          position: "bottom-right"
        })
        // 跳转到后台首页
        router.push("/dashboard")
      } else {
        ElMessage.error("用户名或密码错误")
      }
      console.log(res)
    } else {
      console.error("表单校验不通过")
    }
  })
}

// 返回前台
const goBackHome = () => {
  router.push({ path: "/" })
}
</script>

<template>
  <div class="login-container">
    <ThemeSwitch class="theme-switch" />
    <Owl :close-eyes="isFocus" />
    <div class="login-card">
      <div class="title">
        <img src="@/assets/layouts/logo-text-2.png" />
      </div>
      <div class="content">
        <el-form ref="loginFormRef" :model="loginFormData" :rules="loginFormRules" @keyup.enter="handleLogin">
          <el-form-item prop="username">
            <el-input
              v-model.trim="loginFormData.username"
              placeholder="用户名"
              type="text"
              tabindex="1"
              :prefix-icon="User"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="loginFormData.password"
              placeholder="密码"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password
              @blur="handleBlur"
              @focus="handleFocus"
            />
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              v-model.trim="loginFormData.code"
              placeholder="验证码"
              type="text"
              tabindex="3"
              :prefix-icon="Key"
              maxlength="7"
              size="large"
            >
              <template #append>
                <el-image :src="codeUrl" draggable="false">
                  <template #placeholder>
                    <el-icon>
                      <Picture />
                    </el-icon>
                  </template>
                  <template #error>
                    <el-icon>
                      <Loading />
                    </el-icon>
                  </template>
                </el-image>
              </template>
            </el-input>
          </el-form-item>
          <el-button class="login-btn" :loading="loading" type="primary" size="large" @click.prevent="handleLogin"
            >登 录</el-button
          >
          <div class="help">
            <span @click="goBackHome">返回前台</span>
            <span>忘记密码？</span>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }
  .login-card {
    width: 480px;
    max-width: 90%;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: var(--el-bg-color);
    overflow: hidden;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;
      img {
        height: 100%;
      }
    }
    .content {
      padding: 20px 50px 50px 50px;
      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;
        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0px;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }
      .el-button {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}

.login-btn {
  overflow: hidden;
  position: relative;
  text-decoration: none;
  padding: 15px 30px;
  color: #fff;
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.5s;
  text-align: center;
  line-height: 80px;
  font-size: 20px;
}

.login-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -40%;
  width: 20%;
  height: 100%;
  background: linear-gradient(90deg, transparent, #fff, transparent);
  /* 倾斜 */
  transform: skewX(-45deg);
}
.login-btn:hover::before {
  left: 120%;
  transition: all 0.5s;
}
.login-btn:hover {
  background-color: #2776dd;
}

.help {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
  margin-top: 10px;
  padding: 0 20px;
  span {
    cursor: pointer;
    &:hover {
      color: #2776dd;
    }
  }
}
</style>
