<template>
  <div class="bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
    <a class="cursor-pointer">
      <el-image
        class="rounded-t-lg"
        :src="props.article?.cover"
        fit="contain"
        :preview-src-list="[props.article?.cover]"
        :hide-on-click-modal="true"
      />
    </a>
    <div class="p-5">
      <!-- 标签 -->
      <div type="success" class="item" v-for="item in props.article?.tags as Tag[]" :key="item?._id">
        <el-image style="width: 20px; height: 20px" :src="item.icon" fit="fill" />
        <span>{{ item?.name }}</span>
      </div>
      <a class="cursor-pointer">
        <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white title" @click="goToDetail(props.article?._id as string)">
          {{ props.article?.title }}
        </h2>
      </a>
      <p class="desc mb-3 font-normal text-gray-500 dark:text-gray-400">{{ props.article?.desc }}</p>
      <!-- meta 信息 -->
      <p class="text-gray-400 text-sm flex items-center article-mata">
        <svg
          class="inline w-3 h-3 mr-2 text-gray-400 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
          />
        </svg>
        {{ dayjs(props.article?.createTime).format("YYYY-MM-DD") }}

        <svg
          class="inline w-3 h-3 ml-5 mr-2 text-gray-400 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H1Zm0 0V2a1 1 0 0 1 1-1h5.443a1 1 0 0 1 .8.4l2.7 3.6H1Z"
          />
        </svg>
        <a class="text-gray-400 hover:underline">{{ props.article?.aboutInfo.category.name }}</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import type { ArticleItem } from "@/types/admin/article"
import dayjs from "dayjs"
import { useRouter } from "vue-router"
import type { Tag } from "@/types/admin/tags"

// 全局路由对象
const router = useRouter()

// 接受父组件数据
const props = defineProps<{
  article: ArticleItem
}>()

// 跳转到文章详情页面
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
.rounded-t-lg {
  height: 200px;
  ::v-deep(.el-image__inner) {
    height: auto;
    transition: all 0.5s;
    &:hover {
      transform: scale(1.2);
    }
  }
}
.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    color: #409eff;
  }
}
.desc {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.item {
  margin-top: 10px;
  width: 100px;
  height: 30px;
  display: inline-flex;
  font-weight: normal;
  line-height: 30px;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  background-color: #ecf5ff;
  border-radius: 4px;
  span {
    margin-left: 10px;
    color: #409eff;
  }
}
</style>
