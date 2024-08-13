<script lang="ts" setup>
import { type ListItem } from "./data"
import dayjs from "dayjs"
interface Props {
  list: ListItem[]
  type: string
}

const props = defineProps<Props>()

const emit = defineEmits(["handle"])

// 点击消除未读
const handleClick = (item: ListItem) => {
  emit("handle", item)
}
</script>

<template>
  <el-empty v-if="props.list.length === 0" />
  <el-card v-else v-for="(item, index) in props.list" :key="index" shadow="never" class="card-container">
    <template #header>
      <el-badge v-if="!item.view" is-dot class="card-header" @click="handleClick(item)">
        <div>
          <span>
            <span class="card-title">{{ item.title }}</span>
            <el-tag v-if="item.extra" :type="item.status" effect="plain" size="small">{{ item.extra }}</el-tag>
          </span>
          <div class="card-time">{{ dayjs(item.createTime).format("YYYY-MM-DD HH:mm") }}</div>
        </div>
        <div class="card-avatar" v-if="item.type === 1">
          <img src="../../assets/layouts/logo.png" width="34" />
        </div>
      </el-badge>
      <div v-else class="card-header">
        <div>
          <span>
            <span class="card-title">{{ item.title }}</span>
            <el-tag v-if="item.extra" :type="item.status" effect="plain" size="small">{{ item.extra }}</el-tag>
          </span>
          <div class="card-time">{{ dayjs(item.createTime).format("YYYY-MM-DD HH:mm") }}</div>
        </div>
        <div class="card-avatar" v-if="item.type === 1">
          <img src="../../assets/layouts/logo.png" width="34" />
        </div>
      </div>
    </template>
    <div class="card-body" v-html="item.content" />
  </el-card>
</template>

<style lang="scss" scoped>
.card-container {
  margin-bottom: 10px;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s;
    .card-title {
      font-weight: bold;
      margin-right: 10px;
    }
    .card-time {
      font-size: 12px;
      color: var(--el-text-color-secondary);
    }
    .card-avatar {
      display: flex;
      align-items: center;
    }
  }
  .card-body {
    font-size: 12px;
  }
}
</style>
