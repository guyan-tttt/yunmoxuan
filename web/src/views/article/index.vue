<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { Plus } from "@element-plus/icons-vue"
import { getArticleListAPI } from "@/api/admin/article"
import { InfoFilled, DeleteFilled, Edit } from "@element-plus/icons-vue"
import { getCategoryAllAPI } from "@/api/admin/category"
import { getAllTagsAPI } from "@/api/admin/tags"
import type { CategoryItem } from "@/types/admin/category"
import type { Tag } from "@/types/admin/tags"
import type { Page } from "@/types/admin/tags"
import type { ArticleItem } from "@/types/admin/article"

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
  const res = await getArticleListAPI(pageData.value.page, pageData.value.pageSize)
  console.log(res)
  articleList.value = res.data
  pageData.value.total = res.total
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
// 初始化
onMounted(() => {
  getArticleList()
  getCategoryAll()
  getTagsAll()
})
</script>
<template>
  <div class="tag">
    <el-card class="container">
      <el-row justify="space-between">
        <div class="role-operate" style="margin-bottom: 20px">
          <el-button size="default" type="primary" @click="addArticle" :icon="Plus">添加文章</el-button>
        </div>
        <el-form class="demo-form-inline" inline>
          <el-form-item label="标签名称">
            <el-select v-model="searchInfo.tagID" placeholder="请选择标签" clearable>
              <el-option v-for="item in tagList" :key="item._id" :label="item.name" :value="item._id as string">
                <el-row align="middle">
                  <el-image style="width: 20px; height: 20px; margin-right: 5px" :src="item.icon" fit="fill" />
                  <span>{{ item.name }}</span>
                </el-row>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类名称">
            <el-select v-model="searchInfo.categoryID" placeholder="请选择分类" clearable>
              <el-option v-for="item in categoryList" :key="item._id" :label="item.name" :value="item._id as string" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="default">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-row>

      <el-table :data="articleList" border>
        <el-table-column align="center" width="100" label="序号" type="index" />
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
            <el-switch v-model="row.isPublish" active-text="发布" inactive-text="草稿" inline-prompt />
          </template>
        </el-table-column>

        <el-table-column prop="desc" align="center" label="操作">
          <template v-slot="{ row }">
            <el-button type="success" :name="row" @click="previewArticle(row._id)" :icon="InfoFilled" circle />
            <el-button type="primary" @click="updateArticle(row._id)" :icon="Edit" circle />
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
</style>
