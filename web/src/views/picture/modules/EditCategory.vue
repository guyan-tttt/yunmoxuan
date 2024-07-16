<script setup lang="ts">
import { ref, defineProps } from "vue"
import { ElMessageBox, ElMessage } from "element-plus"
import { addImageCategoryAPI, updateImageCategoryAPI, deleteImageCategoryAPI } from "@/api/admin/imageCategory"
import type { ImageCategoryItem } from "@/types/admin/imageCategory"

const props = defineProps<{
  data: ImageCategoryItem[]
}>()

const emit = defineEmits(["update"])

// 输入框组件
const inputRefs = ref<any[]>([])

// 获取输入框组件
const setRefAction = (el: any) => {
  if (el) {
    inputRefs.value.push(el)
  }
}

// 点击切换编辑
const clickItem = (item: ImageCategoryItem, index: number) => {
  item.isEdit = true
  inputRefs.value[index].focus()
}

// 输入框完成编辑时提示用用户否完成编辑
const changeItem = (item: any) => {
  ElMessageBox.confirm("确定要完成本次编辑吗？", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      if (item.value !== "" && item.value !== item.name) {
        // 判断是否为精选照片
        if (item.name === "精选照片") {
          ElMessage.error("精选照片不可修改")
          return
        }
        const res = await updateImageCategoryAPI({
          id: item._id,
          name: item.value
        })
        if (res.code === 200) {
          ElMessage.success("修改成功")
          emit("update")
        }
      } else {
        ElMessage.error("分类名称不能为空，并且需要有所修改")
      }
    })
    .catch(() => {})
    .finally(() => {
      item.isEdit = false
    })
}

// 添加弹框
const addCategoryDialog = ref(false)

// 添加分组
const addCategory = () => {
  // 判断此时照片分组是否超过5个
  if (props.data.length >= 5) return ElMessage.error("最多只能有5个分组")

  addCategoryDialog.value = true
}

// 点击信息图标，显示删除图标
const showDeleteIcon = (item: any) => {
  item.showDeleteIcon = true
  setTimeout(() => {
    item.showDeleteIcon = false
  }, 2000)
}

// 点击删除按钮
const deleteCategory = (item: any) => {
  ElMessageBox.confirm("确定要删除该分组吗？", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      // 判断是否为精选照片
      if (item.name === "精选照片") {
        ElMessage.error("精选照片不可删除")
        return
      }
      const res = await deleteImageCategoryAPI(item._id)
      if (res.code === 200) {
        ElMessage.success("删除成功")
        emit("update")
      }
    })
    .catch(() => {})
}

// 新增分组表单数据
const imageCategoryForm = ref<ImageCategoryItem>({
  name: "",
  desc: ""
})

// 添加弹框确认
const confirm = async () => {
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      // 判断是否与现有分类重名
      const isRepeat = props.data.some((item) => item.name === imageCategoryForm.value.name)
      if (isRepeat) return ElMessage.error("分组名称已存在")
      const res = await addImageCategoryAPI(imageCategoryForm.value)
      if (res.code === 200) {
        ElMessage.success("添加成功")
        cancel()
        emit("update")
      }
    }
  })
}

// 添加弹框取消
const cancel = () => {
  addCategoryDialog.value = false
  imageCategoryForm.value = {
    name: "",
    desc: ""
  }
}

// 表单校验规则
const rules = {
  name: [{ required: true, message: "请输入分组名称", trigger: "blur" }],
  desc: [{ required: true, message: "请输入分组描述", trigger: "blur" }]
}

// 表单对象
const formRef = ref()
</script>

<template>
  <div class="container">
    <h2>相册分组编辑</h2>
    <el-button type="primary" @click="addCategory">添加分组</el-button>
    <div class="list">
      <div class="item" v-for="(item, index) in props?.data" :key="item._id">
        <div v-show="!item.isEdit" class="content" @click="clickItem(item, index)">
          <div class="info">
            <el-icon><Picture /></el-icon>
            {{ item.name }}
            <span>{{ item.desc }}</span>
            <i>————{{ item.createTime }}</i>
          </div>
          <div class="right">
            <el-icon
              size="20"
              :class="{ active: !item.showDeleteIcon }"
              @click.stop="showDeleteIcon(item)"
              color="#267ee8"
              ><WarningFilled
            /></el-icon>
            <el-icon
              size="20"
              :class="{ active: item.showDeleteIcon }"
              color="#E73037"
              @click.stop="deleteCategory(item)"
              ><CircleCloseFilled
            /></el-icon>
          </div>
        </div>
        <el-input
          :ref="setRefAction"
          @blur="changeItem(item)"
          size="large"
          autofocus
          v-show="item.isEdit"
          v-model="item.value"
        />
      </div>
    </div>
    <el-dialog v-model="addCategoryDialog" title="添加分组" width="500">
      <el-form :model="imageCategoryForm" :rules="rules" ref="formRef">
        <el-form-item label="分组名称" prop="name">
          <el-input v-model="imageCategoryForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="分组描述" prop="desc">
          <el-input v-model="imageCategoryForm.desc" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-row justify="center"
          ><el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm"> 确认 </el-button></el-row
        >
      </template>
    </el-dialog>
    <el-divider />
    <el-card style="width: 100%" shadow="hover"
      >以上图片分组在删除时会自动清空分组下所有的照片信息，因此在删除时请用户谨慎删除</el-card
    >
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  .el-button {
    margin-left: 30px;
  }
  .list {
    width: 90%;
    margin: 0 auto;
    padding: 10px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .item {
      width: 90%;
      height: 40px;
      .content {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        margin-bottom: 10px;
        background-color: #f5f5f5;
        cursor: pointer;
        color: #000;
        .info {
          span {
            color: #999;
            font-size: 12px;
            margin-left: 10px;
          }
          i {
            color: #999;
            font-size: 12px;
            margin-left: 10px;
          }
        }
        .el-icon {
          margin-right: 10px;
        }
        .right {
          position: relative;
          width: 100px;
          height: 100%;
          .el-icon {
            position: absolute;
            right: 0;
            top: 10px;
            transition: all 0.5s;
            transform: scale(0);
            &.active {
              transform: scale(1);
            }
          }
        }
      }
    }
  }
}
</style>
