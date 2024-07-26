<template>
  <el-card class="animate__fadeInUp animate__animated">
    <div class="personal-info">
      <div class="header">
        <el-avatar :src="props.data?.avatar" alt="Avatar" class="avatar" />
        <h2 class="nickname">
          {{ props.data?.nickname
          }}<SvgIcon :name="props.data?.gender === 1 ? 'boy' : 'girl'" style="width: 30px; height: 30px" />
        </h2>
      </div>
      <div class="content">
        <div class="profile">
          <h3>基本信息</h3>
          <ul class="info-list">
            <li>
              性别: {{ props.data?.gender === 1 ? "男" : "女" }}
              <SvgIcon :name="props.data?.gender === 1 ? 'boy' : 'girl'" />
            </li>
            <li>年龄: 20</li>
            <li>电话:{{ props.data?.phone }}</li>
            <li>邮箱: {{ props.data?.email }}</li>
            <li>爱好: <el-tag type="primary">围棋</el-tag><el-tag type="success">竹笛</el-tag></li>
            <li>性格: <el-tag type="primary">积极友善</el-tag><el-tag type="success">乐观开朗</el-tag></li>
            <li>标签: <el-tag type="primary">学生</el-tag><el-tag type="success">前端开发</el-tag></li>
          </ul>
        </div>
        <div class="skills">
          <h3>技术栈</h3>
          <div type="success" class="item" v-for="item in 5" :key="item">
            <el-image
              style="width: 20px; height: 20px"
              src="http://localhost:3000/images/tags/57265e016c5b4e65fab81d2037e37787.svg"
              fit="fill"
            />
            <span>HTML</span>
          </div>
        </div>
        <div class="motto">
          <h3>个人简介</h3>
          <p>{{ props.data?.introduction || "这个人很懒，什么都没有留下" }}</p>
        </div>
        <div class="github">
          <h3>关于我的</h3>
          <ul class="info-list">
            <li>
              github: <a class="github-link" :href="props.data?.github" target="_blank">{{ props.data?.github }}</a>
            </li>
            <li>
              gitee: <a class="github-link" :href="props.data?.gitee" target="_blank">{{ props.data?.gitee }}</a>
            </li>
            <li>
              csdn: <a class="github-link" :href="props.data?.csdn" target="_blank">{{ props.data?.csdn }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import type { UserInfo } from "@/types/admin/user"

// 接收父组件数据
const props = defineProps<{ data: UserInfo }>()
</script>

<style scoped lang="scss">
.personal-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f4;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  .nickname {
    display: flex;
    align-items: center;
    color: #000;
  }
}

.avatar {
  width: 150px;
  height: 150px;
  border: 4px solid var(--el-card-bg-color);
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.skills {
  padding: 0;
  .item {
    margin-top: 10px;
    width: 100px;
    height: 30px;
    display: inline-flex;
    font-weight: normal;
    line-height: 30px;
    font-size: 14px;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
    background-color: #ecf5ff;
    border-radius: 4px;
    span {
      margin-left: 10px;
      color: #409eff;
    }
  }
}
.content {
  width: 100%;
  background: var(--el-card-bg-color);
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.info-card,
.github-card,
.motto-card,
.bio-card {
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
  background: #e9ecef;
}

.info-list {
  list-style: none;
  padding: 0;
}

.info-list li {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.github-link {
  display: inline-block;
  margin-top: 10px;
  color: #333;
  background-color: #f8f9fa;
  padding: 8px 15px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.github-link:hover {
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
}

.motto-text,
.bio-text {
  font-size: 30px;
  line-height: 1.6;
  color: #495057;
}

@media (min-width: 768px) {
  .personal-info {
    flex-direction: row;
    justify-content: space-between;
  }

  .header {
    width: 200px;
  }

  .content {
    margin-left: 50px;
    flex: 1;
  }

  .content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}
</style>
