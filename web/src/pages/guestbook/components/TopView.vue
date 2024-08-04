<template>
  <div class="top">
    <div class="content">
      <h1 class="title">{{ title }}</h1>
      <div class="msg">{{ msg }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TopView",
  props: {
    name: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    msg: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      bg: ""
    }
  },
  created() {}
}
</script>
<style lang="scss" scoped>
.top {
  width: 100vw;
  height: 100vh;
  position: fixed;
  overflow: hidden;
  background-image: url(../../../assets/guestbook/guestbook-bg.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  .el-image {
    width: 100%;
    height: 100%;
    position: relative;
    vertical-align: middle;
    max-width: 100%;
  }

  .content {
    width: 100%;
    height: 450px;
    background-color: rgba(0, 0, 0, 0.1);
    padding-top: 140px;
    box-sizing: border-box;
    position: absolute;
    left: 0px;
    top: 0px;
    color: #fff;
    font-family: "STXingkai";
    letter-spacing: 2px;

    .title {
      width: 60%;
      height: 100px;
      font-size: 50px;
      margin: 0 auto;
      text-align: center;
    }

    .msg {
      font-size: 24px;
      width: 60%;
      height: 40px;
      line-height: 40px;
      margin: 0 auto;
      margin-top: 30px;
      text-align: center;
    }
  }
}
</style>
