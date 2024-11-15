<script setup lang="ts">
import ArticleCard from "./components/articleCard.vue"
import { getArticleListAPI, articleLikeAPI } from "@/api/web/article"
import { ref, onMounted, onUnmounted } from "vue"
import { ArticleItem } from "@/types/admin/article"
import { ElMessage } from "element-plus"
import Banner from "@/components/Banner/Banner.vue"
import { useSettingsStore } from "@/store/modules/settings"
import ArticleMobileCard from "../index/components/articleCard.vue"

// 设置对象
const settings = useSettingsStore()

const settingsStore = useSettingsStore()

// 分页数据
const pageData = ref({
  page: 1,
  pageSize: 5,
  total: 0
})

// 文章列表
const articleList = ref<ArticleItem[]>([])

// 获取文章列表
const getArticleList = async () => {
  const res = await getArticleListAPI(pageData.value.page, pageData.value.pageSize)
  if (res.code === 200) {
    console.log(res.data)

    articleList.value = articleList.value.concat(res.data)
    pageData.value.total = res.total as number

    // 判断此时是否已经到底了
    if (pageData.value.total <= pageData.value.page * pageData.value.pageSize) {
      showMore.value = false
    }
  }
}

// 加载更多按钮显示
const showMore = ref<boolean>(true)

// 加载更多
const loadMore = async () => {
  pageData.value.page++
  getArticleList()
}

// 点赞
const addLike = async (item: ArticleItem) => {
  // 增加本地数据
  item.likeNum++
  // 发送请求
  const res = await articleLikeAPI(item._id as string)
  if (res.code === 200) {
    ElMessage.success("点赞成功")
  }
}
const changeNavBg = (value: boolean) => {
  settings.changeNavBg(value)
}

// 初始化
onMounted(() => {
  changeNavBg(false)
  getArticleList()
})

onUnmounted(() => {
  changeNavBg(true)
})
</script>
<template>
  <div>
    <Banner v-if="!settingsStore.isMobile" />
    <div class="mx-auto max-w-screen-xl mt-5" :class="{ container: !settingsStore.isMobile }">
      <div class="grid grid-cols-4">
        <div
          v-if="!settingsStore.isMobile"
          class="col-span-4 px-3 article-list"
          :class="{ mobile: settingsStore.isMobile }"
          style="width: 80%; margin: 0 auto"
        >
          <ArticleCard
            v-cursor-pointer
            v-for="(item, index) in articleList"
            :key="item._id"
            :index="index"
            :article="item"
            @addLike="addLike(item)"
          />
        </div>
        <div v-else class="col-span-4 px-3 article-list" :class="{ mobile: settingsStore.isMobile }" style="width: 80%; margin: 0 auto">
          <ArticleMobileCard class="mb-3" v-cursor-pointer :index="index" v-for="(item, index) in articleList" :key="item._id" :article="item" />
        </div>
      </div>
    </div>
    <el-row justify="center" style="width: 100%">
      <div v-cursor-pointer class="more" @click="loadMore" v-if="showMore">
        <span>加载更多</span>
      </div>
      <div class="nomore" v-else>到底了~💫</div>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.article-list {
  font-size: 20px;
  &.mobile {
    font-size: 14px;
  }
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.more {
  display: inline-block;
  text-align: center;
  margin: 0 auto;
  background: #fff;
  border-radius: 100px;
  padding: 10px 35px;
  font-size: 15px;
  font-weight: 700;
  box-shadow:
    0 10px 13px rgba(31, 45, 61, 0.1),
    0 0 0 -1px rgba(32, 160, 255, 0.2),
    0 0 0 -25px rgba(32, 160, 255, 0.3);
  transition:
    all 0.25s,
    box-shadow 0s;
  letter-spacing: 1px;
  &:hover {
    color: #20a0ff;
    box-shadow:
      0 10px 13px rgba(32, 160, 255, 0.3),
      0 0 0 25px rgba(32, 160, 255, 0),
      0 0 0 25px rgba(32, 160, 255, 0);
    transition:
      all 1s,
      box-shadow 1s ease-out 0.1s;
  }
}
</style>
