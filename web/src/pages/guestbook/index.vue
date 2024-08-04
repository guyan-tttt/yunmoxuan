<script setup lang="ts">
import TopView from "./components/TopView.vue"
import { ref, onMounted } from "vue"
import { type FormInstance, ElMessage } from "element-plus"
import { addGuestBookAPI, getGuestBookListAPI } from "@/api/web/guestbook"
import dayjs from "dayjs"
import type { GuestbookForm, GuestbookItem } from "@/types/web/guestbook"

// 表单数据
const guestbookForm = ref<GuestbookForm>({
  nickname: "",
  content: "",
  avatar: "",
  email: ""
})

// 表单校验
const rules = {
  nickname: [
    { required: true, message: "请输入昵称", trigger: "blur" },
    { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
  ],
  content: [
    { required: true, message: "请输入留言", trigger: "blur" },
    { min: 2, max: 100, message: "长度在 2 到 100 个字符", trigger: "blur" }
  ]
}

// 表单对象
const formRef = ref<FormInstance>(null)

// 表单提交
const submitForm = () => {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      const res = await addGuestBookAPI(guestbookForm.value)
      if (res.code === 200) {
        ElMessage.success("留言成功")
        resetForm()
      }
      console.log(guestbookForm.value)
    } else {
      console.log("error submit!")
      console.log(guestbookForm.value)
      return false
    }
  })
}

// 表单清空
const resetForm = () => {
  formRef.value?.resetFields()
  guestbookForm.value = {
    nickname: "",
    content: "",
    avatar: "",
    email: ""
  }
  pageData.value.page = 1
  getGuestbookList()
}
// 留言列表
const guestbookList = ref<GuestbookItem>([])

// 获取留言列表
const getGuestbookList = async () => {
  const res = await getGuestBookListAPI(pageData.value.page, pageData.value.pageSize)
  if (res.code === 200) {
    guestbookList.value = res.data
    pageData.value.total = res.total
    console.log(res.data);
    
  }
}

// 分页数据
const pageData = ref({
  page: 1,
  pageSize: 5,
  total: 0
})

// 页码切换
const changePage = (value: number) => {
  pageData.value.page = value
  getGuestbookList()
  
}
onMounted(() => {
  getGuestbookList()
})
</script>

<template>
  <div class="message">
    <!-- top -->
    <TopView name="message" title="留言板" msg="雪糕的甜味你有，九月清晨的完美你有，总之，我喜欢的样貌你都有" />

    <div class="message-wrap">
      <div class="content">
        <!-- 留言表单 -->
        <h2 style="margin-bottom: 20px">留言</h2>
        <el-form ref="formRef" :model="guestbookForm" :rules="rules" label-width="100px">
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="guestbookForm.nickname" placeholder="请输入昵称" />
          </el-form-item>
          <el-form-item label="留言" prop="content">
            <my-textarea v-model="guestbookForm.content" />
          </el-form-item>
          <el-form-item label="头像地址" prop="avatar">
            <el-input v-model="guestbookForm.avatar" placeholder="请输入头像地址" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="guestbookForm.email" placeholder="请输入邮箱" />
          </el-form-item>
        </el-form>

        <div style="text-align: right; margin-bottom: 20px">
          <el-button type="primary" @click="submitForm">发布</el-button>
        </div>

        <!-- 留言列表 -->
        <h2 style="padding: 20px 0; box-sizing: border-box; border-top: 2px solid #0bbd87">
          全部留言
          <span style="margin-left: 10px; color: #f2711c; font-weight: bold">{{ pageData.total }}</span>
        </h2>
        <!-- 父级评论 -->
        <div class="list" v-for="item in guestbookList" :key="item._id">
          <el-image class="avatar" v-if="item.avatar" :src="item.avatar" lazy fit="cover" />
          <span class="avatar" v-else>{{ item.nickname.substring(0, 1) }}</span>
          <div class="detail">
            <div class="top">
              <span class="name">{{ item.nickname }}</span>
              <span class="time">{{ dayjs(item.createTime).format("YYYY-MM-DD HH:mm") }}</span>
              <span class="os">{{ item.os || "未知" }}</span>
            </div>
            <div class="bottom">{{ item.content }}</div>
            <el-icon :size="30"><Comment /></el-icon>
          </div>
        </div>
        <div class="pagination">
          <el-pagination
            style="margin: 0"
            background
            layout="prev, pager, next"
            :total="pageData.total"
            v-model:page-size="pageData.pageSize"
            v-model:current-page="pageData.page"
            @current-change="changePage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
::v-deep(.el-textarea__inner) {
  height: 100%;
}

::v-deep(.el-button--text) {
  color: #0bbd87;
  font-weight: bold;
}

.message {
  width: 100%;
  height: auto;
  .message-wrap {
    width: 100%;
    height: auto;
    padding: 0 10%;
    box-sizing: border-box;
    opacity: 0.95;
    display: flex;
    flex-direction: column;
    position: relative;
    top: -60px;
    left: 0;
    transform: translateY(400px);

    .content {
      width: 80%;
      height: auto;
      margin: 0 auto 30px auto;
      padding: 30px;
      box-sizing: border-box;
      border-radius: 5px;
      border: 1px solid #eaeefb;
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      text-align: left;

      .list {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 5px;
        height: auto;
        display: flex;
        justify-content: flex-start;
        flex-flow: row nowrap;
        margin-bottom: 20px;
        height: 100px;
        background: linear-gradient(90deg, #e0c3f3 0%, #8ec5fc 100%);
        position: relative;
        &:hover {
          transform: translateY(-10px);
          transition: all 0.3s ease;
          box-shadow: inset 0px -15px 20px -15px rgba(169, 102, 245, 0.3);
          &::after {
            clip-path: circle(300% at 97% 62%);
          }
          .detail .el-icon {
            transform: translateY(-100%) scale(1);
          }
          .detail {
            filter: saturate(1.5) brightness(1.5);
          }
        }
        &::after {
          content: "";
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background: rgba(169, 102, 245, 0.1);
          border-radius: 5px;
          z-index: 2;
          clip-path: circle(0% at 97% 62%);
          transition: all 0.5s ease;
        }
        .avatar {
          height: 90px;
          width: 90px;
          border-radius: 50%;
          // vertical-align: middle;
          // max-width: 100%;
          border: 5px solid #fff;
          box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
          position: absolute;
          top: -30px;
          left: 20px;
          text-align: center;
          line-height: 80px;
          font-size: 30px;
          background-color: #e0c3f3;
          color: #fff;
          font-weight: 700;
        }

        .detail {
          width: 100%;
          padding: 0 10px;
          box-sizing: border-box;
          margin-left: 100px;
          transition: all 0.3s ease;
          .top {
            margin-bottom: 10px;
            .name {
              font-weight: bold;
              margin-right: 10px;
              font-size: 20px;
              color: #fff;
              text-shadow: hoff voff blur #000;
            }
            .time {
              font-size: 16px;
              color: #fff;
            }
            .os {
              font-size: 16px;
              color: #fff;
              margin-left: 10px;
            }
          }
          .bottom {
            font-size: 18px;
            color: #fff;
            text-shadow: 0px 2px 12px #000;
            margin-top: 20px;
          }
          .el-icon {
            float: right;
            transform: translateY(-100%) scale(0);
            color: rgb(77, 201, 87);
            box-shadow: 0px 2px 12px #fff;
            border-radius: 50%;
            padding: 5px;
            transition: all 0.3s ease;
            background-color: #fff;
          }
        }
      }
      .pagination {
        display: flex;
        justify-content: center;
      }
    }
  }
}
::v-deep(.is-active) {
  background-color: #e0c3f3 !important;
}
::v-deep(.number) {
  border-radius: 5px;
}
</style>
