<script lang="ts" setup>
import { ref, defineProps } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import dayjs from "dayjs"
import { getCommentListAPI, addCommentAPI, deleteCommentAPI } from "@/api/admin/trends"

// 接受父组件数据
const props = defineProps<{
  data: any
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
  }
}

// 评论表单
const commentForm = ref({
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
  const res = await getCommentListAPI(1, 5, props.data._id)
  if (res.code == 200) {
    commentList.value = res.data
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

// 评论列表
const commentList = ref<any[]>([])
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
        <el-button style="margin-top: 10px" type="primary" size="small" @click="submitComment">发布</el-button>
        <el-button style="margin-top: 10px" type="danger" size="small" @click="clearComment">清除</el-button>
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

          <el-button class="more">加载更多...</el-button>
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
</style>
