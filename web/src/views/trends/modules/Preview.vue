<script setup lang="ts">
import { ref, defineProps, watch, nextTick } from "vue"
import Comment from "./Comment.vue"
import type { TrendsItem } from "@/types/admin/trends"

// 接受父组件参数
const props = defineProps<{
  data: TrendsItem
  modelValue: boolean
  province: any[]
}>()

// 接受父组件参数
const emit = defineEmits(["update:modelValue", "increase", "update:comment", "addLike"])

// 弹框显示
const dialogVisible = ref<boolean>(props.modelValue)

// 弹框关闭
const close = () => {
  emit("update:modelValue", false)
  commentShow.value = false
  nextTick(() => {
    commentShow.value = true
  })
}

// 监听父组件变化
watch(
  () => props.modelValue,
  (val) => {
    dialogVisible.value = val
  }
)

// 弹框打开，该动态浏览量+1
const lookIncrease = () => {
  // 提交父组件事件，提示动态浏览量+1
  emit("increase")
}

// 评论更新
const commentUpdate = (val: number) => {
  emit("update:comment", val)
}

// 评论组件
const commentShow = ref<boolean>(true)

// 点赞组件样式激活
const activeIndex = ref<number>(0)

// 添加点赞
const addLike = () => {
  // 判断是否点赞
  if (activeIndex.value === 0) {
    activeIndex.value = 1
    emit("addLike")

    setTimeout(() => {
      activeIndex.value = 0
    }, 1000)
  }
}
</script>

<template>
  <div class="preview">
    <el-dialog
      @closed="close"
      @opened="lookIncrease"
      style="padding: 30px; border-radius: 10px"
      v-model="dialogVisible"
      :show-close="false"
      draggable
    >
      <div class="preview-content">
        <el-row justify="space-between" align="middle">
          <el-col :span="24">
            <el-row style="width: 100%" justify="space-between">
              <div class="user">
                <el-avatar class="mr-3" :size="30" :src="props.data.userInfo.avatar" />
                <span class="font-600 mr-3">{{ props.data.userInfo.nickname }}</span>
              </div>
              {{ props.data.createTime }}
            </el-row>
            <p>{{ props.data.content }}</p>
            <el-row class="imageList">
              <el-image
                v-for="item in props.data.imgList"
                :key="item"
                style="width: 30%; height: auto"
                :src="item"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                :preview-src-list="props.data.imgList"
                :initial-index="4"
                fit="cover"
              />
            </el-row>
            <el-row justify="end" class="about">
              <span @click="addLike()" style="position: relative"
                ><SvgIcon
                  class="like"
                  :class="{ animate__heartBeat: activeIndex === 1 }"
                  style="margin-right: 10px; color: red"
                  :name="props.data.likeNum === 0 ? 'like' : 'like-active'"
                  size="18"
                />{{ props.data.likeNum }}
              </span>
              <span
                ><el-icon style="margin-right: 10px" :size="18"><View /></el-icon>{{ props.data.lookNum }}</span
              >
              <span
                ><el-icon style="margin-right: 10px" :size="18"><ChatRound /></el-icon>{{ props.data.commentNum }}</span
              >
            </el-row>
            <Comment v-if="commentShow" :data="props.data" :province="props.province" @update="commentUpdate" />
          </el-col>
          <el-col :span="11" />
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.imageList {
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  .el-image {
    border-radius: 10px;
  }
}
.about {
  margin-top: 20px;
  span {
    margin: 0 20px;
    font-size: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>
