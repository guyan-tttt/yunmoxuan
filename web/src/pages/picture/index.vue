<template>
  <div class="picture">
    <div class="head">
      <div class="title">个人相册</div>
      <div class="desc">人生最大的风险就是不冒任何风险！</div>
    </div>
    <el-card class="container mx-auto max-w-screen-xl mt-5">
      <router-view />
    </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.picture {
  width: 100%;
  min-height: calc(100vh - 137px - 55px - 60px);
  .head {
    background-image: url(../../assets/picture/pricture-bg.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    height: 300px;
    width: 100%;
    background-position: 0 -475px;
    border-radius: 0 0 20px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title {
      color: #fff;
      text-align: center;
      text-shadow: 0 0.1875rem 0.3125rem #1c1f21;
      letter-spacing: 2px;
      font-size: 35px;
      margin-bottom: 15px;
      font-weight: 700;
    }
    .desc {
      @extend .title;
      font-size: 18px;
    }
  }
}
</style>
