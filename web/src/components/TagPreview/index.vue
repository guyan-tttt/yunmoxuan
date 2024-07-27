<template>
  <el-dialog v-model="tagDetailShow" :title="props.tagDetail?.name" style="border-radius: 20px" @close="close">
    <div
      class="bg"
      v-html="props.tagDetail?.desc"
      :style="{
        background: `url(${props.tagDetail?.icon})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }"
    />
  </el-dialog>
</template>

<script setup lang="ts">
import type { Tag } from "@/types/admin/tags"
import { defineProps, computed, defineEmits } from "vue"

// 接收到父组件数据
const props = defineProps<{
  tagDetail: Tag
  modelValue: boolean
}>()

const emit = defineEmits(["update:modelValue"])

// 弹层显示控制
const tagDetailShow = computed(() => {
  return props.modelValue
})

// 关闭弹层
const close = () => {
  emit("update:modelValue", false)
}
</script>

<style scoped></style>
