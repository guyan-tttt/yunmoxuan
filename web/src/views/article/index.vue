<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { Plus } from "@element-plus/icons-vue"
import {
  getArticleListAPI,
  deleteArticleAPI,
  changePublishStatusAPI,
  searchArticleAPI,
  deleteArticleRecoveryAPI,
  deleteArticlePermanentlyAPI,
  deleteArticleAll
} from "@/api/admin/article"
import { InfoFilled, DeleteFilled, Edit, Grid, List, Checked, Delete } from "@element-plus/icons-vue"
import { getCategoryAllAPI } from "@/api/admin/category"
import { getAllTagsAPI } from "@/api/admin/tags"
import type { CategoryItem } from "@/types/admin/category"
import type { Tag } from "@/types/admin/tags"
import type { Page } from "@/types/admin/tags"
import type { ArticleItem } from "@/types/admin/article"
import { ElMessageBox, ElMessage } from "element-plus"

// 全局路由对象
const router = useRouter()

// 分页数据
const pageData = ref<Page>({
  page: 1,
  pageSize: 5,
  total: 0
})

// 文章数据
const articleList = ref<ArticleItem[]>([])

// 添加文章
const addArticle = () => {
  router.push("/article-add")
}

// 获取文章列表数据
const getArticleList = async () => {
  const res = await getArticleListAPI(pageData.value.page, pageData.value.pageSize, articleType.value)
  console.log(res)
  articleList.value = res.data
  pageData.value.total = res.total
  if (res.total === 0) {
    ElMessage.info("没有数据了")
  }
}

// 切换页码
const changePage = (page: number) => {
  pageData.value.page = page
  getArticleList()
}

// 切换分页数
const changePageSize = (pageSize: number) => {
  pageData.value.pageSize = pageSize
  getArticleList()
}

// 分类数据
const categoryList = ref<CategoryItem[]>()

// 获取所有分类数据
const getCategoryAll = async () => {
  const res = await getCategoryAllAPI()
  categoryList.value = res.data
}
// 标签数据
const tagList = ref<Tag[]>()

// 获取标签数据
const getTagsAll = async () => {
  const res = await getAllTagsAPI()
  tagList.value = res.data
}

// 搜索信息
const searchInfo = ref({
  categoryID: "",
  tagID: ""
})

// 更新文章
const updateArticle = (id: string) => {
  router.push({
    path: "/article-add",
    query: {
      id
    }
  })
}

// 文章预览
const previewArticle = (id: string) => {
  router.push({
    path: "/article-detail",
    query: {
      id
    }
  })
}

// 删除文章
const deleteArticle = (id: string) => {
  ElMessageBox.confirm("确定要删除该文章吗？", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      const res = await deleteArticleAPI(id)
      if (res.code === 200) {
        ElMessage.success("删除成功")
        getArticleList()
      }
    })
    .catch(() => {})
}

// 切换发布状态
const changePublish = async (id: string, isPublish: boolean) => {
  const res = await changePublishStatusAPI({
    id: id,
    isPublish: isPublish
  })
  if (res.code === 200 && isPublish) {
    ElMessage.success("发布成功")
  } else if (res.code === 200 && !isPublish) {
    ElMessage.info("取消发布")
  }
  getArticleList()
}

// 搜索框校验
const ruleSearch = {
  categoryID: [{ required: true, message: "请选择分类", trigger: "change" }],
  tagID: [{ required: true, message: "请选择标签", trigger: "change" }]
}

// 搜索对象
const searchObj = ref()

// 搜索
const search = () => {
  searchObj.value.validate(async (valid: boolean) => {
    if (valid) {
      const res = await searchArticleAPI(
        pageData.value.page,
        pageData.value.pageSize,
        articleType.value,
        searchInfo.value.tagID,
        searchInfo.value.categoryID
      )
      console.log(res)

      if (res.code === 200) {
        articleList.value = res.data
      }
      if (res.data.length === 0) {
        ElMessage.info("暂无数据")
      }
    }
  })
}

// 清空
const clear = () => {
  searchObj.value.resetFields()
  searchInfo.value = {
    categoryID: "",
    tagID: ""
  }
  getArticleList()
}

// 分段控制
const segmentValue = ref<number>(1)

// 选项
const options = [
  {
    label: "全部文章",
    value: 1,
    icon: "Grid"
  },
  {
    label: "已发布",
    value: 2,
    icon: "Checked"
  },
  {
    label: "草稿",
    value: 3,
    icon: "List"
  },
  {
    label: "回收站",
    value: 4,
    icon: "DeleteFilled"
  }
]

// 文章类型
const articleType = ref<number>(2)

// 选项切换
const onSegmentChange = (value: number) => {
  articleType.value = value
  clear()
}

// 删除文章恢复
const restoreArticle = async (id: string) => {
  const res = await deleteArticleRecoveryAPI(id)
  if (res.code === 200) {
    ElMessage.success("恢复成功")
    getArticleList()
  }
}

// 完全删除
const deleteArticlePermanently = async (id: string) => {
  ElMessageBox.confirm("此操作将永久删除该文章, 是否继续?", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "error"
  })
    .then(async () => {
      const res = await deleteArticlePermanentlyAPI(id)
      if (res.code === 200) {
        ElMessage.success("删除成功")
        getArticleList()
      }
    })
    .catch(() => {})
}

// 表格选择
const handleSelectionChange = (selection: any) => {
  delArlIDList.value = selection.map((item: any) => {
    return item._id
  })
}

// 批量删除文章ID
const delArlIDList = ref<string[]>([])

// 批量删除
const deleteAll = async () => {
  ElMessageBox.confirm("此操作将永久删除该文章, 是否继续?", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "error"
  })
    .then(async () => {
      const res = await deleteArticleAll({
        ids: delArlIDList.value
      })
      if (res.code === 200) {
        ElMessage.success("删除成功")
        getArticleList()
      }
    })
    .catch(() => {})
}

// 初始化
onMounted(() => {
  getArticleList()
  getCategoryAll()
  getTagsAll()
})
</script>
<template>
  <div class="tag">
    <el-card>
      <el-segmented @change="onSegmentChange" v-model="segmentValue" :options="options" block>
        <template #default="{ item }">
          <el-row justify="center">
            <el-icon size="20" style="margin-right: 10px">
              <component :is="item.icon" />
            </el-icon>
            <div>{{ item.label }}</div>
          </el-row>
        </template>
      </el-segmented>
    </el-card>
    <el-card class="container">
      <el-row justify="space-between">
        <div class="role-operate" style="margin-bottom: 10px">
          <el-button v-if="articleType !== 4" size="default" type="primary" @click="addArticle" :icon="Plus"
            >添加文章</el-button
          >
          <el-button
            v-else
            size="default"
            type="danger"
            @click="deleteAll"
            :icon="Delete"
            :disabled="delArlIDList.length === 0"
            >批量删除</el-button
          >
        </div>
        <el-form ref="searchObj" :model="searchInfo" :rules="ruleSearch" class="demo-form-inline" inline>
          <el-form-item label="标签名称" prop="tagID">
            <el-select v-model="searchInfo.tagID" placeholder="请选择标签" clearable>
              <el-option v-for="item in tagList" :key="item._id" :label="item.name" :value="item._id as string">
                <el-row align="middle">
                  <el-image style="width: 20px; height: 20px; margin-right: 5px" :src="item.icon" fit="fill" />
                  <span>{{ item.name }}</span>
                </el-row>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类名称" prop="categoryID">
            <el-select v-model="searchInfo.categoryID" placeholder="请选择分类" clearable>
              <el-option v-for="item in categoryList" :key="item._id" :label="item.name" :value="item._id as string" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="default" @click="search">搜索</el-button>
            <el-button size="default" @click="clear">清空</el-button>
          </el-form-item>
        </el-form>
      </el-row>

      <el-table :data="articleList" border @selection-change="handleSelectionChange">
        <el-table-column v-if="articleType !== 4" align="center" width="100" label="序号" type="index" />
        <el-table-column v-else align="center" type="selection" width="100" />
        <el-table-column prop="title" align="center" width="200" label="文章标题" />
        <el-table-column align="center" width="200" label="文章标签">
          <template v-slot="{ row }">
            <span v-for="item in row.tags" :key="item._id">
              <el-image style="width: 30px; height: 30px; margin-right: 5px" :src="item.icon" fit="fill" />
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="cover" align="center" width="200" label="文章封面">
          <template v-slot="{ row }">
            <el-image :src="row.cover" style="width: 100px; border-radius: 5px" />
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="desc" align="center" label="文章描述">
          <template v-slot="{ row }">
            <div class="desc">{{ row.desc }}</div>
          </template>
        </el-table-column>
        <el-table-column width="100" prop="desc" align="center" label="状态">
          <template v-slot="{ row }">
            <el-switch
              v-if="articleType !== 4"
              v-model="row.isPublish"
              @change="changePublish(row._id, row.isPublish)"
              active-text="发布"
              inactive-text="草稿"
              inline-prompt
            />
            <el-switch
              v-else
              v-model="row.isDelete"
              @change="restoreArticle(row._id)"
              active-text="已删除"
              inactive-text="未删除"
              inline-prompt
            />
          </template>
        </el-table-column>

        <el-table-column prop="desc" align="center" label="操作">
          <template v-slot="{ row }">
            <el-button
              v-if="articleType !== 4"
              type="success"
              :name="row"
              @click="previewArticle(row._id)"
              :icon="InfoFilled"
              circle
            />
            <el-button v-if="articleType !== 4" type="primary" @click="updateArticle(row._id)" :icon="Edit" circle />
            <el-button
              v-if="articleType !== 4"
              type="danger"
              @click="deleteArticle(row._id)"
              :icon="DeleteFilled"
              circle
            />
            <el-button
              v-if="articleType === 4"
              type="danger"
              @click="deleteArticlePermanently(row._id)"
              :icon="DeleteFilled"
              >删除</el-button
            >
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
        @size-change="changePageSize"
        @current-change="changePage"
      />
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
.container {
  margin-top: 20px;
}
</style>
