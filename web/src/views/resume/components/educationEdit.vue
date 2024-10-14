<template>
  <div>
    <el-dialog v-model="dialogShow" title="添加教育经历" width="30%">
      <el-form>
        <el-form-item>
          <el-input />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineModel } from "vue"

const dialogShow = defineModel({
  type: Boolean,
  default: false,
  set(val) {
    return val
  }
})
</script>

<style scoped></style>
