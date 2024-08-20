<template>
  <div>
    <el-dialog title="添加动漫图片" v-model="dialogShow" @closed="closeDialog">
      <el-upload
        v-model:file-list="imgList"
        class="avatar-uploader"
        action=""
        :on-change="uploadChange"
        :auto-upload="false"
        list-type="picture-card"
        drag
        multiple
      >
        <!-- <img class="avatar" /> -->
        <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
        <!-- <template #file="{ file }">
          <el-image :src="file.url" />
        </template> -->
      </el-upload>
      <el-row class="mt-5">
        <el-button type="primary" @click="submit">提交</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from "vue"
import { ElMessage } from "element-plus"
import { uploadAnimationImageAPI } from "@/api/admin/animation"

// 接受父组件数据
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => {}
  }
})

const emit = defineEmits(["update:modelValue"])

// 弹框显示
const dialogShow = computed(() => {
  return props.modelValue
})

// 关闭弹框
const closeDialog = () => {
  fileList.value = []
  imgList.value = []
  emit("update:modelValue", false)
}

// 上传文件图片列表
const imgList = ref<any>([])

const fileList = ref<any>([])

// 文件上传
const uploadChange = (file: any) => {
  if (fileList.value.length === 10) {
    ElMessage.warning("一次性最多上传10张照片")
    return
  }
  fileList.value.push(file.raw)
  const img = {
    name: file.raw.name,
    url: URL.createObjectURL(file.raw)
  }
  imgList.value.push(img)
}

// 提交上传
const submit = async () => {
  // 判断是否为空
  if (fileList.value.length === 0) {
    ElMessage.warning("请上传图片")
    return
  }
  //   封装数据
  const formData = new FormData()
  fileList.value.forEach((item: any) => {
    formData.append("files", item)
  })
  formData.append("categoryID", props.data._id)
  formData.append("categoryName", props.data.name)
  const res = await uploadAnimationImageAPI(formData)
  if (res.code === 200) {
    ElMessage.success("上传成功")
  }
}
</script>

<style scoped>
.avatar {
  width: 178px;
  object-fit: cover;
}
::v-deep(.el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  height: 100px;
  width: 180px;
}

::v-deep(.avatar-uploader .el-upload:hover) {
  border-color: var(--el-color-primary);
}

::v-deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 180px;
  height: 100px;
  text-align: center;
}
.btn {
  width: 100px;
}
::v-deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 180px;
  height: 100px;
}

::v-deep(.el-upload--picture-card.is-drag) {
  display: flex;
  align-items: center;
  justify-content: center;
}
::v-deep(.el-upload-dragger) {
  width: 100% !important;
}
</style>
