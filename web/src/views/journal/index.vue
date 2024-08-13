<template>
  <div>
    <el-card class="journal">
      <el-empty v-if="systemJournal.length === 0" description="description" />
      <el-timeline v-else type="success" style="width: 1000px" v-infinite-scroll="load" :infinite-scroll-disabled="!throttle">
        <el-timeline-item
          v-for="item in systemJournal"
          :key="item._id"
          type="success"
          :timestamp="dayjs(item.createTime).format('YYYY/MM/DD HH:mm')"
          placement="top"
        >
          <el-card class="item">
            <h4>💫{{ item.title }}</h4>
            <p>📃{{ item.content }}</p>
            <el-icon @click="deleteJournal(item._id)" color="#E73037" :size="30"><DeleteFilled /></el-icon>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { getSystemJournalListAPI, deleteJournalAPI, getNotificationAPI } from "@/api/admin/dashboard"
import { ref, onMounted } from "vue"
import dayjs from "dayjs"
import { ElMessageBox, ElMessage } from "element-plus"
import { useRoute } from "vue-router"
import type { LogResponse } from "@/types/admin/dashboard"

// 系统日志
const systemJournal = ref<any>([])

// 页面路由
const route = useRoute()

// 获取系统日志
const getSystemJournal = async () => {
  let res: LogResponse
  if (route.query.type === "1") {
    res = await getSystemJournalListAPI(pageData.value.page, pageData.value.pageSize)
    if (res.code === 200) {
      systemJournal.value = systemJournal.value.concat(res.data)
      pageData.value.total = res.total
    }
  } else {
    res = await getNotificationAPI(pageData.value.page, pageData.value.pageSize)
    if (res.code === 200) {
      systemJournal.value = systemJournal.value.concat(res.data)
      pageData.value.total = res.total
    }
  }
}

// 分页数据
const pageData = ref({
  page: 1,
  pageSize: 5,
  total: 0
})

// 节流阀
const throttle = ref(true)

// 触底加载
const load = () => {
  if (throttle.value) {
    throttle.value = false
    pageData.value.page++
    getSystemJournal()
    setTimeout(() => {
      if (pageData.value.total <= systemJournal.value.length) {
        ElMessage.success("没有更多了")
        return
      }
      throttle.value = true
    }, 2000)
  }
}

// 删除日志记录
const deleteJournal = (id: string) => {
  ElMessageBox.confirm("确定删除该日志记录吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消"
  })
    .then(async () => {
      const res = await deleteJournalAPI(id)
      if (res.code === 200) {
        ElMessage.success("删除成功")
        pageData.value.page = 1
        systemJournal.value = []
        getSystemJournal()
      }
    })
    .catch(() => {})
}
onMounted(() => {
  getSystemJournal()
})
</script>

<style scoped lang="scss">
.journal {
  width: 100%;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 64px);
  align-items: center;
}
.item {
  position: relative;
  .el-icon {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
}
</style>
