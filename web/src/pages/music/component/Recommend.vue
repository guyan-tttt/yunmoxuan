<template>
  <div>
    <el-card class="mb-3">
      <header>
        <h3>✨ {{ props.type }}</h3>
        <div @click="$router.push(props.url)" class="mr-3 hover:text-blue header-right" style="cursor: pointer">
          <span>更多</span>
          <el-icon><ArrowRight /></el-icon>
        </div>
      </header>
      <ul class="list">
        <li class="item" v-for="item in props.data" :key="item.id" @click="$router.push(`/home-music/detail?id=${item.id}`)">
          <div class="view">
            <span v-if="item.playCount">🔥</span>
            <span v-else>🎼</span>
            <span v-if="item.playCount">{{ Math.floor(item.playCount / 10000) }}w</span>
            <span v-else>{{ item.musicSize }}</span>
          </div>
          <el-image class="img" :src="item.coverImgUrl || item.img1v1Url" fit="cover">
            <template #placeholder>
              <Loading />
            </template>
          </el-image>
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import Loading from "@/components/Loading/index.vue"
// 接收数据
const props = defineProps<{
  data: any
  type: string
  url: string
}>()
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    margin-top: 0;
    font-size: 1em;
    font-weight: 800;
    margin-bottom: 0.5em;
  }
  .header-right {
    display: flex;
    align-items: center;
    font-size: 0.7em;
    .el-icon {
      margin-left: 0.5em;
    }
  }
}
.list {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1fr 1fr;
  gap: 0.8em;
  width: 100%;
  margin-left: 0;
  padding-left: 0;
  list-style: none;
  overflow-x: auto;
  /*   滚动条样式 */
  &::-webkit-scrollbar {
    display: none;
  }
  .item {
    height: 9em;
    width: 9em;
    border-radius: 10px;
    justify-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .img {
      width: 85%;
      height: 85%;
      border-radius: 1em;
      border: 3px solid #eeecec;
      box-shadow: inset 0 0 1em #eeecec;
      ::v-deep(img) {
        transition: all 0.5s;
        &:hover {
          filter: brightness(1.2);
          transform: scale(1.1);
        }
      }
    }
    p {
      width: 85%;
      margin-top: 0.5em;
      font-size: 0.6em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .view {
      position: absolute;
      top: 0.5em;
      right: 1.5em;
      padding: 0.1em 0.3em;
      z-index: 10;
      color: #eeecec;
      text-shadow: 0 0 0.5em #fff;
      font-size: 0.5em;
      display: flex;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 0.5em;
    }
  }
  .item:nth-child(1) {
    grid-column: 1 / span 2;
    grid-row: 1 / span 2;
    height: 19em;
    width: 19em;
    p {
      font-size: 0.9em;
    }
    .view {
      right: 2.5em;
      font-size: 0.8em;
    }
  }
}
</style>
