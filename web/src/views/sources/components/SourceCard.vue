<template>
  <a class="card" :href="props.data.link" :style="{ backgroundImage: `url(${props.data.bg})` }" target="_blank" @contextmenu="handleContextMenu">
    <div class="top">
      <el-avatar :src="props.data.logo" :size="50" />
      <div class="name">{{ props.data.name }}</div>
      <div class="tag" @click.prevent="updateSource(props.data)">🏷️</div>
    </div>
    <div class="content">
      <div class="desc">{{ props.data.desc }}</div>
    </div>
    <div class="bottom">
      <div class="group">📖{{ props.data.groupName }}</div>
      <div class="time">🕣{{ dayjs(props.data?.createTime).format("YYYY-MM-DD") }}</div>
    </div>
  </a>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import dayjs from "dayjs"
import type { SourceItem } from "@/types/admin/source"
import { ElMessageBox } from "element-plus"

const props = defineProps<{
  data: SourceItem
  type: "web" | "admin"
}>()

const emit = defineEmits(["update", "delete"])

// 右击删除
const handleContextMenu = (e: MouseEvent) => {
  e.preventDefault()
  if (props.type === "admin") {
    ElMessageBox.confirm("确定要删除该资源吗？", "温馨提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      center: true
    })
      .then(() => {
        // 删除资源
        emit("delete", props.data._id)
      })
      .catch(() => {})
  }
}

// 更新资源
const updateSource = (item: SourceItem) => {
  item = Object.assign({}, item)
  emit("update", item)
}
</script>

<style scoped lang="scss">
.card {
  width: 300px;
  height: 80px;
  overflow: hidden;
  box-shadow: 0 0 10px #999;
  border-radius: 10px;
  transition: all 0.5s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-size: cover;
  background-position: center;
  color: #fff;

  cursor: pointer;
  .top {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.5s;
    .el-avatar {
      margin-left: 20px;
      margin-right: 30px;
      border: 1px solid #999;
      box-shadow: 0 0 10px #999;
      transition: all 0.5s;
    }
    .name {
      flex: 1;
      font-size: 20px;
      font-weight: 700;
      font-family: "Source Han Serif SC";
      transition: all 0.5s;
      &:hover {
        color: #4488f0;
      }
    }
    .tag {
      font-size: 30px;
      margin-right: 20px;
    }
  }
  .content {
    display: none;
    flex: 1;
    overflow: hidden;
    transition: all 0.5s;
    .desc {
      flex: 1;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 20px;
      line-height: 20px;
      text-shadow: 0 0 10px #000;
    }
  }
  .bottom {
    display: none;
    width: 100%;
    display: flex;
    align-items: center;
    height: 0;
    overflow: hidden;
    transition: all 0.5s;
    .group {
      flex: 1;
      font-size: 16px;
      padding-left: 20px;
    }
    .time {
      font-size: 16px;
      padding-right: 20px;
    }
  }
  &:hover {
    height: 200px;
    .top {
      .el-avatar {
        transform: translateX(-200px);
      }
      .name {
        transform: translateX(-80px);
      }
    }

    .content {
      display: flex;
    }
    .bottom {
      display: flex;
      height: 40px;
    }
  }
}
</style>
