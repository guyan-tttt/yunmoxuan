<template>
  <div>
    <el-card>
      <el-table :data="bulletList" style="width: 100%" border>
        <el-table-column type="index" width="80" label="序号" align="center" />
        <el-table-column prop="nickname" label="昵称" width="180" align="center" />
        <el-table-column label="头像" width="100" align="center">
          <template v-slot="{ row }">
            <el-avatar v-if="row.avatar" :src="row.avatar" :size="50" />
            <span v-else class="avatar">{{ row.nickname.substring(0, 1) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="留言内容" align="center" />
        <el-table-column prop="address" label="留言时间" width="180" align="center">
          <template v-slot="{ row }">
            <el-tag>{{ dayjs(row.createTime).format("YYYY/MM/DD HH:mm") }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="电子邮箱" align="center" />
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <el-button @click="deleteGuest(row)" circle :icon="Delete" size="large" type="danger" />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px"
        v-model:current-page="pageData.page"
        v-model:page-size="pageData.pageSize"
        :page-sizes="[5, 10, 15, 20]"
        background
        layout=" prev, pager, next, jumper,-> ,total, sizes"
        :total="pageData.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { getGuestBookListAPI, deleteGuestBookAPI } from "@/api/admin/guestbook"
import dayjs from "dayjs"
import { Delete } from "@element-plus/icons-vue"
import type { GuestbookItem } from "@/types/web/guestbook.d.ts"
import { ElMessage, ElMessageBox } from "element-plus"

// 留言列表数据
const bulletList = ref<GuestbookItem[]>([])

// 分页数据
const pageData = ref({
  page: 1,
  pageSize: 10,
  total: 0
})

// 获取留言列表
const getGuestBookList = async () => {
  const res = await getGuestBookListAPI(pageData.value.page, pageData.value.pageSize)
  if (res.code === 200) {
    bulletList.value = res.data
    pageData.value.total = res.total
  }
}

// 改变每页条数
const handleSizeChange = () => {
  getGuestBookList()
}

// 改变当前页数
const handleCurrentChange = () => {
  getGuestBookList()
}

// 删除留言
const deleteGuest = (item: GuestbookItem) => {
  ElMessageBox.confirm("确定要删除该留言吗？", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      const res = await deleteGuestBookAPI(item._id as string)
      if (res.code === 200) {
        ElMessage.success("删除成功")
        getGuestBookList()
      }
    })
    .catch(() => {})
}
onMounted(() => {
  getGuestBookList()
})
</script>

<style lang="scss" scoped>
.avatar {
  height: 50px;
  margin: 0 auto;
  width: 50px;
  border-radius: 50%;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  font-size: 20px;
  background-color: #e0c3f3;
  color: #fff;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
}
</style>
