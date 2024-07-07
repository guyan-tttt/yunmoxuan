<script lang="ts" setup>
import { QuillEditor, type modulesOptions } from "@vueup/vue-quill"
import "@vueup/vue-quill/dist/vue-quill.snow.css"
import "@vueup/vue-quill/dist/vue-quill.bubble.css"
import hljs from "highlight.js"
import "highlight.js/styles/monokai-sublime.css"
import { ref, onMounted } from "vue"
import BlotFormatter from "quill-blot-formatter"
import { getCategoryAllAPI } from "@/api/admin/category"
import { getAllTagsAPI } from "@/api/admin/tags"
import type { CategoryItem } from "@/types/admin/category"
import type { Tag } from "@/types/admin/tags"
import { ElMessage } from "element-plus"
import { useUserStore } from "@/store/modules/user"

// 图片调节工具
const modules: modulesOptions = {
  name: "blotFormatter",
  module: BlotFormatter,
  blotFormatter: {
    // 图片大小调节
    imageResize: {
      displayStyles: {
        backgroundColor: "black",
        border: "none",
        color: "white"
      },
      modules: ["Resize", "DisplaySize", "Toolbar"]
    }
  },
  syntax: {
    highlight: (text) => {
      return hljs.highlightAuto(text).value // 这里就是代码高亮需要配置的地方
    }
  }
}

// 用户仓库对象
const userStore = useUserStore()

// 富文本对象
const quillRef = ref<QuillEditor>(null)

// 富文本编辑器配置
const Options = {
  theme: "snow",
  placeholder: "请在这里输入",
  modules: {
    toolbar: {
      container: [
        // [{ 'header': 1 }, { 'header': 2 }], // 标题 —— 独立平铺
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题 —— 下拉选择
        [{ size: ["small", false, "large", "huge"] }], // 字体大小
        [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
        ["blockquote", "code-block"], // 引用  代码块
        // 链接按钮需选中文字后点击
        ["link", "image", "video"], // 链接、图片、视频
        [{ align: [] }], // 对齐方式// text direction
        [{ indent: "-1" }, { indent: "+1" }], // 缩进
        ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
        [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
        [{ script: "sub" }, { script: "super" }], // 下标/上标
        [{ font: [] }], //字体
        ["clean"] // 清除文本格式
      ]
    },
    syntax: {
      highlight: (text) => {
        return hljs.highlightAuto(text).value // 这里就是代码高亮需要配置的地方
      }
    }
  }
}

// 表单对象
const articleForm = ref({
  title: "", // 文章标题
  content: "", // 文章内容
  categoryID: "", // 文章分类ID
  tags: [], // 文章标签ID
  desc: "", // 文章描述
  cover: "", // 文章封面
  authorID: "", // 作者ID
  isPublish: true, // 是否发布
  isTop: true, // 是否置顶
  isOriginal: true, // 是否原创
  file: null // 封面文件
})

// 分类数据
const categoryList = ref<CategoryItem[]>([])

// 获取分类数据
const getCategoryList = async () => {
  const res = await getCategoryAllAPI()
  categoryList.value = res.data
}

// 标签数据
const tagsList = ref<Tag[]>([])

// 获取标签数据
const getTagsList = async () => {
  const res = await getAllTagsAPI()
  tagsList.value = res.data
}

// 图片上传
const imageUpload = (file: File) => {
  // 判断是否符合要求格式
  if (file.raw.type !== "image/png" && file.raw.type !== "image/jpeg") {
    ElMessage.error("请上传png或jpg格式的图片")
    return
  }
  // 判断文件大小
  if (file.raw.size / 1024 / 1014 > 5) {
    ElMessage.error("请上传小于5MB的图片")
    return
  }
  // 获取图片地址
  const url = URL.createObjectURL(file.raw)
  articleForm.value.cover = url
  articleForm.value.file = file.raw
}

// 提交
const onSubmit = () => {
  console.log(articleForm.value)
}
onMounted(() => {
  getCategoryList()
  getTagsList()
})
</script>

<template>
  <div>
    <el-card>
      <el-row justify="center"> <el-check-tag checked>添加文章分类</el-check-tag></el-row>
      <el-form :model="articleForm" label-width="auto" style="max-width: 800px; margin: 20px auto">
        <el-form-item label="文章标题">
          <el-input v-model="articleForm.title" placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item label="文章分类">
          <el-select v-model="articleForm.categoryID" placeholder="请选择文章分类">
            <el-option v-for="item in categoryList" :key="item._id" :label="item.name" :value="item._id" />
          </el-select>
        </el-form-item>
        <el-form-item label="文章标签">
          <el-checkbox-group v-model="articleForm.tags" @change="() => {}">
            <el-checkbox v-for="item in tagsList" :key="item._id" :label="item.name" :value="item._id">
              <el-row>
                <el-image style="width: 20px; height: 20px; margin-right: 5px" :src="item.icon" fit="fill" />
                <el-tag type="primary" effect="light">{{ item.name }}</el-tag>
              </el-row>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="文章描述">
          <el-input type="textarea" v-model="articleForm.desc" placeholder="请输入文章描述" />
        </el-form-item>
        <el-form-item label="文章内容">
          <QuillEditor
            v-model:content="articleForm.content"
            ref="quillRef"
            style="width: 100%; height: 300px"
            contentType="html"
            :options="Options"
          />
        </el-form-item>
        <el-form-item label="文章封面">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-change="imageUpload"
            :auto-upload="false"
          >
            <img v-if="articleForm.cover" :src="articleForm.cover" class="cover" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章选项">
          <el-switch
            v-model="articleForm.isOriginal"
            class="mt-2"
            style="margin-left: 24px"
            inline-prompt
            :active-icon="Check"
            :inactive-icon="Close"
            active-text="原创"
            inactive-text="转载"
          />
          <el-switch
            v-model="articleForm.isTop"
            class="mt-2"
            style="margin-left: 24px"
            inline-prompt
            :active-icon="Check"
            :inactive-icon="Close"
            active-text="置顶"
            inactive-text="默认"
          />
          <el-switch
            v-model="articleForm.isPublish"
            class="mt-2"
            style="margin-left: 24px"
            inline-prompt
            :active-icon="Check"
            :inactive-icon="Close"
            active-text="发布"
            inactive-text="草稿"
          />
        </el-form-item>
        <el-form-item label="文章作者">
          <el-select v-model="articleForm.authorID" placeholder="请选择文章作者">
            <el-option :label="userStore.userInfo.nickname" :value="userStore.userInfo._id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-row justify="center" style="width: 100%">
            <el-button type="primary" size="large" @click="onSubmit">提交</el-button>
            <el-button style="margin-left: 40px" size="large">取消</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.hljs-string,
.hljs-section,
.hljs-selector-class,
.hljs-template-variable,
.hljs-deletion {
  color: #800;
}

::v-deep(.avatar-uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
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
  width: 178px;
  height: 100px;
  text-align: center;
}
.cover {
  width: 178px;
}
.el-checkbox-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .el-checkbox {
    width: 20%;
  }
}
</style>
