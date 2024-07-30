import { defineStore } from "pinia"
import { ref } from "vue"
import type { UserInfo } from "@/types/admin/user"
import { getAuthorInfoAPI, getCategoryAPI, getTagAPI } from "@/api/web/index"
import type { AddCategory } from "@/types/admin/category"
import type { Tag } from "@/types/admin/tags"
import { log } from "console"

// 前台全局信息仓库
export const useWebInfoStore = defineStore(
  "webInfo",
  () => {
    // 网站作者信息
    const authorInfo = ref<UserInfo>()

    // 设置作者信息
    const getAuthorInfo = async () => {
      const res = await getAuthorInfoAPI()
      if (res.code === 200) {
        authorInfo.value = res.data
      }
    }

    // 分类信息
    const categoryInfo = ref<AddCategory[]>([])

    // 获取分类列表项
    const getCategoryInfo = async () => {
      const res = await getCategoryAPI()
      if (res.code === 200) {
        categoryInfo.value = res.data
      }
    }

    // 文章标签信息
    const tagInfo = ref<Tag[]>([])

    // 获取标签信息
    const getTagsInfo = async () => {
      const res = await getTagAPI()
      if (res.code === 200) {
        tagInfo.value = res.data
      }
    }

    // 标签预览信息
    const tagPreviewInfo = ref<Tag>()

    // 标签预览显示
    const showPreview = ref<boolean>(false)

    // 打开预览框
    const openPreview = (tag: Tag) => {
      tagPreviewInfo.value = tag
      showPreview.value = true
    }

    // 评论组件显示
    const commentShow = ref<boolean>(false)

    // 当前添加评论文章id或者动态ID
    const articleId = ref<string>()

    // 打开评论框
    const openComment = (value: boolean, articleID: string = "") => {
      console.log("xax")

      commentShow.value = value
      if (value) {
        articleId.value = articleID
        console.log("")
      }
    }
    return {
      authorInfo,
      getAuthorInfo,
      categoryInfo,
      getCategoryInfo,
      tagInfo,
      getTagsInfo,
      tagPreviewInfo,
      showPreview,
      openPreview,
      commentShow,
      articleId,
      openComment
    }
  },
  {
    persist: true
  }
)
