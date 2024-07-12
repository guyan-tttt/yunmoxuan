<template>
  <div class="container">
    <h2>相册分组编辑</h2>
    <el-button type="primary" @click="addCategory">添加分组</el-button>
    <div class="list">
      <div class="item" v-for="(item, index) in data" :key="item.id">
        <div v-show="!item.isEdit" class="content" @click="clickItem(item, index)">
          <div class="info">
            <el-icon><Picture /></el-icon>
            生活记录
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
          v-model="item.name"
        />
      </div>
    </div>
    <el-dialog v-model="addCategoryDialog" title="添加分组" width="500">
      <el-form>
        <el-form-item label="分组名称">
          <el-input autocomplete="off" />
        </el-form-item>
        <el-form-item label="分组描述">
          <el-input autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-row justify="center"><el-button>取消</el-button> <el-button type="primary"> 确认 </el-button></el-row>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { ElMessageBox } from "element-plus"

const data = ref([
  {
    id: 1,
    name: "生活记录",
    isEdit: false,
    showDeleteIcon: false
  },
  {
    id: 1,
    name: "生活记录",
    isEdit: false,
    showDeleteIcon: false
  },
  {
    id: 1,
    name: "生活记录",
    isEdit: false,
    showDeleteIcon: false
  },
  {
    id: 1,
    name: "生活记录",
    isEdit: false,
    showDeleteIcon: false
  },
  {
    id: 1,
    name: "生活记录",
    isEdit: false,
    showDeleteIcon: false
  }
])

// 输入框组件
const inputRefs = ref<any[]>([])

// 获取输入框组件
const setRefAction = (el) => {
  if (el) {
    inputRefs.value.push(el)
  }
}

// 点击切换编辑
const clickItem = (item, index) => {
  item.isEdit = true
  inputRefs.value[index].focus()
}

// 输入框完成编辑时提示用用户否完成编辑
const changeItem = (item) => {
  ElMessageBox.confirm("确定要完成本次编辑吗？", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {})
    .catch(() => {})
    .finally(() => {
      item.isEdit = false
    })
}

// 添加弹框
const addCategoryDialog = ref(false)

// 添加分组
const addCategory = () => {
  addCategoryDialog.value = true
}

// 点击信息图标，显示删除图标
const showDeleteIcon = (item) => {
  item.showDeleteIcon = true
  setTimeout(() => {
    item.showDeleteIcon = false
  }, 2000)
}

// 点击删除按钮
const deleteCategory = (item) => {
  ElMessageBox.confirm("确定要删除该分组吗？", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      console.log(item)
    })
    .catch(() => {})
}
</script>

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
