<script setup lang="ts">
import { useWebInfoStore } from "@/store/modules/webInfo"
import { onUnmounted, defineProps, onMounted, ref, watch, nextTick } from "vue"
import { getCommentListAPI } from "@/api/web/article"
import type { ArticleCommentItem } from "@/types/web/article"
import { useSettingsStore } from "@/store/modules/settings"

// 前台全局仓库
const webInfoStore = useWebInfoStore()

const settingsStore = useSettingsStore()

// 添加评论
const addComment = () => {
  console.log(props.id)

  webInfoStore.openComment(true, props.id)
}

// 接受父组件传递过来的数据
const props = defineProps<{
  id: string
}>()

// 评论列表
const commentList = ref<ArticleCommentItem[]>([])

// 获取评论列表
const getCommentList = async () => {
  commentLoading.value = true
  const res = await getCommentListAPI(props.id, pageData.value.page, pageData.value.pageSize)
  console.log(res)
  if (res.code === 200) {
    commentList.value = commentList.value.concat(res.data)
    pageData.value.total = res.total
    commentLoading.value = false
  }
}

// 监听仓库中文章评论是否需要刷新
watch(
  () => webInfoStore.refreshComment,
  () => {
    if (webInfoStore.refreshComment) {
      commentList.value = []
      pageData.value.page = 1
      getCommentList()
      nextTick(() => {
        webInfoStore.refreshComment = false
      })
    }
  }
)

// 分页数据
const pageData = ref({
  page: 1,
  pageSize: 5,
  total: 0
})

// 评论区加载
const commentLoading = ref<boolean>(false)

// 加载下一页评论
const loadMore = () => {
  pageData.value.page++
  getCommentList()
}

onMounted(() => {
  getCommentList()
})
onUnmounted(() => {
  webInfoStore.openComment(false)
})
</script>
<template>
  <div class="comment">
    <el-collapse>
      <el-collapse-item title="评论区" :name="1">
        <ul class="list" v-loading="commentLoading">
          <li class="item" v-for="item in commentList" :key="item._id">
            <div class="info">
              <span class="name">{{ item.nickname }}</span>
              <span class="ip"
                ><i>IP:{{ item.address || "未知" }}</i></span
              >
              <span class="time">{{ item.time }}</span>
            </div>

            <div class="content">{{ item.content }}</div>
            <div class="del">
              <!-- <el-icon size="20" color="#67c23a"><Comment /></el-icon> -->
            </div>
          </li>

          <el-row style="width: 100%" justify="center">
            <el-button v-if="commentList.length < pageData.total" class="ladomore" @click.stop="loadMore">加载更多</el-button>
            <div v-else class="no-comment">没有更多了~</div>
            <el-button v-if="!settingsStore.isMobile" class="more" type="primary" @click.stop="addComment">添加评论</el-button>
          </el-row>
        </ul>

        <!-- <div class="no-comment">暂无评论</div> -->
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
      padding: 10px;
      border-bottom: 1px solid #efefef;
      position: relative;
      .info {
        .name {
          font-size: 0.7em;
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
  color: #fff;
  text-align: center;
  padding: 20px 0;
  margin-top: 20px;
}
::v-deep(.el-button + .el-button) {
  margin-left: 0px;
}
.ladomore {
  @extend .more;
  color: #999;
  margin-top: 0;
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
