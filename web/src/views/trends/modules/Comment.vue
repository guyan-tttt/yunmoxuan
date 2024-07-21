<script lang="ts" setup>
import { ref, defineProps } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import dayjs from "dayjs"
import { getCommentListAPI, addCommentAPI, deleteCommentAPI } from "@/api/admin/trends"
import type { CommentItem, CommentFormData, TrendsItem, TrendsPageData } from "@/types/admin/trends"
import { onClickOutside } from "@vueuse/core"

// 接受父组件数据
const props = defineProps<{
  data: TrendsItem
  province: any[]
}>()

// 触发父组件
const emit = defineEmits(["update"])

// 折叠面板显示
const activeNames = ref<number[]>([])

// 打开评论列表
const openComment = async () => {
  // 判断是否为空
  if (activeNames.value.length !== 0) {
    await getCommentList()
    setTimeout(() => {
      showEmojiPicker.value = true
    }, 1000)
  } else {
    showEmojiPicker.value = false
  }
}

// 评论表单
const commentForm = ref<CommentFormData>({
  nickname: "",
  content: "",
  ip: "",
  time: "",
  trendsID: props.data._id
})

// 发布评论
const submitComment = async () => {
  // 校验输入信息
  if (commentForm.value.nickname === "" || commentForm.value.content === "") {
    return ElMessage.error("请输入昵称和评论内容")
  }
  commentForm.value.time = dayjs(Date.now()).format("YYYY-MM-DD HH:mm")
  // 发送请求
  const res = await addCommentAPI(commentForm.value)
  if (res.code === 200) {
    ElMessage.success("评论成功")
    clearComment()
    getCommentList()
    emit("update", 1)
  }
}

// 清除评论
const clearComment = () => {
  commentForm.value.nickname = ""
  commentForm.value.content = ""
  commentForm.value.ip = ""
  commentForm.value.time = ""
}

// 列表加载
const loading = ref<boolean>(false)

// 获取评论列表
const getCommentList = async () => {
  loading.value = true
  const res = await getCommentListAPI(pageData.value.page, pageData.value.pageSize, props.data._id)
  if (res.code == 200) {
    commentList.value = res.data
    pageData.value.total = res.total
    setTimeout(() => {
      loading.value = false
    }, 500)
  }
}

// 删除评论
const delComment = async (id: string) => {
  ElMessageBox.confirm("确定删除该评论吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(async () => {
    const res = await deleteCommentAPI(id)
    if (res.code === 200) {
      ElMessage.success("删除成功")
      getCommentList()
      emit("update", -1)
    }
  })
}

// 分页数据
const pageData = ref<TrendsPageData>({
  page: 1,
  pageSize: 5,
  total: 0
})

// 加载更多
const loadMore = async () => {
  if (commentList.value.length < pageData.value.total) {
    pageData.value.page++
    await getCommentList()
  }
  if (commentList.value.length === pageData.value.total) {
    ElMessage.success("加载完毕")
  }
}

// 评论列表
const commentList = ref<CommentItem[]>([])

// 表情选择
const selectedEmoji = ref<string>("")

// 表情输入框显示
const showEmoji = ref<boolean>(false)

// 打开表情输入框
const openEmoji = () => {
  showEmoji.value = !showEmoji.value
}
// 选择表情
const selectEmoji = (emoji: any) => {
  commentForm.value.content += emoji.i
  selectedEmoji.value = ""
}

// 表情选择组件
const emojiPicker = ref<any>(null)

// 点击表情组件以外的位置，关闭表情选择框
onClickOutside(emojiPicker, () => {
  showEmoji.value = false
})

// 由于每一个评论区都需要一个表情选择框，所以在打开评论区时会有卡顿效果，因此在这里将表情框动态控制
const showEmojiPicker = ref<boolean>(false)
</script>

<template>
  <div class="comment">
    <el-collapse @change="openComment" v-model="activeNames">
      <el-collapse-item title="评论区" :name="1">
        <el-row>
          <!-- 新增功能： -->
          <el-input
            v-model="commentForm.nickname"
            placeholder="请输入昵称~🔥"
            style="width: 150px; margin-bottom: 10px"
            maxlength="10"
            show-word-limit
          />
          <el-select
            v-model="commentForm.ip"
            placeholder="请选择省份"
            style="width: 150px; margin-bottom: 10px; margin-left: 20px"
          >
            <el-option v-for="item in props.province" :key="item" :label="item.name" :value="item.name" />
          </el-select>
        </el-row>
        <el-input
          style="background-image: url(../../../assets/layouts/logo.png); background-color: transparent"
          type="textarea"
          placeholder="期待能留下足迹~~ ✨ ✨ ✨"
          maxlength="100"
          show-word-limit
          v-model="commentForm.content"
        />

        <el-row align="middle" style="relative">
          <el-button style="margin: 10px 0 0 0" type="primary" size="small" @click="submitComment">发布</el-button>
          <el-button style="margin-top: 10px" type="danger" size="small" @click="clearComment">清除</el-button>
          <SvgIcon
            @click="openEmoji"
            style="width: 25px; height: 25px; margin-top: 10px; margin-left: 10px"
            name="emoji"
            :style="{ color: showEmoji ? '#3cbff5' : '#666' }"
          />
          <Vue3EmojiPicker
            v-if="showEmojiPicker"
            ref="emojiPicker"
            class="emoji"
            :class="{ active: showEmoji }"
            :native="true"
            @select="selectEmoji"
            v-model="selectedEmoji"
          />
        </el-row>
        <ul class="list" v-if="commentList.length > 0" v-loading="loading">
          <li class="item" v-for="item in commentList" :key="item._id">
            <div class="info">
              <span class="name">{{ item.nickname }}</span>
              <span class="ip"
                ><i>IP:{{ item.ip }}</i></span
              >
              <span class="time">{{ item.time }}</span>
            </div>

            <div class="content">{{ item.content }}</div>
            <div class="del">
              <el-icon @click="delComment(item._id)" :size="20" color="#E73037"><CircleCloseFilled /></el-icon>
            </div>
          </li>

          <el-row style="width: 100%" v-if="commentList.length >= pageData.pageSize" justify="center">
            <el-button class="more" v-if="commentList.length < pageData.total" @click="loadMore">加载更多...</el-button>
            <div class="no-comment" v-else>没有更多了~</div>
          </el-row>
        </ul>

        <div class="no-comment" v-else>暂无评论</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style scoped lang="scss">
.comment {
  .list {
    width: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    .item {
      width: 100%;
      padding: 10px 0;
      border-bottom: 1px solid #efefef;
      position: relative;
      .info {
        .name {
          font-size: 14px;
          font-weight: 600;
        }
        .ip {
          font-size: 12px;
          color: #999;
          margin-left: 10px;
        }
        .time {
          font-size: 12px;
          color: #999;
          margin-left: 10px;
          float: right;
        }
      }
      .del {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.03);
        clip-path: circle(0% at 95% 70%);
        transition: all 0.7s;
        border-radius: 10px;
        cursor: pointer;
        .el-icon {
          position: absolute;
          right: 3%;
          bottom: 15%;
          transform: scale(0);
          transition: all 0.6s;
        }
      }
      &:hover {
        .del {
          clip-path: circle(200% at 95% 70%);
          .el-icon {
            transform: scale(1);
          }
        }
      }
    }
  }
}
.no-comment {
  font-size: 14px;
  color: #999;
  text-align: center;
  padding: 20px 0;
}
.more {
  width: 100%;
  font-size: 16px;
  color: #999;
  text-align: center;
  padding: 20px 0;
}
.emoji {
  position: absolute;
  z-index: 1000;
  right: 0px;
  top: 0px;
  transform: scale(0);
  transition: all 0.3s;
  &.active {
    transform: scale(1);
  }
}
::v-deep(.el-collapse-item__wrap) {
  overflow: visible;
}
</style>
