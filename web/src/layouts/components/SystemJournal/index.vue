<template>
  <div>
    <el-tooltip effect="dark" content="添加日志" placement="bottom">
      <el-icon @click="openDialog" :size="20"><CirclePlus /></el-icon>
    </el-tooltip>

    <el-dialog v-model="dialogShow" title="添加日志">
      <el-form ref="formRef" :model="form" style="width: 80%; margin: 0 auto" :rules="rules">
        <el-form-item prop="title">
          <el-input v-model="form.title" placeholder="请输入日志标题" />
        </el-form-item>
        <el-form-item prop="content">
          <el-input v-model="form.content" :autosize="{ minRows: 14, maxRows: 16 }" type="textarea" placeholder="请输入日志内容" />
        </el-form-item>
        <el-form-item>
          <el-button @click="submit" style="width: 40%; height: 35px; margin: 0 auto" type="primary">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { addSystemJournalAPI } from "@/api/admin/dashboard"
import { ElMessage } from "element-plus"
// 弹框显示
const dialogShow = ref<boolean>(false)

// 打开弹框
const openDialog = () => {
  dialogShow.value = true
}

// 日志表单
const form = ref<any>({
  title: "",
  content: ""
})

// 表单校验
const rules = {
  title: [
    {
      required: true,
      message: "请输入日志标题",
      trigger: "blur"
    }
  ],
  content: [
    {
      required: true,
      message: "请输入日志内容",
      trigger: "blur"
    }
  ]
}

// 提交
const submit = () => {
  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      const res = await addSystemJournalAPI(form.value)
      if (res.code === 200) {
        ElMessage.success("添加成功")
        cancel()
      }
    }
  })
}
// 取消
const cancel = () => {
  dialogShow.value = false
  form.value = {
    title: "",
    content: ""
  }
  formRef.value?.resetFields()
}
// 表单对象
const formRef = ref<any>(null)
</script>

<style scoped></style>
