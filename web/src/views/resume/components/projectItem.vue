<template>
  <div class="item">
    <div class="top">
      <div class="name">
        <img
          src="https://haowallpaper.com/link/common/file/getCroppingImg/786d50481e9c29b09d0ced4c83ca67f0786d50481e9c29b09d0ced4c83ca67f0"
          alt=""
        />云墨轩（个人博客系统 + 小程序）
      </div>
      <div class="time">2024~至今</div>
    </div>
    <div class="link">
      <div class="name">🧬 项目链接</div>
      <a href="">云墨轩</a>
    </div>
    <div class="tech">
      <div class="title">⚔ 技术栈</div>
      <div class="item-tech" v-for="item in 3" :key="item">
        <div class="label">♦ 前端</div>
        <div class="value">Vue3 + TypeScript + Pinia + axios + 宝塔nginx部署</div>
      </div>
    </div>
    <div class="desc">
      开发阶段: \n 项目集成使用v-md-editor 与tudown 来实现markdown文档的编辑与逆解析。 项目使用UnoCss原子化来解决页面样式快速搭建。
      使用WebSocrket实现前后端即时通信与管理端通知接受。 后端使用multer实现文件上传捕获保存。 前端使用高德地图api获取用户地理信息。
      Web网站移动端部分功能适配。 使用highlight.js实现代码块高亮显示。 采用Mongoose 操作数据库。
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.item {
  width: 100%;
  margin-top: 20px;
  width: 100%;
  background-image: url(https://haowallpaper.com/link/common/file/getCroppingImg/786d50481e9c29b09d0ced4c83ca67f0786d50481e9c29b09d0ced4c83ca67f0);
  color: #fff;
  padding: 20px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  border: 2px solid #f8f8f8;
  box-shadow: 4px 4px 10px #000;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name {
      font-size: 26px;
      text-shadow: 5px -5px 10px #000;
      font-weight: 700;
      display: flex;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        margin-right: 10px;
        border-radius: 50%;
        box-shadow: inset 0px -15px 30px #000;
      }
    }
    .time {
      font-size: 16px;
      text-shadow: 5px -5px 10px #000;
    }
  }
  .link {
    display: flex;
    margin-top: 10px;
    .name {
      font-size: 16px;
      text-shadow: 5px -5px 10px #000;
      font-weight: 700;
    }
    a {
      color: var(--primary-color);
      margin-left: 20px;
      font-weight: 700;
    }
  }
  .tech {
    width: 100%;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 20px;
      text-shadow: 5px -5px 10px #000;
      margin-top: 20px;
      font-weight: 700;
    }
    .item-tech {
      display: flex;
      color: #f8f8f8;
      .label {
        font-size: 16px;
        text-shadow: 5px -5px 10px #000;
        margin-right: 20px;
      }
      .value {
        font-size: 18px;
      }
    }
  }
  .desc {
    font-size: 16px;
    text-shadow: 5px -5px 10px #000;
    margin-top: 20px;
  }
}
</style>
