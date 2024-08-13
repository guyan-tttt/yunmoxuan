<script lang="ts" setup>
import { ref, computed, onMounted } from "vue"
import { Bell } from "@element-plus/icons-vue"
import NotifyList from "./NotifyList.vue"
import { getSystemJournalListAPI, readJournalAPI, getNotificationAPI, readMessageAPI } from "@/api/admin/dashboard"
import { useLogMessageStore } from "@/store/modules/logmessage"
import { useRouter } from "vue-router"

type TabName = "通知" | "消息"

interface DataItem {
  name: TabName
  type: "primary" | "success" | "warning" | "danger" | "info"
  count: number
}

const router = useRouter()

// 日志信息仓库
const logMessageStore = useLogMessageStore()

/** 角标当前值 */
const badgeValue = computed(() => {
  return data.value[0].count + data.value[1].count
})
/** 角标最大值 */
const badgeMax = 99
/** 面板宽度 */
const popoverWidth = 350
/** 当前 Tab */
const activeName = ref<TabName>("通知")

const handleHistory = (activeName: string) => {
  router.push({
    path: "journal",
    query: {
      type: activeName === "通知" ? 1 : 2
    }
  })
}

// 系统日志
const systemJournal = ref<any>([])

// 获取系统日志
const getSystemJournal = async () => {
  const res = await getSystemJournalListAPI(1, 5, true)
  if (res.code === 200) {
    systemJournal.value = res.data
    data.value[0].count = res.total
  }
}
// 将获取日志函数存入仓库
logMessageStore.getLogData = getSystemJournal

// 处理点击
const handleClick = async (item: any) => {
  if (item.type === 1 && !item.view) {
    item.view = true
    // 提交数据改变阅读状态
    await readJournalAPI(item._id)
    data.value[0].count--
  }
}

// 通知消息
const messageList = ref<any[]>([])

// 获取通知消息
const getMessage = async () => {
  const res = await getNotificationAPI(1, 5, true)
  if (res.code === 200) {
    messageList.value = res.data
    data.value[1].count = res.total
  }
}
logMessageStore.getMessage = getMessage
/** 所有数据 */
const data = ref<DataItem[]>([
  // 通知数据
  {
    name: "通知",
    type: "primary",
    count: systemJournal.value.length
  },
  // 消息数据
  {
    name: "消息",
    type: "danger",
    count: messageList.value.length
  }
])

const handleClick2 = async (item: any) => {
  if (item.type === 2 && !item.view) {
    item.view = true
    // 提交数据改变阅读状态
    await readMessageAPI(item._id)
    data.value[1].count--
  }
}

onMounted(() => {
  getSystemJournal()
  getMessage()
})
</script>

<template>
  <div class="notify">
    <el-popover placement="bottom" :width="popoverWidth" trigger="click">
      <template #reference>
        <el-badge :value="badgeValue" :max="badgeMax" :hidden="badgeValue === 0">
          <el-tooltip effect="dark" content="消息通知" placement="bottom">
            <el-icon :size="20">
              <Bell />
            </el-icon>
          </el-tooltip>
        </el-badge>
      </template>
      <template #default>
        <el-tabs v-model="activeName" class="demo-tabs" stretch>
          <el-tab-pane v-for="(item, index) in data" :name="item.name" :key="index">
            <template #label>
              {{ item.name }}
              <el-badge v-if="item.count > 0" :value="item.count" :max="badgeMax" :type="item.type" />
            </template>
            <el-scrollbar height="400px">
              <NotifyList v-if="activeName === '通知'" :list="systemJournal" type="journal" @handle="handleClick" />

              <NotifyList v-else :list="messageList" @handle="handleClick2" type="message" />
            </el-scrollbar>
          </el-tab-pane>
        </el-tabs>
        <div class="notify-history">
          <el-button link @click="handleHistory(activeName)">查看{{ activeName }}历史</el-button>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>
.notify {
  margin-right: 10px;
}

.notify-history {
  text-align: center;
  padding-top: 12px;
  border-top: 1px solid var(--el-border-color);
}
</style>
