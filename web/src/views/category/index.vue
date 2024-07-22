<script setup lang="ts">
import { ref, onMounted } from "vue"
import { Edit, DeleteFilled } from "@element-plus/icons-vue"
import type { Page } from "@/types/admin/tags"
import { ElMessage, type FormInstance } from "element-plus"
import { addCategoryAPI, getCategoryListAPI, updateCategoryAPI, deleteCategoryAPI } from "@/api/admin/category"
import { CategoryItem } from "@/types/admin/category"

// 分类数据
const categoryList = ref<CategoryItem[]>()

// 表单数据
const categoryForm = ref<CategoryItem>({
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
  pageSize: 5,
  total: 0
})

// 添加分类弹框
const categoryDialog = ref<boolean>(false)

// 添加分类
const addCategory = () => {
  title.value = "添加分类"
  categoryDialog.value = true
}

// 提交
const submit = () => {
  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      // 判断是否为添加
      if (title.value === "添加分类") {
        // 发送请求
        const res = await addCategoryAPI(categoryForm.value)
        if (res.code === 200) {
          ElMessage.success("添加成功")
        }
      } else {
        const res = await updateCategoryAPI(categoryForm.value)
        if (res.code === 200) {
          ElMessage.success("更新成功")
        }
      }
      cancel()
      getCategoryList()
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

// 获取分类列表
const getCategoryList = async () => {
  const res = await getCategoryListAPI(pageData.value.page, pageData.value.pageSize)
  if (res.code === 200) {
    // console.log(res)
    categoryList.value = res.data
    pageData.value.total = res.total
  }
}

// 切换页码
const changePage = (page: number) => {
  pageData.value.page = page
  getCategoryList()
}

// 切换每页数量
const changeSize = (page: number) => {
  pageData.value.pageSize = page
  getCategoryList()
}

// 弹框标题
const title = ref<string>("添加分类")

// 更新分类数据
const updateCategory = (row: CategoryItem) => {
  title.value = "更新分类"
  categoryDialog.value = true
  categoryForm.value = Object.assign({}, row)
}

// 删除分类
const deleteCategory = async (id: string) => {
  const res = await deleteCategoryAPI(id)
  if (res.code === 200) {
    ElMessage.success("删除成功")
    getCategoryList()
  }
}

// 初始化
onMounted(() => {
  getCategoryList()
})
</script>
<template>
  <div class="category">
    <el-card >
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
            <el-button @click="updateCategory(row)" type="primary" :name="row" :icon="Edit" circle />
            <el-popconfirm title="你确定要删除该条分类码?" content="删除不可恢复" @confirm="deleteCategory(row._id)">
              <template #reference>
                <el-button type="danger" :icon="DeleteFilled" circle />
              </template>
            </el-popconfirm>
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
        @size-change="changeSize"
        @current-change="changePage"
      />
    </el-card>
    <el-dialog v-model="categoryDialog" :title="title" width="30%" center>
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
