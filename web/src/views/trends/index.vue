<script setup lang="ts">
import { useUserStore } from "@/store/modules/user"
import { Plus, Edit, Delete, View } from "@element-plus/icons-vue"
import * as echarts from "echarts"
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import Vue3EmojiPicker from "vue3-emoji-picker"
import { ElInput, ElMessage, ElMessageBox } from "element-plus"
import "vue3-emoji-picker/css"
import {
  addTrendsAPI,
  getTrendsListAPI,
  getTrendsDetailAPI,
  updateTrendsAPI,
  deleteTrendsAPI,
  viewTrendsAPI,
  likeTrendsAPI
} from "@/api/admin/trends"
import Comment from "./modules/Comment.vue"
import dayjs from "dayjs"
import Preview from "./modules/Preview.vue"

// 全局路由
const router = useRouter()

// 修改个人信息
const changeUserInfo = () => {
  router.push("userInfo")
}

// 用户信息仓库
const userStore = useUserStore()

// 动态添加弹框显示
const showDialog = ref<boolean>(false)

// 添加动态
const addTrends = () => {
  showDialog.value = true
}

// 输入框组件
const inputRef = ref<typeof ElInput>()

// 表情选择值
const selectedEmoji = ref("")

// 选择表情
const onEmojiSelect = (emoji: any) => {
  // 当用户选择emoji时，将其插入到textarea中

  if (inputRef.value) {
    inputRef.value.focus()
    trendsForm.value.content += emoji.i
  }
  selectedEmoji.value = ""
}

// 表情输入框显示
const showEmoji = ref<boolean>(false)

// 打开表情输入框
const openEmoji = () => {
  showEmoji.value = !showEmoji.value
}

// 表单数据
const trendsForm = ref<{
  content: string
  imgList: any[]
}>({
  content: "",
  imgList: []
})

// 图片上传组件
const uploadRef = ref()
// 弹框标题
const title = ref("发布动态")

// 添加图片
const addImageList = (file: any) => {
  // 判断上传图片数量
  if (trendsForm.value.imgList.length === 9) {
    uploadRef.value.handleRemove(file)
    ElMessage.error("最多上传9张图片")
    return
  }
  // 判断图片格式
  if (file.raw.type !== "image/jpeg" && file.raw.type !== "image/png") {
    ElMessage.error("请上传jpg或png格式的图片")
    uploadRef.value.handleRemove(file)
    return
  }
  // 判断图片大小
  if (file.raw.size > 2 * 1024 * 1024) {
    ElMessage.error("请上传小于2M的图片")
    uploadRef.value.handleRemove(file.raw)
    return
  }

  // 添加图片
  trendsForm.value.imgList.push(file.raw)
}

// 移除图片
const removeImageList = (file: any) => {
  // 判断此时的状态
  if (title.value === "发布动态") {
    // 发布动态
    trendsForm.value.imgList = trendsForm.value.imgList.filter((item: any) => item.uid !== file.raw.uid)
  }
  // 编辑动态
  else {
    // 判断当前需要删的是图片链接还是图片文件,这里由于修改动态时添加过预览图片的列表uploadList，每张图片的名称都时image，因此可以通过name属性区分是否为图片链接
    if (file.name === "image") {
      // 按照url删除原动态中的该图片
      trendsForm.value.imgList = trendsForm.value.imgList.filter((item: any) => item !== file.url)
    } else {
      trendsForm.value.imgList = trendsForm.value.imgList.filter((item: any) => item.uid !== file.raw.uid)
    }
  }
}

// 取消
const cancel = () => {
  showDialog.value = false
  trendsForm.value.content = ""
  trendsForm.value.imgList = []
  uploadRef.value.clearFiles()
}

// 发布
const publish = async () => {
  if (trendsForm.value.content === "") {
    ElMessage.error("请输入内容")
    return
  }

  // 判此时的编辑状态
  if (title.value === "发布动态") {
    // 组装数据
    const formData = new FormData()
    formData.append("content", trendsForm.value.content)
    formData.append("userID", userStore.userInfo._id)
    trendsForm.value.imgList.forEach((item: any) => {
      formData.append("files", item)
    })
    // 发送请求
    const res = await addTrendsAPI(formData)
    if (res.code === 200) {
      ElMessage.success("发布成功")
    } else {
      ElMessage.error("发布失败")
    }
  } else {
    // 汇总数据
    editTrendsInfo.value.content = trendsForm.value.content // 将修改过的内容替换
    // 这里由于原本的图片是url路径，新增的图片是file类型所以需要分开处理
    // 获取原图片
    const oldImgList = trendsForm.value.imgList.filter((item: any) => !item.uid)
    // 获取上传的新图片
    const newImgList = trendsForm.value.imgList.filter((item: any) => item.uid)
    // 获取需要删除的图片
    const delImgList = editTrendsInfo.value.imgList.filter((item: any) => !oldImgList.includes(item))
    editTrendsInfo.value.imgList = oldImgList
    editTrendsInfo.value.delImgList = delImgList
    // 组装数据
    const formData = new FormData()
    for (const key in editTrendsInfo.value) {
      formData.append(key, editTrendsInfo.value[key])
    }
    // 挂载文件
    newImgList.forEach((item: any) => {
      formData.append("files", item)
    })

    // 发送请求
    const res = await updateTrendsAPI(formData)
    if (res.code === 200) {
      ElMessage.success("修改成功")
    } else {
      ElMessage.error("修改失败")
    }
  }
  getTrendsList()
  cancel()
}

// 获取动态列表
const getTrendsList = async () => {
  const res = await getTrendsListAPI(pageData.value.page, pageData.value.pageSize)
  console.log(res)

  if (res.code === 200) {
    res.data.forEach((item: any) => {
      item.createTime = dayjs(item.createTime).format("YYYY-MM-DD HH:mm")
    })
    trendsList.value = res.data
    pageData.value.total = res.total
  }
}

// 动态列表
const trendsList = ref<any[]>([])

// 分页数据
const pageData = ref({
  page: 1,
  pageSize: 5,
  total: 0
})

// 节流阀
const throttle = ref<boolean>(false)

// 是否加载完毕
const isLoad = ref<boolean>(false)

// 滚动加载逻辑
const load = async () => {
  if (isLoad.value) return
  if (trendsList.value.length > 0) {
    if (!throttle.value && trendsList.value.length < pageData.value.total) {
      throttle.value = true
      pageData.value.page++
      await getTrendsList()
      throttle.value = true
    } else if (trendsList.value.length === pageData.value.total) {
      ElMessage.info("没有更多数据了")
      isLoad.value = true
    }
  }
}

// 当前修改的动态详情
const editTrendsInfo = ref<any>({})

// 修改动态
const editTrends = async (item: any) => {
  // 获取动态详情
  const res = await getTrendsDetailAPI(item._id)
  if (res.code === 200) {
    editTrendsInfo.value = res.data
  }
  trendsForm.value.content = editTrendsInfo.value.content
  trendsForm.value.imgList = editTrendsInfo.value.imgList.concat([])
  console.log(trendsForm.value.imgList)

  // 打开弹窗
  showDialog.value = true
  // 修改标题
  title.value = "编辑动态"

  // 获取图片列表
  uploadList.value = trendsForm.value.imgList.map((i: any) => {
    return {
      name: "image",
      url: i
    }
  })
}
// 上传图片展示列表
const uploadList = ref<any[]>([])

// 删除动态
const delTrends = async (item: any) => {
  ElMessageBox.confirm("确定删除该动态吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(async () => {
      const res = await deleteTrendsAPI(item._id)
      if (res.code === 200) {
        ElMessage.success("删除成功")
      } else {
        ElMessage.error("删除失败")
      }
      getTrendsList()
    })
    .catch(() => {})
}

// 预览弹框显示
const previewShow = ref(false)

// 预览弹框内容
const previewData = ref<any>({})

// 预览
const previewTrends = (item: any) => {
  previewData.value = item
  previewShow.value = true
}

// 浏览量增加
const addLook = async () => {
  previewData.value.lookNum++
  await viewTrendsAPI(previewData.value._id)
}

// 点赞特效
const like = ref<boolean>(false)

const activeIndex = ref<number>(-1)

// 点赞
const addLike = async (item: any, index: number) => {
  // 判断是否点赞
  if (!like.value) {
    like.value = true
    activeIndex.value = index
    // 点赞
    item.likeNum++
    await likeTrendsAPI(item._id)
    setTimeout(() => {
      like.value = false
      activeIndex.value = -1
    }, 1000)
  }
}
// 初始化
onMounted(() => {
  getTrendsList()

  // 浏览量统计
  const myChart1 = echarts.init(document.getElementById("look"))
  // 绘制图表
  myChart1.setOption({
    title: {
      text: "近6个月浏览量"
    },
    xAxis: {
      type: "category",
      data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [
          {
            value: 200,
            itemStyle: {
              color: "#ff5800"
            }
          },
          {
            value: 120,
            itemStyle: {
              color: "#a90000"
            }
          },
          {
            value: 242,
            itemStyle: {
              color: "#ffaf00"
            }
          },
          {
            value: 109,
            itemStyle: {
              color: "#9e42ff"
            }
          },
          {
            value: 183,
            itemStyle: {
              color: "#3b93ff"
            }
          },
          {
            value: 161,
            itemStyle: {
              color: "#74ff3c"
            }
          }
        ],
        type: "bar"
      }
    ]
  })
  //   发布量统计
  const myChart2 = echarts.init(document.getElementById("publish"))
  // 绘制图表
  myChart2.setOption({
    title: {
      text: "近6个月发布量"
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      top: "bottom"
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: false, readOnly: false },
        restore: { show: false },
        saveAsImage: { show: false }
      }
    },
    series: [
      {
        name: "月发布量占比",
        type: "pie",
        radius: [20, 180],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8
        },

        data: [
          { value: 40, name: "1月" },
          { value: 38, name: "2月" },
          { value: 32, name: "3月" },
          { value: 30, name: "4月" },
          { value: 28, name: "5月" },
          { value: 26, name: "6月" }
        ]
      }
    ]
  })
  //   点赞数统计量
  const myChart3 = echarts.init(document.getElementById("like"))
  // 绘制图表
  myChart3.setOption({
    title: {
      text: "近6个月点赞量"
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        areaStyle: {}
      }
    ]
  })
})
</script>

<template>
  <div>
    <el-card>
      <el-page-header icon="" title="">
        <template #icon />
        <template #title />
        <template #content>
          <div class="flex items-center">
            <el-avatar class="mr-3" :size="60" :src="userStore.userInfo?.avatar" />
            <span class="text-large font-600 mr-3 animate__animated animate__bounce">
              {{ userStore.userInfo.nickname }}</span
            >
            <SvgIcon :name="userStore.userInfo?.gender === 1 ? 'boy' : 'girl'" style="width: 30px; height: 30px" />
            <el-tag>管理员</el-tag>
          </div>
        </template>
        <template #extra>
          <div class="flex items-center">
            <el-button type="primary" :icon="Plus" @click="addTrends">发布动态</el-button>
            <el-button type="success" class="ml-2" @click="changeUserInfo">修改个人信息</el-button>
          </div>
        </template>

        <el-descriptions :column="3" class="mt-4">
          <el-descriptions-item label="用户昵称">{{ userStore.userInfo.nickname }}</el-descriptions-item>
          <el-descriptions-item label="用户电话"> {{ userStore.userInfo.phone }}</el-descriptions-item>
          <el-descriptions-item label="用户邮箱">{{ userStore.userInfo.email }}</el-descriptions-item>
          <el-descriptions-item label="备注">
            <el-tag size="small" type="success">前端开发</el-tag>
            <el-tag size="small">学生</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="GitHub">
            {{ userStore.userInfo.github }}
          </el-descriptions-item>
        </el-descriptions>
        <p class="mt-4 text-sm">
          {{ userStore.userInfo?.introduction }}
        </p>
      </el-page-header>
    </el-card>
    <el-card
      v-infinite-scroll="load"
      :infinite-scroll-disabled="isLoad"
      infinite-scroll-distance="50px"
      style="width: 80%; margin: 0 auto; position: relative"
    >
      <el-timeline style="max-width: 50%">
        <el-timeline-item
          v-for="(i, index) in trendsList"
          :key="i._id"
          color="#409eff"
          :timestamp="i.createTime"
          placement="top"
        >
          <el-row justify="space-between" align="middle">
            <el-col :span="24">
              <el-card>
                <el-row style="width: 100%" justify="space-between">
                  <div class="user">
                    <el-avatar class="mr-3" :size="30" :src="i.userInfo.avatar" />
                    <span class="font-600 mr-3"> {{ i.userInfo.nickname }}</span>
                  </div>

                  <el-popover placement="right" :width="100" trigger="click">
                    <template #reference>
                      <span style="justify-items: end" class="edit">编辑</span>
                    </template>
                    <el-button circle :icon="View" type="success" @click="previewTrends(i)" />
                    <el-button circle :icon="Edit" type="primary" @click="editTrends(i)" />
                    <el-button circle :icon="Delete" type="danger" @click="delTrends(i)" />
                  </el-popover>
                </el-row>
                <p>
                  {{ i.content }}
                </p>
                <el-row class="imageList">
                  <el-image
                    v-for="item in i.imgList"
                    :key="item"
                    style="width: 30%; height: auto"
                    :src="item"
                    :zoom-rate="1.2"
                    :max-scale="7"
                    :min-scale="0.2"
                    :preview-src-list="i.imgList"
                    :initial-index="4"
                    fit="cover"
                  />
                </el-row>
                <el-row justify="end" class="about">
                  <span @click="addLike(i, index)" style="position: relative"
                    ><SvgIcon
                      class="like"
                      :class="{ animate__heartBeat: activeIndex === index }"
                      style="margin-right: 10px; color: red"
                      :name="i.likeNum === 0 ? 'like' : 'like-active'"
                      size="18"
                    />{{ i.likeNum }}
                  </span>
                  <span
                    ><el-icon style="margin-right: 10px" :size="18"><View /></el-icon>{{ i.lookNum }}</span
                  >
                  <span
                    ><el-icon style="margin-right: 10px" :size="18"><ChatRound /></el-icon>{{ i.commentNum }}</span
                  >
                </el-row>
                <Comment />
              </el-card>
            </el-col>
            <el-col :span="11" />
          </el-row>
        </el-timeline-item>
      </el-timeline>
      <!-- 统计图表 -->
      <el-card class="echart" style="width: 45%; margin: 20px auto">
        <div class="main" id="look" />
        <div class="main" id="publish" />
        <div class="main" id="like" />
      </el-card>
    </el-card>
    <el-dialog :title="title" v-model="showDialog">
      <el-form style="margin: 30px" :model="trendsForm">
        <el-form-item required style="position: relative">
          <el-input
            v-model="trendsForm.content"
            ref="inputRef"
            placeholder="记录美好生活"
            show-word-limit
            maxlength="100"
            type="textarea"
            :autosize="{
              minRows: 5,
              maxRows: 8
            }"
            input-style="height: 180px"
          />
          <Vue3EmojiPicker
            class="emoji"
            :class="{ active: showEmoji }"
            :native="true"
            @select="onEmojiSelect"
            v-model="selectedEmoji"
          />

          <el-row justify="start" style="width: 100%; margin-top: 20px; margin-right: 20px">
            <SvgIcon
              @click="openEmoji"
              style="width: 30px; height: 30px"
              name="emoji"
              :style="{ color: showEmoji ? '#3cbff5' : '#666' }"
            />
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-upload
            v-model:file-list="uploadList"
            ref="uploadRef"
            action=""
            list-type="picture-card"
            :auto-upload="false"
            :on-preview="() => {}"
            :on-remove="removeImageList"
            :on-change="addImageList"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="publish">发布</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 预览 -->
    <Preview :data="previewData" v-model="previewShow" @increase="addLook" />
  </div>
</template>

<style scoped lang="scss">
.text-large {
  font-size: 26px;
}
::v-deep(.el-page-header__back) {
  display: none;
}
::v-deep(.el-divider--vertical) {
  border: 0;
}
.imageList {
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  .el-image {
    border-radius: 10px;
  }
}

.main {
  width: 90%;
  height: 400px;
}
.echart {
  position: absolute;
  top: 23px;
  right: 25px;
}
.about {
  margin-top: 20px;
  span {
    margin: 0 20px;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
}
.emoji {
  position: absolute;
  z-index: 1000;
  right: 10px;
  top: 118px;
  transform: scale(0);
  transition: all 0.3s;
  &.active {
    transform: scale(1);
  }
}
.user {
  display: flex;
  align-items: center;
}
.edit {
  cursor: pointer;
  &:hover {
    color: #3cbff5;
  }
}
</style>
