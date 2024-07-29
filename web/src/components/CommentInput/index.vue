<template>
  <div class="comment-input" :class="{ active: webInfoStore.commentShow }" ref="commentRef">
    <el-card>
      <el-row justify="space-between">
        <!-- 新增功能： -->
        <el-input placeholder="请输入昵称~🔥" style="width: 150px; margin-bottom: 10px" maxlength="10" show-word-limit />
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
      />

      <el-row align="middle" style="relative">
        <el-button style="margin: 10px" type="primary" size="small">发布</el-button>
        <el-button style="margin-top: 10px" type="danger" size="small">清除</el-button>
        <SvgIcon style="width: 25px; height: 25px; margin-top: 10px; margin-left: 10px" name="emoji" :style="{ color: '#3cbff5' }" />
        <Vue3EmojiPicker v-if="false" ref="emojiPicker" class="emoji active" :native="true" />
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useWebInfoStore } from "@/store/modules/webInfo"
import { onClickOutside } from "@vueuse/core"
import { ref } from "vue"

// 前台全局仓库
const webInfoStore = useWebInfoStore()

// 关闭评论组件
const closeComment = () => {
  webInfoStore.openComment(false)
}

// 评论组件
const commentRef = ref<any>(null)

// 点击页面空白处，关闭评论组件
onClickOutside(commentRef, () => [webInfoStore.openComment(false)])
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
