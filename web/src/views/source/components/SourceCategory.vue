<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue"
import { ref, onMounted } from "vue"
import { type FormInstance, ElMessage } from "element-plus"
import { addSourceGroupAPI, getSourceGroupAPI } from "@/api/admin/source"

// 弹框显示
const drawer = ref<boolean>(false)

// 添加分组
const addGroup = () => {
  drawer.value = true
}

// 分组表单
const sourceGroupForm = ref({
  name: "",
  desc: "",
  logo: ""
})

// 表单校验
const rules = {
  name: [
    {
      required: true,
      message: "请输入分组名称",
      trigger: "blur"
    },
    {
      min: 3,
      max: 10,
      message: "长度在 3 到 10 个字符",
      trigger: "blur"
    }
  ],
  desc: [
    {
      required: true,
      message: "请输入分组描述",
      trigger: "blur"
    }
  ],
  logo: [
    {
      required: true,
      message: "请输入分组logo",
      trigger: "blur"
    }
  ]
}

// 表单对象
const groupFormRef = ref<FormInstance>()

// 取消提交
const cancelSubmit = () => {
  drawer.value = false
  sourceGroupForm.value = {
    name: "",
    desc: "",
    logo: ""
  }
  groupFormRef.value?.resetFields()
}

// 确认提交
const confirmSubmit = () => {
  // 表单校验
  groupFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      const res = await addSourceGroupAPI(sourceGroupForm.value)
      if (res.code === 200) {
        ElMessage.success("添加分组成功")
        cancelSubmit()
      }
    }
  })
}

// 分组列表
const groupList = ref<any[]>([])

// 获取分组列表
const getGroupList = async () => {
  const res = await getSourceGroupAPI()
  if (res.code === 200) {
    groupList.value = res.data
  }
}

onMounted(() => {
  getGroupList()
})
</script>
<template>
  <div>
    <el-row>
      <el-button type="primary" :icon="Plus" @click="addGroup">添加分组</el-button>
      <el-button type="success" :icon="Plus" @click="addGroup">添加资源</el-button>
      <slot :data="groupList" />
    </el-row>
    <el-drawer v-model="drawer" title="I am the title" direction="btt" :with-header="false">
      <el-form ref="groupFormRef" style="margin: 20px auto; width: 40%" :model="sourceGroupForm" :rules="rules">
        <el-form-item label="分组名称" prop="name">
          <el-input v-model="sourceGroupForm.name" autocomplete="off" placeholder="请输入分组名称" />
        </el-form-item>
        <el-form-item label="分组描述" prop="desc">
          <el-input v-model="sourceGroupForm.desc" autocomplete="off" placeholder="请输入分组描述" />
        </el-form-item>
        <el-form-item label="分组logo" prop="logo">
          <el-input v-model="sourceGroupForm.logo" autocomplete="off" placeholder="请输入分组logo链接地址" />
        </el-form-item>
        <el-form-item>
          <el-row justify="center" style="width: 100%">
            <el-button type="primary" @click="confirmSubmit">确 定</el-button>
            <el-button @click="cancelSubmit">取 消</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<style scoped></style>
