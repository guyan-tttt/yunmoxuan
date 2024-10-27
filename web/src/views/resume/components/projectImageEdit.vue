<template>
  <div>
    <el-dialog v-model="dialogShow" width="40%" title="上传项目截图" @closed="cancel">
      <el-upload
        v-model:file-list="fileList"
        action=""
        list-type="picture-card"
        :auto-upload="false"
        :on-change="uploadImage"
        :on-preview="() => {}"
        :on-remove="() => {}"
        multiple
        :limit="5"
        :on-exceed="
          () => {
            ElMessage.warning('最多上传5张图片')
          }
        "
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-row class="mt-10">
        <el-button @click="submit" type="primary">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, type UploadFile } from "element-plus"
import { ref, defineModel } from "vue"
import { uploadProjectImageAPI } from "@/api/admin/resume"
const dialogShow = defineModel({
  type: Boolean,
  default: false
})

const props = defineProps({
  projectId: {
    type: String,
    default: ""
  }
})

const fileList = ref<UploadFile[]>([])

// 上传图片
const uploadImage = () => {
  if (fileList.value.length > 5) {
    ElMessage.warning("最多上传6张图片")
    fileList.value.pop()
    return
  }
}

const submit = async () => {
  if (fileList.value.length === 0) {
    ElMessage.warning("请上传图片")
    return
  }
  const formData = new FormData()
  fileList.value.forEach((file: any) => {
    formData.append("files", file.raw)
  })
  formData.append("projectId", props.projectId)
  const res = await uploadProjectImageAPI(formData)
  if (res.code === 200) {
    ElMessage.success("上传成功")
    cancel()
  }
}

const cancel = () => {
  dialogShow.value = false
  fileList.value = []
}
</script>

<style scoped></style>
