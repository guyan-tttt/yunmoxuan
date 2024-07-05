<script setup lang="ts">
//@ts-expect-error
import UserCard from "./components/userCard.vue"
</script>

<template>
  <div class="index">
    <div class="container mx-auto max-w-screen-xl mt-5">
      <div class="grid grid-cols-4">
        <!-- 左边栏 -->
        <div class="col-span-4 px-3 md:col-span-3 sm:col-span-4">
          <div class="article-title">
            <h4>文章推荐</h4>
            <span>查看更多</span>
          </div>
          <!-- 文章列表 -->
          <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="(article, index) in 3"
              :key="index"
              class="bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
            >
              <a class="cursor-pointer">
                <img class="rounded-t-lg h-50 w-full" src="../../assets/1.jpg" />
              </a>
              <div class="p-5">
                <!-- 标签 -->
                <div
                  v-for="(item, index) in 3"
                  :key="index"
                  class="mb-3 inline-block bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300 dark:bg-green-900 dark:text-green-300"
                >
                  wenzhang1
                </div>
                <a class="cursor-pointer">
                  <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">yibenshu1</h2>
                </a>
                <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">vsdvasvadvadvadvav</p>
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
                  2024.4.5

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
                  <a class="text-gray-400 hover:underline">fjqofjqfqfewqf</a>
                </p>
              </div>
            </div>
          </div>

          <!-- 分页 -->
        </div>
        <!-- 右边栏 -->
        <div class="col-span-4 px-3 md:col-span-1 sm:col-span-4">
          <div class="sticky top-21">
            <UserCard />

            <!-- 文章分类 -->
            <div
              class="mb-3 w-full font-medium p-5 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
            >
              <h2 class="mb-2 font-bold text-gray-900 uppercase dark:text-white">分类</h2>
              <div
                class="text-sm font-medium text-gray-900 bg-white rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <a
                  v-for="(item, index) in 5"
                  :key="index"
                  class="flex items-end block w-full px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
                >
                  <svg
                    class="w-4 h-4 mr-2 mb-2px text-gray-800 inline dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 21 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="0.9"
                      d="M2.539 17h12.476l4-9H5m-2.461 9a1 1 0 0 1-.914-1.406L5 8m-2.461 9H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.443a1 1 0 0 1 .8.4l2.7 3.6H16a1 1 0 0 1 1 1v2H5"
                    />
                  </svg>
                  hefhehe
                </a>
              </div>
            </div>

            <!-- 文章标签 -->
            <div
              class="mb-3 w-full font-medium p-5 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
            >
              <h2 class="mb-2 font-bold text-gray-900 uppercase dark:text-white">标签</h2>
              <div
                v-for="(item, index) in 3"
                :key="index"
                class="inline-block bg-green-100 text-green-800 text-xs font-medium mr-2 mb-1 px-2.5 py-0.5 rounded hover:bg-green-200 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-300 dark:bg-green-900 dark:text-green-300"
              >
                guyah1
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sticky {
  position: sticky;
  top: 60px;
}

.container {
  max-width: 1230px;
}

.article-img {
  height: 100%;
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
  background-color: #fff;
  margin-bottom: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  h4 {
    font-size: 20px;
    color: rgb(48, 49, 51);
    cursor: pointer;
  }
  span {
    cursor: pointer;
  }
}
</style>
