<script setup lang="ts">
import { onMounted, nextTick, ref , onUnmounted} from "vue"
import { ElMessage } from "element-plus"
import { getArticleDetailAPI } from "@/api/web/article"
import { useRoute } from "vue-router"
import type { ArticleDetailItem } from "@/types/web/article"
import dayjs from "dayjs"
import type { Tag } from "@/types/admin/tags"
import Comment from "./components/Comment.vue"
import { useWebInfoStore } from '@/store/modules/webInfo'

// 为所有pre标签注册点击事件
const preClick = () => {
  const pres = document.querySelectorAll(".content pre")
  const div = document.createElement("div")
  div.className = "copy-btn"
  div.innerHTML = `dfefdwfwefwf`
  pres.forEach((pre) => {
    console.log(pre, div)
    // 添加到元素的相邻后面
    pre.innerHTML += `<div class='copy-btn'><svg t="1722134794672" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4275" width="20" height="20"><path d="M753.784471 870.520471c0 34.334118-26.985412 62.162824-60.235295 62.223058h-542.117647c-33.310118 0-60.235294-27.888941-60.235294-62.223058v-559.585883c0-34.334118 26.925176-62.162824 60.235294-62.162823h542.117647c33.249882 0 60.235294 27.828706 60.235295 62.162823v559.585883z m-60.235295-683.91153h-542.117647c-66.56 0-120.470588 55.657412-120.470588 124.325647v559.585883c0 68.668235 53.910588 124.385882 120.470588 124.385882h542.117647c66.499765 0 120.470588-55.657412 120.470589-124.385882v-559.585883c0-68.668235-53.970824-124.325647-120.470589-124.325647" fill="#666666" p-id="4276"></path><path d="M211.365647 808.056471h240.941177v-62.223059h-240.941177v62.223059z m0-124.385883h421.647059v-62.162823h-421.647059v62.162823z m0-124.325647h421.647059V497.121882h-421.647059v62.223059z m0-124.385882h421.647059V372.856471h-421.647059V434.898824z" fill="#666666" p-id="4277"></path><path d="M875.098353 0.180706h-542.117647c-66.56 0-120.470588 55.657412-120.470588 124.325647h60.235294c0-34.334118 26.985412-62.162824 60.235294-62.162824h542.117647c33.249882 0 60.235294 27.828706 60.235294 62.162824v559.585882c0 34.334118-26.985412 62.162824-60.235294 62.223059v62.162824c66.56 0 120.470588-55.657412 120.470588-124.385883v-559.585882c0-68.668235-53.910588-124.325647-120.470588-124.325647" fill="#666666" p-id="4278"></path></svg></div>`
  })
  // 点击复制
  nextTick(() => {
    const btns = document.querySelectorAll(".copy-btn")
    btns.forEach((btn: Element) => {
      //@ts-ignore
      btn.addEventListener("click", copy)
    })
  })
}

// 前台全局仓库
const webInfoStore = useWebInfoStore()

// 点击复制
const copy = (e: MouseEvent) => {
  // 提取代码
  //@ts-ignore
  const code = e.target.parentNode.parentNode.innerText
  // 复制到剪贴板(code)
  navigator.clipboard.writeText(code)
  ElMessage.success("复制成功")
}
// 页面路由对象
const route = useRoute()

// 文章信息
const article = ref<ArticleDetailItem>()

// 获取文章详情
const getArticleDetail = async (id: string) => {
  const res = await getArticleDetailAPI(id)
  if (res.code === 200) {
    article.value = res.data
  }
}

onMounted(async () => {
  await getArticleDetail(route.query.id as string)
  preClick()
  webInfoStore.articleId = route.query.id as string
})

onUnmounted(() => {
  webInfoStore.articleId = ""
})
</script>
<template>
  <!-- 文章详情 -->
  <div class="mx-auto max-w-screen-xl mt-5 mb-3">
    <div class="grid grid-cols-4">
      <div class="article col-span-4 px-3 mb-3">
        <div class="bg-white border border-gray-200 p-5 rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <!-- 面包屑 -->

          <!-- 文章主体 -->
          <article>
            <h1 class="mt-2 dark:text-white">
              {{ article?.detail.title }}
              <span v-if="article?.detail.isOriginal" class="origial">原创</span>
              <span v-else class="noorigial">转载</span>
            </h1>
            <div class="author">
              <el-row class="text-gray-400" align="middle">
                <el-icon style="margin-right: 10px"><User /></el-icon>
                {{ article?.detail.aboutInfo.author }}
              </el-row>
            </div>
            <div class="text-gray-400 text-sm flex items-center article-mata">
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
              发表于 {{ dayjs(article?.detail.createTime).format("YYYY/MM/DD") }}

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
              分类于&nbsp;<a class="text-gray-500 hover:underline">{{ article?.detail.aboutInfo.category.name }}</a>
              &nbsp;&nbsp;&nbsp;
              <el-icon><View /></el-icon>
              &nbsp; 阅读量{{ article?.detail.viewNum }} &nbsp;&nbsp;&nbsp;
              <SvgIcon class="like" style="margin-right: 10px; color: red; width: 17px; height: 17px" name="like-active" />
              点赞量 {{ article?.detail.likeNum }} &nbsp;&nbsp;&nbsp;
              <el-icon><ChatDotRound /></el-icon>
              &nbsp; 评论量 {{ article?.detail.commentNum }}
            </div>

            <div class="article-content" v-viewer v-highlight />

            <!-- 标签 -->
            <div class="mt-5 mb-5">
              <div type="success" class="item" v-for="item in article?.detail.aboutInfo.tags as Tag[]" :key="item._id">
                <el-image style="width: 20px; height: 20px" :src="item.icon" />
                <span>{{ item.name }}</span>
              </div>
            </div>
            <p class="content pre" v-html="article?.detail.content" />
          </article>
          <!-- 上下篇 -->
          <div class="article-footer flex">
            <div class="cursor-pointer">
              <router-link v-if="article?.prev.length" :to="`/home-detail?id=${article?.prev[0]._id}`">
                <span class="desc">
                  <svg
                    class="inline w-2 h-2 mr-1 mb-3px text-gray-500 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 8 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
                    />
                  </svg>
                  上一篇</span
                >
                <span class="hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 next-prev">{{
                  article.prev[0].title
                }}</span>
              </router-link>
            </div>
            <div class="cursor-pointer">
              <router-link v-if="article?.next.length" :to="`/home-detail?id=${article?.next[0]._id}`">
                <span class="desc">
                  下一篇
                  <svg
                    class="inline w-2 h-2 ml-1 mb-3px text-gray-500 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 8 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                    />
                  </svg>
                </span>
                <span class="hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 next-prev">{{
                  article?.next[0].title
                }}</span>
              </router-link>
            </div>
          </div>
        </div>
        <el-card style="margin-top: 10px" class="dark:bg-gray-800">
          <Comment :id="route.query.id as string" />
        </el-card>
      </div>
    </div>
    <!-- // 评论组件 -->
  </div>
</template>

<style scoped lang="scss">
.next-prev {
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
.container {
  padding: 20px;
}
.title {
  padding-bottom: 20px;
  margin-bottom: 0;
  line-height: 1.3;
  word-wrap: break-word;
  font-size: 32px;
  font-weight: 700;
  color: #292525;
}

.article-mata {
  margin-bottom: 20px;
}
.article {
  width: 80%;
  margin: 0 auto;
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
  padding: 5px;
  margin-right: 10px;
  background-color: #ecf5ff;
  border-radius: 4px;
  span {
    margin-left: 10px;
    color: #409eff;
  }
}
.origial {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  background-color: #409eff;
  padding: 5px 8px;
  border-radius: 10px;
  float: right;
  margin-right: 30px;
  box-shadow: 0 0 10px #409eff;
}
.noorigial {
  @extend .origial;
  background-color: #f56c6c;
  box-shadow: 0 0 10px #f56c6c;
}
:deep(pre) {
  background: #21252b;
  color: #f8f8f2;
  border-radius: 5px;
  padding: 10px 0 0;
  font-size: 17px;
  padding-left: 15px;
  padding-top: 35px;
  position: relative;
  overflow-x: auto;
  padding-bottom: 20px;
}

::v-deep(pre .copy-btn) {
  position: absolute;
  top: 20px;
  right: 20px;
}
:deep(pre code.hljs) {
  display: block;
  overflow-x: auto;
  padding: 1em;
  padding-left: 0 !important;
  padding-top: 25px !important;
}

:deep(pre:before) {
  background: #fc625d;
  border-radius: 50%;
  box-shadow:
    20px 0 #fdbc40,
    40px 0 #35cd4b;
  content: " ";
  height: 10px;
  margin-top: 5px;
  position: absolute;
  width: 10px;
  top: 5px;
}

:deep(.article-content p) {
  letter-spacing: 0.3px;
  margin: 0 0 20px 0;
  line-height: 30px;
  color: #4c4e4d;
  font-weight: 400;
  word-break: normal;
  word-wrap: break-word;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    PingFang SC,
    Hiragino Sans GB,
    Microsoft Yahei,
    Arial,
    sans-serif;
}

:deep(.article-content h1, .article-content h2, .article-content h3, .article-content h4, .article-content h5, .article-content h6) {
  margin: 30px 0 10px 0;
  color: #292525;
  line-height: 150%;
  font-family:
    PingFang SC,
    Helvetica Neue,
    Helvetica,
    Hiragino Sans GB,
    Microsoft YaHei,
    "\5FAE\8F6F\96C5\9ED1",
    Arial,
    sans-serif;
}

:deep(.article-content h3) {
  font-size: 20px;
  margin-top: 40px;
  margin-bottom: 16px;
  font-weight: 600;
}

:deep(.image-caption) {
  min-width: 20%;
  max-width: 80%;
  min-height: 43px;
  display: block;
  padding: 10px;
  margin: 0 auto;
  /* border-bottom: 1px solid #eee; */
  font-size: 13px;
  color: #999;
  text-align: center;
}

:deep(code:not(pre code)) {
  padding: 2px 4px;
  margin: 0 2px;
  font-size: 95% !important;
  border-radius: 4px;
  color: rgb(41, 128, 185);
  background-color: rgba(27, 31, 35, 0.05);
  font-family:
    Operator Mono,
    Consolas,
    Monaco,
    Menlo,
    monospace;
}

:deep(pre code) {
  display: block;
  font-size: 95% !important;
  background-color: rgba(27, 31, 35, 0.05);
  font-family:
    Operator Mono,
    Consolas,
    Monaco,
    Menlo,
    monospace;
  /* color: #fff; */
}

:deep(article ul) {
  padding-left: 40px;
}

:deep(article ul li) {
  list-style-type: disc;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 16px;
}

:deep(blockquote) {
  /* margin: 20px 0; */
  border-left: 2.3px solid rgb(52, 152, 219);
  quotes: none;
  background: rgb(236, 240, 241);
  color: #777;
  font-size: 16px;
  /* padding: 10px 15px 10px 15px; */
  margin: 2em 0;
  padding: 24px 24px;
  position: relative;
}

:deep(blockquote p:last-child) {
  margin-bottom: 0;
}

:deep(table tr) {
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
}

:deep(table) {
  border-collapse: collapse;
  margin-bottom: 1rem;
}

:deep(table th) {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}

:deep(table td) {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}

:deep(.article-content a) {
  color: #167bc2;
}

:deep(.article-content h2) {
  /* margin: 1em auto; */
  font-size: 22px;
  line-height: 1.5;
  font-weight: bold;
  font-synthesis: style;
  /* border-bottom: 1px solid rgba(0,0,0,.1); */
  padding-bottom: 16px;
  /* border-left: 3px solid #167bc2; */
  padding-bottom: 0;
  font-size: 24px;
  margin-top: 40px;
  margin-bottom: 26px;
  line-height: 140%;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 15px;
}

:deep(.article-content svg) {
  display: inline;
}

:deep(.article-content img) {
  position: relative;
  max-width: 100%;
  overflow: hidden;
  display: block;
  margin: 0 auto;
  cursor: -webkit-zoom-in;
  cursor: zoom-in;
}

:deep(strong) {
  color: rgb(52, 152, 219);
}

:deep(table tr:nth-child(2n)) {
  background-color: #f6f8fa;
}

.el-breadcrumb__inner a {
  font-weight: 400;
  color: #606266;
}

.el-breadcrumb__inner a:hover {
  font-weight: 400;
  color: #606266;
  text-decoration: underline;
}

.article-footer {
  border-top: 1px solid #e4e7ed;
  background-color: var(--el-fill-color-blank);
  justify-content: space-between;
  padding-top: 1rem;
}

.desc {
  display: block;
  font-size: 12px;
  color: rgba(60, 60, 60, 0.7);
}

.cursor-pointer {
  cursor: pointer;
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
</style>
