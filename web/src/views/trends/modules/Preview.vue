<script setup lang="ts">
import { ref, defineProps, watch } from "vue"
import Comment from "./Comment.vue"

// 接受父组件参数
const props = defineProps<{
  data: any
  modelValue: boolean
}>()

// 接受父组件参数
const emit = defineEmits(["update:modelValue", "increase"])

// 弹框显示
const dialogVisible = ref(props.modelValue)

// 弹框关闭
const close = () => {
  emit("update:modelValue", false)
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
              <span><SvgIcon style="margin-right: 10px" name="like" size="18" />{{ props.data.likeNum }}</span>
              <span
                ><el-icon style="margin-right: 10px" :size="18"><View /></el-icon>{{ props.data.lookNum }}</span
              >
              <span
                ><el-icon style="margin-right: 10px" :size="18"><ChatRound /></el-icon>{{ props.data.commentNum }}</span
              >
            </el-row>
            <Comment />
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
