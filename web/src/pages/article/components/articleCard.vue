<template>
  <div class="card mb-4 border border-gray-200 rounded-lg">
    <div class="bg">
      <img src="http://localhost:3000/images/image/375cb42cc947c8dce0a690499bc8caf0.png" alt="" />
    </div>
    <div class="text" :class="{ even: props.index % 2 === 0 }">
      <div class="left">
        <img class="cover" src="http://localhost:3000/images/image/375cb42cc947c8dce0a690499bc8caf0.png" alt="" />
      </div>
      <div class="right">
        <div class="top">
          <div class="date">🕛 2024/04/09</div>
          <div class="category">📜 前端基础知识</div>
        </div>
        <div class="name">文章第一篇</div>
        <p class="desc">
          徐爱徐爱遂川县安徽菜u拆改UC公会赛唱歌撒村尬吹一噶uv吃噶nygjtjtyjtmnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnu因此v发噶
        </p>
        <div class="tags">
          <div class="item" v-for="i in 6" :key="i">
            <img src="http://localhost:3000/images/tags/57265e016c5b4e65fab81d2037e37787.svg" alt="" />
          </div>
        </div>
        <div class="about">
          <span @click="addLike(i, index)" style="position: relative"
            ><SvgIcon class="like" style="margin-right: 10px; color: red" name="like-active" size="18" />222
          </span>
          <span
            ><el-icon style="margin-right: 10px" :size="18"><View /></el-icon>444</span
          >
          <span
            ><el-icon style="margin-right: 10px" :size="18"><ChatRound /></el-icon>555</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"

// 接受父组件按数据
const props = defineProps<{
  index: number
}>()
</script>

<style scoped lang="scss">
.time {
  font-weight: normal;
  font-size: 18px;
}
.card {
  position: relative;
  overflow: hidden;
  color: #fff;
}
.bg {
  height: 200px;
  width: 100%;
  background-size: cover;
  border-radius: 0.5rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(1.875rem) brightness(0.8);
  }
}
.text {
  display: flex;
  align-items: center;
  height: 200px;
  padding: 0;
  margin: 0;
  overflow: hidden;
  &.even {
    flex-direction: row-reverse;
    .left {
      img {
        -webkit-clip-path: polygon(10% 1%, 100% 0, 100% 100%, 0 100%);
        clip-path: polygon(10% 1%, 100% 0, 100% 100%, 0 100%);
        border-radius: 0 0.5rem 0.5rem 0;
      }
    }
  }
  .left {
    width: 40%;
    height: 100%;
    img {
      &:hover {
        filter: saturate(1.5);
      }
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 0.5rem 0 0 0.5rem;
      transition: all 0.5s;
      -webkit-clip-path: polygon(0 1%, 100% 0, 91% 100%, 0% 100%);
      clip-path: polygon(0 1%, 100% 0, 91% 100%, 0% 100%);
    }
  }
  .right {
    margin-left: 40px;
    flex: 1;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 40px;
      .date {
        font-size: 14px;
      }
      .category {
        font-size: 14px;
      }
    }
    .name {
      margin-top: 10px;
      font-size: 20px;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 400px;
    }
    .desc {
      width: 400px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
    }
    .tags {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .item {
        margin: 0 5px;
        img {
          width: 25px;
          height: 25px;
        }
      }
    }
    .about {
      display: flex;
      align-items: center;
      justify-content: end;
      margin-right: 40px;
      gap: 10px;
      span {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
