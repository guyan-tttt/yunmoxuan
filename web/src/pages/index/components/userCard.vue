<script setup lang="ts">
import { useWebInfoStore } from "@/store/modules/webInfo"
import type { Tag } from "@/types/admin/tags"
import OfficialAccount from "./OfficialAccount.vue"

// 前台信息仓库
const webInfoStore = useWebInfoStore()

// 点击打开弹框预览
const openPreview = (tag: Tag) => {
  webInfoStore.openPreview(tag)
}
</script>
<template>
  <div class="mb-3 w-full bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
    <div class="flex flex-col items-center pb-6 pt-6 card">
      <div class="avatar" @click="$router.push('/home-userInfo')">
        <el-avatar :src="webInfoStore.authorInfo?.avatar" :size="70" />
      </div>
      <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
        {{ webInfoStore.authorInfo?.nickname }}
        <SvgIcon :name="webInfoStore.authorInfo?.gender === 1 ? 'boy' : 'girl'" style="width: 25px; height: 25px" />
      </h5>
      <span class="text-sm text-black dark:text-gray-400 content">{{ webInfoStore.authorInfo?.introduction }}</span>
      <div class="about flex mt-4 space-x-3 md:mt-5">
        <span>
          <a data-tooltip-target="github-tooltip-bottom" data-tooltip-placement="bottom" :href="webInfoStore.authorInfo?.github" target="_blank">
            <SvgIcon name="github" style="width: 30px; height: 30px" />
          </a>
          <div
            id="github-tooltip-bottom"
            role="tooltip"
            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            我的 GitHub
            <div class="tooltip-arrow" data-popper-arrow />
          </div>
        </span>

        <span>
          <a :href="webInfoStore.authorInfo?.csdn" data-tooltip-target="csdn-tooltip-bottom" data-tooltip-placement="bottom" target="_blank">
            <SvgIcon name="csdn" style="width: 30px; height: 30px" />
          </a>
          <div
            id="csdn-tooltip-bottom"
            role="tooltip"
            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            我的 CSDN
            <div class="tooltip-arrow" data-popper-arrow />
          </div>
        </span>

        <span>
          <a :href="webInfoStore.authorInfo?.gitee" data-tooltip-target="gitee-tooltip-bottom" data-tooltip-placement="bottom" target="_blank">
            <SvgIcon name="gitee" style="width: 30px; height: 30px" />
          </a>
          <div
            id="gitee-tooltip-bottom"
            role="tooltip"
            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            我的 Gitee
            <div class="tooltip-arrow" data-popper-arrow />
          </div>
        </span>

        <span>
          <a href="#" data-tooltip-target="zhihu-tooltip-bottom" data-tooltip-placement="bottom" target="_blank">
            <SvgIcon name="zhihu" style="width: 30px; height: 30px" />
          </a>
          <div
            id="zhihu-tooltip-bottom"
            role="tooltip"
            class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            我的知乎
            <div class="tooltip-arrow" data-popper-arrow />
          </div>
        </span>
      </div>
    </div>
  </div>
  <!-- 微信公众号 -->
  <OfficialAccount />
  <!-- 文章分类 -->
  <div class="mb-3 w-full font-medium p-5 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
    <h2 class="mb-2 font-bold text-gray-900 uppercase dark:text-white">📅 分类</h2>
    <div class="category text-sm font-medium text-gray-900 bg-white rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      <a
        v-for="item in webInfoStore.categoryInfo"
        :key="item._id"
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
        {{ item.name }}
      </a>
    </div>
  </div>

  <!-- 文章标签 -->
  <div class="mb-3 w-full font-medium p-5 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
    <h2 class="mb-2 font-bold text-gray-900 uppercase dark:text-white">🔖 标签</h2>
    <div type="success" class="item" v-for="item in webInfoStore.tagInfo" :key="item._id" @click.stop="openPreview(item)">
      <el-image style="width: 20px; height: 20px" :src="item.icon" fit="fill" />
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.text-xl {
  display: flex;
  align-items: center;
  font-weight: 700;
}
::v-deep(.text-sm) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 20px;
}
.avatar {
  border-radius: 50%;
  border: 5px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tag {
  text-align: center;
  vertical-align: middle;
  height: 66px;
  line-height: 66px;
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
  cursor:
    var(--cursor-pointer) 50 50,
    pointer !important;
  span {
    margin-left: 10px;
    color: #409eff;
  }
}
.card {
  background-image: url(../../../assets/layouts/user-bg.png);
  background-size: cover;
  border-radius: 10px;
}
.content {
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  padding: 3px;
  border-radius: 10px;
}
.about svg {
  cursor:
    var(--cursor-pointer) 50 50,
    pointer !important;
}
.category a {
  cursor:
    var(--cursor-pointer) 50 50,
    pointer !important;
}
</style>
