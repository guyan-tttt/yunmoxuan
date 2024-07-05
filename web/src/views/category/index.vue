<script setup lang="ts">
import { ref } from "vue"
import type { AddCategory } from "@/types/admin/category"
import { Edit, DeleteFilled } from "@element-plus/icons-vue"
import type { Page } from "@/types/admin/tags"
import { type FormInstance } from "element-plus"

// 分类数据
const categoryList = [
  {
    id: 1,
    name: "前端",
    desc: "前端相关"
  },
  {
    id: 1,
    name: "前端",
    desc: "前端相关"
  },
  {
    id: 1,
    name: "前端",
    desc: "前端相关"
  },
  {
    id: 1,
    name: "前端",
    desc: "前端相关"
  },
  {
    id: 1,
    name: "前端",
    desc: "前端相关"
  }
]

// 表单数据
const categoryForm = ref<AddCategory>({
  name: "",
  desc: ""
})

// 校验规则
const rules = {
  name: [
    {
      required: true,
      message: "请输入标签名",
      trigger: "blur"
    }
  ],
  desc: [
    {
      required: true,
      message: "请输入标签描述",
      trigger: "blur"
    }
  ]
}

// 表单对象
const formRef = ref<FormInstance>()

// 分页数据
const pageData = ref<Page>({
  page: 1,
  pageSize: 10,
  total: 0
})

// 添加分类弹框
const categoryDialog = ref<boolean>(false)

// 添加分类
const addCategory = () => {
  categoryDialog.value = true
}

// 提交
const submit = () => {
  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      console.log("提交成功")
    }
  })
}
// 取消
const cancel = () => {
  categoryDialog.value = false
  formRef.value?.resetFields()
  categoryForm.value = {
    name: "",
    desc: ""
  }
}
</script>
<template>
  <div class="category">
    <el-card class="container">
      <div class="role-operate" style="margin-bottom: 20px">
        <el-button size="default" type="primary" @click="addCategory">添加分类</el-button>
      </div>
      <el-table :data="categoryList" border>
        <el-table-column align="center" width="200" label="序号" type="index" />
        <el-table-column prop="name" align="center" width="200" label="分类名称" />
        <el-table-column show-overflow-tooltip prop="desc" align="center" label="分类描述">
          <template v-slot="{ row }">
            <div class="desc" v-html="row.desc" />
          </template>
        </el-table-column>

        <el-table-column prop="desc" align="center" label="操作">
          <template v-slot="{ row }">
            <el-button type="primary" :name="row" :icon="Edit" circle />
            <el-button type="danger" :icon="DeleteFilled" circle />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px"
        v-model:current-page="pageData.page"
        v-model:page-size="pageData.pageSize"
        :page-sizes="[3, 5, 10, 20]"
        size="small"
        :disabled="false"
        :background="false"
        layout="prev, pager, next, jumper ,-> ,total, sizes"
        :total="pageData.total"
        @size-change="() => {}"
        @current-change="() => {}"
      />
    </el-card>
    <el-dialog v-model="categoryDialog" title="添加分类" width="30%" center>
      <el-form ref="formRef" :model="categoryForm" :rules="rules">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="categoryForm.name" placeholder="请输入分类名称" type="text" size="small" />
        </el-form-item>
        <el-form-item label="分类描述" prop="desc">
          <el-input v-model="categoryForm.desc" placeholder="请输入分类描述" type="textarea" size="small" />
        </el-form-item>
        <el-form-item>
          <el-row justify="center" style="width: 100%">
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button type="default" @click="cancel">取消</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style scoped></style>
