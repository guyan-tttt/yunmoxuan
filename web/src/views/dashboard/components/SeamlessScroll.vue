<template>
  <vue3-seamless-scroll :list="listData" :step="0.5" class="scroll">
    <div class="information-list">
      <div class="information-list-item" v-for="item in listData" :key="item.title">
        <el-icon :size="35"><ChromeFilled /></el-icon>
        <div>
          <p><span class="col">朱继柳</span> 发布了评论{{ item.title }}</p>
          <p>2018-07-21 15:21:38 <i>IP: 北京·海淀</i></p>
        </div>
      </div>
      <div class="information-list-item">
        <el-icon :size="35"><ChromeFilled /></el-icon>
        <div>
          <p><span class="col">朱继柳</span> 发布了评论 第1期“scscscsc论获奖名单公布“</p>
          <p>2018-07-21 15:21:38 <i>IP: 北京·海淀</i></p>
        </div>
      </div>
    </div>
  </vue3-seamless-scroll>
</template>

<script setup lang="ts">
import { ref } from "vue"
const listData = ref([
  {
    title: "无缝滚动第一行无缝滚动第一行"
  },
  {
    title: "无缝滚动第二行无缝滚动第二行"
  },
  {
    title: "无缝滚动第三行无缝滚动第三行"
  },
  {
    title: "无缝滚动第四行无缝滚动第四行"
  },
  {
    title: "无缝滚动第五行无缝滚动第五行"
  },
  {
    title: "无缝滚动第六行无缝滚动第六行"
  },
  {
    title: "无缝滚动第七行无缝滚动第七行"
  },
  {
    title: "无缝滚动第二行无缝滚动第二行"
  },
  {
    title: "无缝滚动第三行无缝滚动第三行"
  },
  {
    title: "无缝滚动第四行无缝滚动第四行"
  },
  {
    title: "无缝滚动第五行无缝滚动第五行"
  },
  {
    title: "无缝滚动第六行无缝滚动第六行"
  },
  {
    title: "无缝滚动第七行无缝滚动第七行"
  }
])
</script>

<style scoped lang="scss">
.scroll {
  width: 100%;
  height: 600px;
  overflow: hidden;
  margin: 10px;
}
.information-list {
  margin-top: 20px;
  .information-list-item {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 15px 0;
    div {
      width: 100%;
      margin-left: 10px;
      p {
        font-size: 14px;
        margin: 5px 0;
        span {
          color: #6cb5fd;
          font-weight: 700;
        }
        i {
          margin-left: 40px;
          font-size: 12px;
          color: #999;
        }
      }
    }
    .col {
    }
    div :nth-child(2) {
      font-size: 14px;
    }
  }
}
</style>
