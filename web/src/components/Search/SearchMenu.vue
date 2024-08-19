<template>
  <Teleport to="body">
    <el-dialog v-model="dialogShow" :show-close="false" width="40%" class="search" @closed="$emit('update:modelValue', false)" title="📜搜索文章">
      <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearch"
        popper-class="my-autocomplete"
        placeholder="请输入搜索关键字🌟"
        size="large"
        :highlight-first-item="true"
        :fit-input-width="true"
        v-infinite-scroll="load"
        @select="goToDetail"
      >
        <template #suffix>
          <el-icon class="el-input__icon" @click="handleIconClick">
            <CircleClose />
          </el-icon>
        </template>
        <template #default="{ item }">
          <div class="item">
            <el-image :src="item.cover" />
            <div class="content">
              <div class="title">{{ item.title }}</div>
              <div class="desc">{{ item.desc }}</div>
            </div>
          </div>
        </template>
      </el-autocomplete>
    </el-dialog>
  </Teleport>
</template>

<script setup lang="ts">
import { defineProps, ref, computed } from "vue"
import { searchArticleAPI } from "@/api/web/article"
import { useRouter } from "vue-router"

// 全局路由
const router = useRouter()

const emit = defineEmits(["update:modelValue"])

const props = defineProps<{
  modelValue: boolean
}>()

// 弹窗显示状态
const dialogShow = computed(() => {
  return props.modelValue
})

// 输入框数据
const state = ref<string>("")

const querySearch: any = async (queryString: string, cb: any) => {
  const results = await loadAll(queryString)
  cb(results)
}

const loadAll = async (keyword: string) => {
  const res = await searchArticleAPI(keyword)
  console.log(res)

  if (res.code === 200) {
    return res.data
  }
}

const handleIconClick = () => {
  state.value = ""
}

const load = () => {
  console.log("load")
}
// 跳转详情页面
const goToDetail = (item: any) => {
  // 触发搜索框关闭
  emit("update:modelValue", false)
  router.push({
    path: "/home-detail",
    query: {
      id: item._id
    }
  })
}
</script>

<style lang="scss" scoped>
::v-deep(.search) {
  height: 500px;
}
::v-deep(header.el-dialog__header) {
  display: none;
}
.item {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #eee;
  .el-image {
    width: 100px;
    border-radius: 10px;
    margin-right: 20px;
  }
  .content {
    flex: 1;
    .title {
      font-size: 16px;
    }
    .desc {
      width: 300px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 12px;
    }
  }
}
</style>
