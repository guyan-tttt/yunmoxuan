<script setup lang="ts">
import UserCard from "./components/userCard.vue"
import { useSettingsStore } from "@/store/modules/settings"
import { onMounted, onUnmounted, ref } from "vue"
import { useIntersectionObserver } from "@vueuse/core"
import ArticleCard from "./components/articleCard.vue"
import { getRecommendArticleAPI } from "@/api/web/article"
import type { ArticleItem } from "@/types/admin/article"
import { useRouter } from "vue-router"
import IndexBg from "./components/IndexBg.vue"
import TypeWrite from "./components/TypeWrite.vue"
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE

// 全局路由对象
const router = useRouter()

// 设置对象
const settings = useSettingsStore()

// 改变导航栏背景显示
const changeNavBg = (value: boolean) => {
  settings.changeNavBg(value)
}

// 元素进入视口渐入
const articleTarget = ref<any>(null)
const targetIsActive = ref<boolean>(false)

// 进入视口修改激活状态
const { stop } = useIntersectionObserver(articleTarget, ([{ isIntersecting }]) => {
  targetIsActive.value = isIntersecting
})

// 推荐文章列表
const recommendArticleList = ref<ArticleItem[]>([])

// 获取推荐文章
const getRecommendArticle = async () => {
  const res = await getRecommendArticleAPI()
  if (res.code === 200) {
    recommendArticleList.value = res.data
  }
}

// 查看更多
const showMore = () => {
  router.push("/home-article")
}

onMounted(() => {
  changeNavBg(false)
  getRecommendArticle()
})

onUnmounted(() => {
  changeNavBg(true)
  stop()
})
</script>

<template>
  <div class="index">
    <IndexBg />
    <div class="index-title">
      <h1>{{ VITE_APP_TITLE }}</h1>
      <TypeWrite />
      <div class="icon">
        <el-icon :size="30" color="#fff"><ArrowDownBold /></el-icon>
      </div>
    </div>
    <div ref="articleTarget" class="container mx-auto max-w-screen-xl mt-5" :class="{ active: targetIsActive }">
      <div class="grid grid-cols-4">
        <!-- 左边栏 -->
        <div class="col-span-4 px-3 md:col-span-3 sm:col-span-4">
          <div class="article-title bg-white dark:bg-gray-800">
            <h4 class="text-black dark:text-white">文章推荐</h4>
            <span @click="showMore">查看更多</span>
          </div>
          <!-- 文章列表 -->
          <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
            <ArticleCard v-for="item in recommendArticleList" :key="item._id" :article="item" />
          </div>

          <!-- 分页 -->
        </div>
        <!-- 右边栏 -->
        <div class="col-span-4 px-3 md:col-span-1 sm:col-span-4">
          <div class="sticky top-21">
            <UserCard />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.index-title {
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: #fff;
  position: relative;
  h1 {
    font-size: 70px;
    font-weight: 800;
    letter-spacing: 5px;
    font-family: "STKaiti";
  }
  .icon {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    animation: twinkle 0.7s linear infinite alternate;
  }
  @keyframes twinkle {
    to {
      opacity: 0.5;
      transform: scale(0.9) translateY(0) translateX(-50%);
    }
    from {
      opacity: 1;
      transform: scale(1) translateY(-10px) translateX(-50%);
    }
  }
}

.sticky {
  position: sticky;
  top: 60px;
}

.container {
  max-width: 1230px;
  opacity: 0;
  transform: translateY(100px);
  transition: all 0.5s;
  &.active {
    opacity: 1;
    transform: translateY(0);
  }
}

.article-img {
  width: 100%;
}

.two-line-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  outline: 0;
  color: var(--el-menu-text-color);
  background-color: #fff;
  border-bottom: 2px solid #409eff;
}

.category-item:hover {
  text-decoration: underline;
  cursor: pointer;
}

.tag-item:hover {
  cursor: pointer;
}

.el-tag:hover {
  background-color: var(--el-color-info-light-8);
}

.cursor-pointer {
  cursor: pointer;
}

.article-title {
  width: 100%;
  // background-color: #fff;
  margin-bottom: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  h4 {
    font-size: 20px;
    // color: rgb(48, 49, 51);
    cursor: pointer;
  }
  span {
    cursor: pointer;
  }
}
</style>
