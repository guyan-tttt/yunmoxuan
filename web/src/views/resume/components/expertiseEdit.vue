<template>
  <div>
    <el-dialog v-model="dialogShow" title="编辑专业技能" width="40%" @closed="cancel">
      <el-input type="textarea" :rows="10" :autosize="{ minRows: 10, maxRows: 10 }" v-model="inputValue" placeholder="请输入专业技能内容" />
      <el-row>
        <el-button class="btn" type="primary" @click="saveSubmit">保存提交</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineModel, ref } from "vue"
import { addSkillAPI } from "@/api/admin/resume"
import { ElMessage } from "element-plus"

// 弹框显示控制
const dialogShow = defineModel({
  type: Boolean,
  default() {
    return false
  },
  set(val: boolean) {
    return val
  }
})

const props = defineProps<{
  resumeId: string
}>()

// 输入框内容
const inputValue = ref("")

// 保存提交
const saveSubmit = async () => {
  if (!inputValue.value) {
    return ElMessage.warning("请输入专业技能内容")
  }
  const res = await addSkillAPI({
    id: props.resumeId,
    value: inputValue.value
  })
  if (res.code === 200) {
    ElMessage.success("添加成功")
    cancel()
  }
}

const cancel = () => {
  dialogShow.value = false
  inputValue.value = ""
}
</script>

<style scoped>
.btn {
  width: 50%;
  height: 35px;

  margin: 0 auto;
  margin-top: 20px;
}
</style>
