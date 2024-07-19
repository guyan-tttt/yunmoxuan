<script lang="ts" setup>
import { ref } from "vue"

// 折叠面板显示
const activeNames = ref(0)

// 打开评论列表
const openComment = () => {
  activeNames.value = activeNames.value ? 0 : 1
}
</script>

<template>
  <div class="comment">
    <el-collapse @change="openComment" v-model="activeNames">
      <el-collapse-item title="评论区" :name="1">
        <ul class="list">
          <li class="item" v-for="item in 6" :key="item">
            <div class="info">
              <span class="name">小六子</span>
              <span class="ip"><i>IP:广东</i></span>
              <span class="time">2021-05-31 14:08</span>
            </div>

            <div class="content">"大自然的美，总是让人心旷神怡。"</div>
            <div class="del">
              <el-icon :size="20" color="#E73037"><CircleCloseFilled /></el-icon>
            </div>
          </li>
        </ul>
        <!-- 新增功能： -->
        <el-input
          style="background-image: url(../../../assets/layouts/logo.png)"
          type="textarea"
          placeholder="期待能留下足迹~~ ✨ ✨ ✨"
          maxlength="100"
          show-word-limit
        />
        <el-button style="margin-top: 10px" type="primary" size="small">发布</el-button>
        <el-button style="margin-top: 10px" type="danger" size="small">清除</el-button>
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
        transition: all 1s;
        border-radius: 10px;
        cursor: pointer;
        .el-icon {
          position: absolute;
          right: 3%;
          bottom: 15%;
          transform: scale(0);
          transition: all 0.9s;
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
</style>
