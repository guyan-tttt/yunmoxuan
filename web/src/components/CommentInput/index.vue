<template>
  <div class="comment-input" :class="{ active: webInfoStore.commentShow }" ref="commentRef">
    <el-card>
      <el-row justify="space-between">
        <!-- 新增功能： -->
        <el-input
          v-model="commentForm.nickname"
          placeholder="请输入昵称~🔥"
          style="width: 150px; margin-bottom: 10px"
          maxlength="10"
          show-word-limit
        />
        <el-input
          v-model="commentForm.address"
          disabled
          placeholder="请选择地址"
          style="width: 150px; margin-bottom: 10px"
          maxlength="10"
          show-word-limit
        />

        <GaoDeMap @select="selectAddress" />
        <el-icon @click="closeComment"><CircleClose /></el-icon>
      </el-row>
      <el-input
        style="background-image: url(../../../assets/layouts/logo.png); background-color: transparent"
        type="textarea"
        placeholder="期待能留下足迹~~ ✨ ✨ ✨"
        maxlength="100"
        show-word-limit
        class="content"
        :input-style="'min-height:200px;'"
        :autosize="false"
        resize="none"
        v-model="commentForm.content"
      />

      <el-row align="middle" style="margin-top: 20px; position: relative">
        <el-button type="primary" size="small" @click="publishComment">发布</el-button>
        <el-button type="danger" size="small" @click="clearComment">清除</el-button>
        <SvgIcon
          @click="openEmoji"
          style="width: 25px; height: 25px; margin-left: 10px"
          name="emoji"
          :style="{ color: showEmoji ? '#3cbff5' : '#999' }"
        />
      </el-row>
    </el-card>
    <Vue3EmojiPicker @select="selectEmoji" v-if="showEmoji" ref="emojiPicker" class="emoji animate__animated animate__bounceInUp" :native="true" />
  </div>
</template>

<script setup lang="ts">
import { useWebInfoStore } from "@/store/modules/webInfo"
import { onClickOutside } from "@vueuse/core"
import { ref } from "vue"
//@ts-expect-error
import GaoDeMap from "../GaoDeMap/index.vue"
import { ElMessage } from "element-plus"
import dayjs from "dayjs"
import type { ArticleCommentItem } from "@/types/web/article"
import { addCommentAPI } from "@/api/web/article"

// 前台全局仓库
const webInfoStore = useWebInfoStore()

// 关闭评论组件
const closeComment = () => {
  // 表情组件关闭
  showEmoji.value = false
  webInfoStore.openComment(false)
}

// 评论组件
const commentRef = ref<any>(null)

// 点击页面空白处，关闭评论组件
onClickOutside(commentRef, () => closeComment())

// 评论数据
const commentForm = ref<ArticleCommentItem>({
  content: "",
  address: "",
  nickname: "",
  articleID: webInfoStore.articleId as string,
  time: ""
})

// 选择地址
const selectAddress = (data: any) => {
  const { province, city } = data.addressComponent
  console.log(data)

  if (province && city) {
    commentForm.value.address = province + "·" + city
  } else {
    commentForm.value.address = province
  }
}

// 发布评论
const publishComment = async () => {
  // 判断评论昵称与内容是否输入
  if (commentForm.value.nickname === "" || commentForm.value.content === "") {
    ElMessage.error("请输入昵称与评论内容")
    return
  }
  // 判断评论内容长度
  if (commentForm.value.content.length > 100 || commentForm.value.nickname.length > 10) {
    ElMessage.error("评论内容或昵称长度过长")
    return
  }
  // 获取当前时间
  commentForm.value.time = dayjs(new Date()).format("YYYY-MM-DD HH:mm")
  // 发送请求
  const res = await addCommentAPI(commentForm.value)
  console.log(res)
  if (res.code === 200) {
    ElMessage.success("评论成功")
    clearComment()
  } else {
    ElMessage.error("评论失败")
  }
}

// 清除
const clearComment = () => {
  commentForm.value = {
    content: "",
    address: "",
    nickname: "",
    articleID: webInfoStore.articleId as string,
    time: ""
  }
  closeComment()
}

// 当前表情组件显示
const showEmoji = ref<boolean>(false)

// 点击开启表情组件
const openEmoji = () => {
  showEmoji.value = !showEmoji.value
}

// 表情包组件对象
const emojiPicker = ref<any>(null)

// 点击页面空白处，关闭表情包组件
onClickOutside(emojiPicker, () => (showEmoji.value = false))

// 选择表情
const selectEmoji = (emoji: any) => {
  commentForm.value.content += emoji.i
}
</script>

<style scoped lang="scss">
.comment-input {
  position: fixed;
  bottom: -300px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  transition: all 0.5s;
  &.active {
    bottom: 0;
  }
  .emoji {
    position: absolute;
    right: -280px;
    top: 0;
  }
  ::v-deep(.content textarea) {
    min-height: 150px !important;
    background-image: url(../../assets/layouts/comment-bg.png);
    background-size: 70px auto;
    background-repeat: no-repeat;
    background-position: bottom right;
  }
}
.el-card {
  overflow: visible;
}
</style>
