<template>
  <vue3-seamless-scroll :hover="true" :list="listData" :step="0.5" class="scroll">
    <div class="information-list">
      <div class="information-list-item" v-for="item in listData" :key="item.title">
        <el-icon color="#5387f0" :size="35"><ChromeFilled /></el-icon>
        <div>
          <p>
            <span class="col">{{ item.nickname }}</span> 发布了评论“{{ item.content }}”
          </p>
          <p>
            {{ item.time }} <i>{{ item.ip }}</i>
          </p>
        </div>
      </div>
    </div>
  </vue3-seamless-scroll>
</template>

<script setup lang="ts">
import { ref, defineProps, watch } from "vue"

// 获取数据
const props = defineProps<{
  data: any[]
}>()

const listData = ref(props.data)

watch(
  () => props.data,
  () => {
    listData.value = props.data
  },
  {
    deep: true
  }
)
</script>

<style scoped lang="scss">
.scroll {
  width: 100%;
  height: 500px;
  overflow: hidden;
  margin: 10px;
}
.information-list {
  margin-top: 20px;
  .information-list-item {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 15px 0;
    div {
      width: 100%;
      margin-left: 10px;
      p {
        font-size: 14px;
        margin: 5px 0;
        span {
          color: #6cb5fd;
          font-weight: 700;
        }
        i {
          margin-left: 40px;
          font-size: 12px;
          color: #999;
        }
      }
    }
    .col {
    }
    div :nth-child(2) {
      font-size: 14px;
    }
  }
}
</style>
