<script setup lang="ts">
import { InfoFilled, Edit, DeleteFilled } from "@element-plus/icons-vue"
import { QuillEditor } from "@vueup/vue-quill"
import "@vueup/vue-quill/dist/vue-quill.snow.css"
import { ref, onMounted } from "vue"
import { addTagAPI, getTagListAPI, updateTagAPI, deleteTagAPI } from "@/api/admin/tags"
import { ElMessage, type FormInstance, ElMessageBox } from "element-plus"
import type { Tag, AddTagData, Page } from "@/types/admin/tags"

// 标签列表数据
const tagList = ref<Tag[]>([])

// 标签表单数据
const tagsForm = ref<AddTagData>({
  name: "",
  icon: "",
  desc: "",
  file: null
})

// 富文本编辑器配置
const editorOption = {
  placeholder: "编辑标签内容",
  theme: "snow", //or bubble
  modules: {
    toolbar: {
      container: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ size: [false, "10px"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: ["微软雅黑"] }],
        [{ align: [] }],
        // ['link', 'image', 'video'],
        ["clean"],
        ["insertInput"]
      ],
      handlers: {
        insertInput: function () {
          alert("我新添加的工具方法")
        }
      }
    }
  }
}

// 弹框显示
const drawerShow = ref<boolean>(false)

// 弹框标题
const drawerTitle = ref<string>("添加标签")

// 添加标签
const addTag = () => {
  drawerTitle.value = "添加标签"
  drawerShow.value = true
}

// 图标
const selectIcon = ref<string>("")

// 图标上传
const uploadIcon = (file: any) => {
  // 判断是否符合要求格式
  const type = file.raw.type === "image/svg+xml"
  if (!type) {
    ElMessage.error("请上传svg格式的图标")
    return
  }
  const url = URL.createObjectURL(file.raw)
  console.log(file)
  selectIcon.value = url
  tagsForm.value.file = file.raw
}

// 表单校验
const rules = {
  name: [{ required: true, message: "请输入标签名称", trigger: "blur" }],
  icon: [{ required: true, message: "请上传标签图标", trigger: "blur" }]
}

// 表单对象
const formRef = ref<FormInstance>()

// 提交
const submit = () => {
  // 首先判断添加标签时是否上传图标
  if (tagsForm.value.file === null && drawerTitle.value === "添加标签") {
    ElMessage.error("添加标签必须上传标签图标")
    return
  }
  // 表单校验
  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      // 提交表单
      tagsForm.value.icon = selectIcon.value || tagsForm.value.icon
      // 创建formData对象
      const formData = new FormData()
      for (const key in tagsForm.value) {
        //@ts-ignore
        formData.append(key, tagsForm.value[key])
      }
      // 判断是添加还是编辑
      if (drawerTitle.value === "添加标签") {
        // 发送请求
        const res = await addTagAPI(formData)
        if (res.code === 200) {
          ElMessage.success(res.message)
          cancel()
        }
      } else {
        const res = await updateTagAPI(formData)
        console.log(res)
        if (res.code === 200) {
          ElMessage.success(res.message)
          cancel()
        }
      }
      getTagList()
    }
  })
}

// 富文本编辑器对象
const editorRef = ref<any>()

// 取消
const cancel = () => {
  drawerShow.value = false
  formRef.value?.resetFields()
  selectIcon.value = ""
  tagsForm.value = {
    name: "",
    icon: "",
    file: null,
    desc: ""
  }
  editorRef.value.setHTML("")
  getTagList()
}

// 获取标签列表
const getTagList = async () => {
  const res = await getTagListAPI(pageData.value.page, pageData.value.pageSize)
  tagList.value = res.data
  tagList.value.forEach((item) => {
    item.icon = "http://localhost:3000" + item.icon
  })
  pageData.value.total = res.total
}

// 标签详情
const tagDetail = ref<Tag>()

// 标签详情弹框
const tagDetailShow = ref<boolean>(false)

// 查看标签详情
const showTag = (row: Tag) => {
  tagDetail.value = row
  tagDetailShow.value = true
}

// 编辑标签
const editTag = (row: Tag) => {
  drawerTitle.value = "编辑标签"
  tagsForm.value = row
  drawerShow.value = true
}

// 删除标签
const deleteTag = async (row: Tag) => {
  ElMessageBox.confirm("确定要删除该标签吗？这将会永久删除改标签，其无法修复。", "温馨提示！！！")
    .then(async () => {
      const res = await deleteTagAPI(row._id as string)
      if (res.code === 200) {
        ElMessage.success("删除成功")
        getTagList()
      } else {
        ElMessage.error("删除失败")
      }
    })
    .catch(() => {})
}

// 分页数据
const pageData = ref<Page>({
  page: 1,
  pageSize: 5,
  total: 0
})

// 切换页码
const changePage = (page: number) => {
  pageData.value.page = page
  getTagList()
}

// 切换分页数
const changePageSize = (pageSize: number) => {
  pageData.value.pageSize = pageSize
  getTagList()
}
// 初始化
onMounted(() => {
  getTagList()
})
</script>
<template>
  <div class="tag">
    <el-card class="container">
      <div class="role-operate" style="margin-bottom: 20px">
        <el-button size="default" type="primary" @click="addTag">添加标签</el-button>
      </div>

      <el-table :data="tagList" border>
        <el-table-column align="center" width="200" label="序号" type="index" />
        <el-table-column prop="name" align="center" width="200" label="标签名" />
        <el-table-column prop="icon" align="center" width="200" label="标签图标">
          <template v-slot="{ row }">
            <el-image :src="row.icon" style="width: 40px; height: 40px" />
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="desc" align="center" label="标签描述">
          <template v-slot="{ row }">
            <div class="desc" v-html="row.desc" />
          </template>
        </el-table-column>

        <el-table-column prop="desc" align="center" label="操作">
          <template v-slot="{ row }">
            <el-button @click="showTag(row)" type="success" :icon="InfoFilled" circle />
            <el-button @click="editTag(row)" type="primary" :icon="Edit" circle />
            <el-button @click="deleteTag(row)" type="danger" :icon="DeleteFilled" circle />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px"
        v-model:current-page="pageData.page"
        v-model:page-size="pageData.pageSize"
        :page-sizes="[3, 5, 10, 20]"
        size="small"
        :disabled="false"
        :background="false"
        layout="prev, pager, next, jumper ,-> ,total, sizes"
        :total="pageData.total"
        @size-change="changePageSize"
        @current-change="changePage"
      />
    </el-card>
    <!-- 添加标签弹框 -->
    <el-drawer @closed="cancel" v-model="drawerShow" :title="drawerTitle">
      <div class="form">
        <el-form
          ref="formRef"
          :rules="rules"
          :model="tagsForm"
          style="max-width: 600px"
          status-icon
          label-width="auto"
          class="demo-ruleForm"
        >
          <el-form-item label="标签名" prop="name">
            <el-input v-model="tagsForm.name" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item label="图标">
            <el-popover
              placement="bottom"
              title="温馨提示！"
              :width="200"
              trigger="hover"
              content="此处上传文件只允许上传SVG后缀名的图标文件"
            >
              <template #reference>
                <el-upload
                  class="avatar-uploader"
                  action=""
                  :show-file-list="false"
                  :auto-upload="false"
                  :on-change="uploadIcon"
                >
                  <img v-if="selectIcon || tagsForm.icon" :src="selectIcon || tagsForm.icon" class="icon" />
                  <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
              </template>
            </el-popover>
          </el-form-item>
          <el-form-item label="标签详情">
            <div>
              <QuillEditor
                ref="editorRef"
                v-model:content="tagsForm.desc"
                :options="editorOption"
                style="width: 100%; height: 300px"
                theme="snow"
                contentType="html"
              />
            </div>
          </el-form-item>
        </el-form>
        <el-row justify="center" style="width: 100%">
          <el-button type="primary" @click="submit"> 提交 </el-button>
          <el-button @click="cancel">取消</el-button>
        </el-row>
      </div>
    </el-drawer>

    <!-- 标签详情弹框 -->
    <el-dialog v-model="tagDetailShow" :title="tagDetail?.name" style="border-radius: 20px">
      <div
        class="bg"
        v-html="tagDetail?.desc"
        :style="{
          background: `url(${tagDetail?.icon})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }"
      />
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
::v-deep(.avatar-uploader .el-upload) {
  border: 1px dashed var(--el-border-color) !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

::v-deep(.avatar-uploader .el-upload:hover) {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  text-align: center;
}
.role-operate {
  padding: 10px;
}
.form {
  text-align: left;
}
#btn {
  display: flex;
  justify-content: center;
  padding-right: 100px;
}
.icon {
  width: 80px;
  height: 80px;
}
.desc {
  display: -webkit-box; /* 作为弹性伸缩盒子模型显示 */
  -webkit-box-orient: vertical; /* 设置文字溢出排列方向 从上到下排列 */
  -webkit-line-clamp: 1; /* 设置行数 */
  overflow: hidden; /* 文本溢出隐藏 */
}
</style>
