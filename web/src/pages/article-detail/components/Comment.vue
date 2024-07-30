<script setup lang="ts">
import { useWebInfoStore } from "@/store/modules/webInfo"
import { onUnmounted, defineProps, onMounted, ref } from "vue"
import { getCommentListAPI } from "@/api/web/article"
import type { ArticleCommentItem } from "@/types/web/article"

// 前台全局仓库
const webInfoStore = useWebInfoStore()

// 添加评论
const addComment = () => {
  // console.log('adsa');
  
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
  const res = await getCommentListAPI(props.id, 1, 5)
  console.log(res)
  if (res.code === 200) {
    commentList.value = res.data
  }
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
        <ul class="list">
          <li class="item" v-for="item in commentList" :key="item._id">
            <div class="info">
              <span class="name">{{ item.nickname }}</span>
              <span class="ip"
                ><i>IP:{{ item.address }}</i></span
              >
              <span class="time">{{ item.time }}</span>
            </div>

            <div class="content">{{ item.content }}</div>
            <div class="del">
              <el-icon :size="20" color="#E73037"><CircleCloseFilled /></el-icon>
            </div>
          </li>

          <el-row style="width: 100%" justify="center">
            <el-button class="more" @click.stop="addComment">添加评论</el-button>
            <div class="no-comment">没有更多了~</div>
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
