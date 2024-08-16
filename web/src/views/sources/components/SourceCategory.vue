<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue"
import { ref, onMounted } from "vue"
import { type FormInstance, ElMessage, ElMessageBox, type Action } from "element-plus"
import {
  addSourceGroupAPI,
  getSourceGroupAPI,
  addSourceAPI,
  updateSourceAPI,
  deleteSourceAPI,
  updateSourceGroupAPI,
  deleteSourceGroupAPI
} from "@/api/admin/source"
import SourceCard from "./SourceCard.vue"
import type { GroupItem, SourceItem } from "@/types/admin/source"

// 弹框显示
const drawer = ref<boolean>(false)

// 添加分组
const addGroup = () => {
  drawer.value = true
  groupFormTitle.value = "添加分组"
}

// 分组表单
const sourceGroupForm = ref<GroupItem>({
  name: "",
  desc: "",
  logo: ""
})

// 分组表单标题
const groupFormTitle = ref("添加分组")

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
      if (groupFormTitle.value === "添加分组") {
        const res = await addSourceGroupAPI(sourceGroupForm.value)
        if (res.code === 200) {
          ElMessage.success("添加分组成功")
          cancelSubmit()
          getGroupList()
        }
      } else {
        const res = await updateSourceGroupAPI({
          _id: sourceGroupForm.value._id,
          name: sourceGroupForm.value.name,
          desc: sourceGroupForm.value.desc,
          logo: sourceGroupForm.value.logo
        })
        if (res.code === 200) {
          ElMessage.success("修改分组成功")
          cancelSubmit()
          getGroupList()
        }
      }
    }
  })
}

// 分组列表
const groupList = ref<GroupItem[]>([])

// 获取分组列表
const getGroupList = async () => {
  const res = await getSourceGroupAPI()
  if (res.code === 200) {
    groupList.value = res.data
  }
}

// 弹框显示
const dialogShow = ref<boolean>()

// 弹框标题
const dialogTitle = ref<string>("添加资源")

// 添加资源
const addResource = () => {
  dialogShow.value = true
  dialogTitle.value = "添加资源"
}

// 资源表单
const sourceForm = ref<SourceItem>({
  name: "",
  desc: "",
  logo: "",
  bg: "",
  groupId: "",
  groupName: "",
  link: ""
})

// 表单校验
const sourceRules = {
  name: [
    { required: true, message: "请输入资源名称", trigger: "blur" },
    { min: 1, max: 30, message: "长度在 3 到 30 个字符", trigger: "blur" }
  ],
  desc: [
    { required: true, message: "请输入资源描述", trigger: "blur" },
    { min: 3, max: 100, message: "长度在 3 到 100 个字符", trigger: "blur" }
  ],
  logo: [{ required: true, message: "请输入资源logo", trigger: "blur" }],
  bg: [{ required: true, message: "请输入资源背景图", trigger: "blur" }],
  groupId: [{ required: true, message: "请选择资源分组", trigger: "blur" }],
  link: [{ required: true, message: "请输入资源链接", trigger: "blur" }]
}
// 表单对象
const sourceFormRef = ref<FormInstance>()

// 选择器选中项变化
const selectChange = (item: GroupItem) => {
  sourceForm.value.groupId = item._id as string
  sourceForm.value.groupName = item.name
}

// 提交
const sourceSubmit = async () => {
  sourceFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      if (dialogTitle.value === "添加资源") {
        const res = await addSourceAPI(sourceForm.value)
        if (res.code === 200) {
          ElMessage.success("添加资源成功")
          sourceCancel()
          getGroupList()
        }
      } else {
        const res = await updateSourceAPI(sourceForm.value)
        if (res.code === 200) {
          ElMessage.success("更新资源成功")
          sourceCancel()
          getGroupList()
        }
      }
    }
  })
}

// 取消
const sourceCancel = () => {
  dialogShow.value = false
  sourceForm.value = {
    name: "",
    desc: "",
    logo: "",
    bg: "",
    groupId: "",
    groupName: "",
    link: ""
  }
  sourceFormRef.value?.resetFields()
}

// 更新资源
const updateSource = (item: SourceItem) => {
  dialogShow.value = true
  dialogTitle.value = "更新资源"
  sourceForm.value = item
}

// 删除资源
const deleteSource = async (id: string) => {
  const res = await deleteSourceAPI(id)
  if (res.code === 200) {
    ElMessage.success("删除资源成功")
    getGroupList()
  }
}

// 删除更新分组
const deleteOUpdateGroup = (e: MouseEvent, item: GroupItem) => {
  e.stopPropagation()
  e.preventDefault()
  ElMessageBox.confirm("请选择以下操作", "提示", {
    confirmButtonText: "删除",
    cancelButtonText: "更新",
    type: "warning",
    center: true,
    distinguishCancelAndClose: true
  })
    .then(() => {
      // 删除逻辑
      deleteGroup(item._id as string)
    })
    .catch((action: Action) => {
      if (action === "cancel") {
        // 更新逻辑
        updateGroup(Object.assign({}, item))
      }
    })
}

// 更新分组
const updateGroup = (item: GroupItem) => {
  groupFormTitle.value = "更新分组"
  sourceGroupForm.value = item
  drawer.value = true
}

// 删除分组
const deleteGroup = async (id: string) => {
  const res = await deleteSourceGroupAPI(id)
  if (res.code === 201) {
    ElMessage.warning(res.message)
  } else if (res.code === 200) {
    ElMessage.success("删除分组成功")
    getGroupList()
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
      <el-button type="success" :icon="Plus" @click="addResource">添加资源</el-button>
      <el-tabs type="border-card" class="demo-tabs" style="width: 100%; margin-top: 20px">
        <el-tab-pane class="xcacxacx" v-for="item in groupList" :key="item._id" :label="item.name">
          <div class="setting" @click="deleteOUpdateGroup($event, item)">
            <el-icon :size="30" color="#fff"><Setting /></el-icon>
          </div>
          <ul class="list">
            <li class="item" v-for="i in item.source" :key="i._id">
              <SourceCard type="admin" :data="i" @update="updateSource" @delete="deleteSource" />
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>
    </el-row>
    <el-drawer v-model="drawer" title="I am the title" direction="btt" :with-header="false">
      <el-row style="width: 100%; margin-top: 20px" justify="center">{{ groupFormTitle }}</el-row>
      <el-form ref="groupFormRef" style="margin: 20px auto; width: 40%" :model="sourceGroupForm" :rules="rules">
        <el-form-item label="分组名称" prop="name">
          <el-input v-model="sourceGroupForm.name" autocomplete="off" placeholder="请输入分组描述" />
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
    <el-dialog @closed="sourceCancel" width="600" :title="dialogTitle" v-model="dialogShow" style="border-radius: 10px">
      <el-form ref="sourceFormRef" style="width: 80%; margin: 0 auto" :rules="sourceRules" :model="sourceForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="sourceForm.name" autocomplete="off" placeholder="请输入资源名称" />
        </el-form-item>
        <el-form-item label="分组" prop="groupId">
          <el-select :modelValue="sourceForm.groupName" placeholder="请选择资源分组" style="width: 100%" @change="selectChange">
            <el-option v-for="item in groupList" :key="item._id" :label="item.name" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input v-model="sourceForm.desc" type="textarea" placeholder="请输入资源名称" />
        </el-form-item>
        <el-form-item label="logo" prop="logo">
          <el-input v-model="sourceForm.logo" placeholder="请输入资源logo链接地址" />
        </el-form-item>
        <el-form-item label="背景" prop="bg">
          <el-input v-model="sourceForm.bg" placeholder="请输入资源背景图链接地址" />
        </el-form-item>
        <el-form-item label="网址" prop="link">
          <el-input v-model="sourceForm.link" placeholder="请输入资源网址" />
        </el-form-item>
        <el-form-item>
          <el-row justify="center" style="width: 100%">
            <el-button type="success" @click="sourceSubmit">提交</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
::v-deep(.el-tabs__item.is-top.is-active) {
  border-radius: 15px;
  background-color: #409eff;
  color: #fff;
  &:hover {
    color: #f8ec48;
  }
}
::v-deep(.el-tabs__nav-scroll) {
  background-color: #fff;
}
::v-deep(.el-tabs--border-card) {
  border: 0;
}
.list {
  list-style: none;
  width: 100%;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  li {
    width: 300px;
  }
}
.setting {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #409eff;
  border-radius: 50%;
  animation: rotate 2s linear infinite;
  cursor: pointer;
  &:hover {
    background-color: #f8ec48;
  }
}
</style>

<style lang="scss">
.source {
  .el-drawer__header {
    margin-bottom: 0;
  }
  .el-drawer__body {
    padding: 0;
  }
  @keyframes rotate {
    to {
      transform: rotate(0);
    }
    from {
      transform: rotate(360deg);
    }
  }
}
</style>
