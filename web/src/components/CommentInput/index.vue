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
        <SvgIcon style="width: 25px; height: 25px; margin-left: 10px" name="emoji" :style="{ color: '#3cbff5' }" />
      </el-row>
    </el-card>
    <Vue3EmojiPicker ref="emojiPicker" class="emoji" :native="true" />
  </div>
</template>

<script setup lang="ts">
import { useWebInfoStore } from "@/store/modules/webInfo"
import { onClickOutside } from "@vueuse/core"
import { ref, defineProps } from "vue"
//@ts-expect-error
import GaoDeMap from "../GaoDeMap/index.vue"

// 前台全局仓库
const webInfoStore = useWebInfoStore()

// 接受父组件参数
const props = defineProps<{
  articleID: string
}>()

// 关闭评论组件
const closeComment = () => {
  webInfoStore.openComment(false)
}

// 评论组件
const commentRef = ref<any>(null)

// 点击页面空白处，关闭评论组件
onClickOutside(commentRef, () => [webInfoStore.openComment(false)])

// 评论数据
const commentForm = ref({
  content: "",
  address: "",
  nickname: "",
  articleID: props.articleID,
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
const publishComment = () => {
  console.log(commentForm.value)
}

// 清除
const clearComment = () => {
  commentForm.value = {
    content: "",
    address: "",
    nickname: "",
    articleID: props.articleID,
    time: ""
  }
  closeComment()
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
