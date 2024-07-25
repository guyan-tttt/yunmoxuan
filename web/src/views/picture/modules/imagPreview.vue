<template>
  <div>
    <el-dialog v-model="dialog" @update:modelValue="close">
      <div class="image-preview">
        <img :src="props.url" alt="" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch } from "vue"
const props = defineProps({
  url: String,
  modelValue: Boolean
})

const emit = defineEmits(["update:modelValue"])

// 关闭弹框
const close = () => {
  emit("update:modelValue", false)
}

// 弹框显示
const dialog = ref<boolean>(props.modelValue)

watch(
  () => props.modelValue,
  (val: boolean) => {
    dialog.value = val
  }
)
</script>

<style scoped lang="scss">
::v-deep(.el-dialog) {
  max-width: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  .el-dialog__header {
    display: none;
  }
}
.image-preview {
  width: 100%;
  height: auto;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  img {
    width: 100%;
    height: auto;
    margin: 0;
    padding: 0;
    border-radius: 20px;
  }
}
::v-deep(.el-overlay-dialog) {
  top: 30%;
}
</style>
