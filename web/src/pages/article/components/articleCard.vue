<template>
  <div class="card mb-4 border border-gray-200 rounded-lg">
    <div class="bg">
      <img :src="$props.article?.cover" alt="" />
    </div>
    <div class="text" @click="goToDetail(props.article._id as string)" :class="{ even: props.index % 2 === 0 }">
      <div class="left">
        <img class="cover" :src="$props.article?.cover" alt="" />
      </div>
      <div class="right">
        <div class="top">
          <div class="date">🕛 {{ dayjs(props.article?.createTime).format("YYYY/MM/DD") }}</div>
          <div class="category">📜 {{ props.article?.aboutInfo.category.name }}</div>
        </div>
        <div class="name">{{ props.article?.title }}</div>
        <p class="desc">{{ props.article?.desc }}</p>
        <div class="tags">
          <div class="item" v-for="i in $props.article?.tags as Tag[]" :key="i._id">
            <img :src="i.icon" alt="" />
          </div>
        </div>
        <div class="about">
          <span style="position: relative"
            ><SvgIcon
              @click.stop="addLike"
              :class="{ animate__heartBeat: !isLike }"
              class="like animate__animated"
              style="margin-right: 10px; color: red"
              name="like-active"
              size="18"
            />{{ props.article?.likeNum }}</span
          >
          <span
            ><el-icon style="margin-right: 10px" :size="18"><View /></el-icon>{{ props.article?.viewNum }}</span
          >
          <span
            ><el-icon style="margin-right: 10px" :size="18"><ChatRound /></el-icon>{{ props.article?.commentNum }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import { ArticleItem } from "@/types/admin/article"
import type { Tag } from "@/types/admin/tags"
import dayjs from "dayjs"
import { ref } from "vue"
import { useRouter } from "vue-router"

// 接受父组件按数据
const props = defineProps<{
  index: number
  article: ArticleItem
}>()

// 全局路由对象
const router = useRouter()

// 防抖
const isLike = ref<boolean>(true)

// 提交事件
const emit = defineEmits(["addLike"])

// 点赞
const addLike = () => {
  if (isLike.value) {
    isLike.value = false
    // 通知父组件更新点赞量
    emit("addLike")
    setTimeout(() => {
      isLike.value = true
    }, 1000)
  }
}

// 跳转详情页面
const goToDetail = (id: string) => {
  router.push({
    path: "/home-detail",
    query: {
      id
    }
  })
}
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
  transition: all 0.3s;
  animation: cardShow linear;
  animation-timeline: view();
  animation-range: entry 0% cover 10%;
  &:hover {
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.4);
    transform: translateY(-10px);
  }
}
@keyframes cardShow {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
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
    width: 600px;
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
