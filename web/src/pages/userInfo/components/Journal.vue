<template>
  <div class="animate__fadeInUp animate__animated">
    <el-card class="journal">
      <el-timeline type="success" style="width: 1000px">
        <el-timeline-item
          v-for="item in journalList"
          :key="item._id"
          type="success"
          :timestamp="dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')"
          placement="top"
        >
          <el-card class="item">
            <h4>💫{{ item.title }}</h4>
            <p>📃{{ item.content }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <el-row justify="center" style="width: 100%">
        <div class="more" @click="loadMore" v-if="journalList.length < pageData.total">
          <span>加载更多</span>
        </div>
        <div class="nomore" v-else>到底了~💫</div>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { getJournalAPI } from "@/api/web/index"
import type { LogData } from "@/types/admin/dashboard"
import dayjs from "dayjs"

// 日志列表
const journalList = ref<LogData[]>([])

// 获取日志列表
const getJournalList = async () => {
  const res = await getJournalAPI(pageData.value.page, pageData.value.pageSize)
  if (res.code === 200) {
    journalList.value = journalList.value.concat(res.data)
    pageData.value.total = res.total
  }
}

// 分页数据
const pageData = ref({
  page: 1,
  pageSize: 5,
  total: 0
})
// 加载更多
const loadMore = () => {
  pageData.value.page++
  getJournalList()
}

onMounted(() => {
  getJournalList()
})
</script>

<style scoped lang="scss">
.more {
  display: inline-block;
  text-align: center;
  margin: 0 auto;
  cursor: pointer;
  background: #fff;
  border-radius: 100px;
  padding: 10px 35px;
  font-size: 15px;
  font-weight: 700;
  box-shadow:
    0 10px 13px rgba(31, 45, 61, 0.1),
    0 0 0 -1px rgba(32, 160, 255, 0.2),
    0 0 0 -25px rgba(32, 160, 255, 0.3);
  transition:
    all 0.25s,
    box-shadow 0s;
  letter-spacing: 1px;
  &:hover {
    color: #20a0ff;
    box-shadow:
      0 10px 13px rgba(32, 160, 255, 0.3),
      0 0 0 25px rgba(32, 160, 255, 0),
      0 0 0 25px rgba(32, 160, 255, 0);
    transition:
      all 1s,
      box-shadow 1s ease-out 0.1s;
  }
}
</style>
