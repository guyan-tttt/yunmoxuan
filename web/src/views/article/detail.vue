<script setup lang="ts">
import { getArticleDetailAPI } from "@/api/admin/article"
import { useRoute } from "vue-router"
import { ref, onMounted } from "vue"
import type { ArticleItem } from "@/types/admin/article"
import dayjs from "dayjs"
import { useRouter } from "vue-router"

// 页面路由对象
const route = useRoute()

// 全局路由对象
const router = useRouter()

// 文章详情
const articleDetail = ref<ArticleItem>()

// 获取文章详情
const getArticleDetail = async () => {
  const res = await getArticleDetailAPI(route.query.id as string)
  articleDetail.value = res.data
  articleDetail.value.updateTime = dayjs(res.data?.updateTime).format("YYYY-MM-DD HH:mm")
  console.log(res)

  // 渲染文章内容
}

// 返回
const back = () => {
  router.back()
}

// 初始化
onMounted(() => {
  getArticleDetail()
})
</script>
<template>
  <div class="detail">
    <el-card style="max-width: 900px" v-if="articleDetail?._id">
      <template #header>
        <div class="card-header">
          <div class="name">
            {{ articleDetail.title }} <span>原创</span>
            <div class="back" @click="back">返回</div>
          </div>
          <div class="info">
            <div class="role">
              <div class="author">
                <el-icon size="18"><User /></el-icon>{{ articleDetail?.aboutInfo?.author }}
              </div>
              <div class="date">
                <el-icon size="18"><Timer /></el-icon>{{ articleDetail?.updateTime }}
              </div>
            </div>
            <div class="publish">
              <el-check-tag v-if="articleDetail.isPublish" :checked="true" type="success">已发布</el-check-tag>
              <el-check-tag v-else type="info" effect="dark">草稿</el-check-tag>
            </div>
          </div>
          <div class="about">
            <div class="category">
              文章分类：
              <el-tag type="primary" effect="dark" round>
                {{ articleDetail.aboutInfo.category.name }}
              </el-tag>
            </div>
            <div class="tag">
              文章标签：
              <div class="item" v-for="item in articleDetail.aboutInfo.tags" :key="item._id">
                <el-image style="width: 20px; height: 20px" :src="item.icon" fit="fill" />
                <span>{{ item.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>
      <p v-html="articleDetail.content" class="content" />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.detail {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .el-card {
    width: 80%;
    .card-header {
      .name {
        font-size: 30px;
        font-weight: 700;
        display: flex;
        align-items: center;
        position: relative;
        .back {
          position: absolute;
          right: 10px;
          top: 10px;
          font-size: 16px;
          color: #666;
          &:hover {
            color: #409eff;
            cursor: pointer;
          }
        }
        span {
          width: 46px;
          height: 23px;
          font-size: 12px;
          background-color: #f79408;
          text-align: center;
          display: flex;
          border-radius: 8px;
          justify-content: center;
          align-items: center;
          padding: 5px;
          color: #fff;
          margin-left: 20px;
          box-shadow: 0 0 10px #f79408;
        }
      }
      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .role {
          margin-top: 10px;
          .author {
            font-size: 16px;
            color: #666;
            .el-icon {
              margin-right: 10px;
            }
          }
          .date {
            margin-top: 10px;
            font-size: 14px;
            color: #999;
            .el-icon {
              margin-right: 10px;
            }
          }
        }
      }
      .about {
        width: 100%;
        display: flex;
        align-items: center;
        margin-top: 10px;
        .category {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #666;
          .el-tag {
            font-weight: normal;
          }
        }
        .tag {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #666;
          margin-left: 80px;
          .item {
            display: flex;
            align-items: center;
            font-weight: normal;
            font-size: 14px;
            margin-left: 20px;
            span {
              margin-left: 10px;
            }
          }
        }
      }
    }
    .content {
      margin: 0 20px;
      ::v-deep(img) {
        width: 100%;
      }
      ::v-deep(a) {
        color: #409eff;
      }
      ::v-deep(pre) {
        padding: 20px;
        border-radius: 8px;
        overflow-x: auto;
      }
    }
  }
}
</style>
