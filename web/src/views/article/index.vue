<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { Plus } from "@element-plus/icons-vue"

// 全局路由对象
const router = useRouter()

// 分页数据
const pageData = ref({
  page: 1,
  pageSize: 10,
  total: 0
})

// 添加文章
const addArticle = () => {
  router.push("/article-add")
}
</script>
<template>
  <div class="tag">
    <el-card class="container">
      <el-row justify="space-between">
        <div class="role-operate" style="margin-bottom: 20px">
          <el-button size="default" type="primary" @click="addArticle" :icon="Plus" circle />
        </div>
        <el-form class="demo-form-inline" inline>
          <el-form-item label="标签名称">
            <el-select placeholder="请选择标签" clearable>
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="分类名称">
            <el-select placeholder="请选择分类" clearable>
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="default">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-row>

      <!-- <el-table  border>
        <el-table-column align="center" width="200" label="序号" type="index" />
        <el-table-column prop="name" align="center" width="200" label="标签名" />
        <el-table-column prop="icon" align="center" width="200" label="标签图标">
          <template v-slot="{ row }">
            <el-image :src="row.icon" style="width: 40px; height: 40px" />
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="desc" align="center" label="标签描述">
          <template v-slot="{ row }">
            <div class="desc"  />
          </template>
        </el-table-column>

        <el-table-column prop="desc" align="center" label="操作">
          <template v-slot="{ row }">
            <el-button  type="success" :icon="InfoFilled" circle />
            <el-button  type="primary" :icon="Edit" circle />
            <el-button  type="danger" :icon="DeleteFilled" circle />
          </template>
        </el-table-column>
      </el-table> -->
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
