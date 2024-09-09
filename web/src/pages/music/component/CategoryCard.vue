<template>
  <li class="item" @click="$router.push(`/home-music/index/detail?id=${props.data.id}`)">
    <div class="left">
      <el-image :src="props.data.coverImgUrl" fit="cover" lazy>
        <template #placeholder>
          <Loading />
        </template>
      </el-image>
    </div>
    <div class="right">
      <div class="top">
        <div class="name">{{ props.data.name }}</div>
        <div class="num">🔥{{ (props.data.playCount / 10000).toFixed(1) }}w</div>
      </div>
      <p class="desc">{{ props.data.description }}</p>
      <div class="bottom">
        <div class="play">播放</div>
        <div class="about">
          <el-tag v-for="item in props.data.tags" :key="item" class="ml-1">{{ item }}</el-tag>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import Loading from "@/components/Loading/index.vue"
const props = defineProps<{
  data: any
}>()
</script>

<style scoped lang="scss">
.item {
  background-color: #fff;
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin-right: 20px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  .left {
    border-radius: 10px;
    .el-image {
      width: 120px;
      height: 120px;
      border: 5px solid #fff;
      border-radius: 10px;
      margin: 2px;
      transition: all 0.3s;
      &:hover {
        transform: scale(1.05);
        border-radius: 50%;
        border-color: #409eff;
      }
    }
  }
  .right {
    flex: 1;
    padding-left: 20px;
    min-height: 124px;
    .top {
      display: flex;
      justify-content: space-between;
      font-family: "楷体";
      margin-top: 10px;
      .name {
        font-size: 22px;
        font-weight: 700;
        max-width: 300px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .num {
        font-size: 16px;
        margin-right: 20px;
        background-color: rgba(0, 0, 0, 0.2);
        padding: 0 10px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
      }
    }
    .desc {
      max-width: 300px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
      margin-top: 10px;
      color: #999;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .play {
        width: 100px;
        height: 30px;
        background-color: #409eff;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        border-radius: 10px;
      }
      .about {
        margin-right: 20px;
      }
    }
  }
}
</style>
