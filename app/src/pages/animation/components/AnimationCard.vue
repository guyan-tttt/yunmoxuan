<template>
    <article class="card" :class="{active: show}" @click="show = !show" :style="{backgroundImage: `url(${props.data.cover})`}">
        <div class="temporary_text">
            <div class="title">{{ props.data.name }}</div>
            <span class="score">💫{{props.data.score}}分</span>
        </div>
        <div class="card_content">
            <span class="card_title">
                <div class="title">{{ props.data.name }}</div>
                <div class="fire">🔥{{ props.data.hot }}</div>
                <div class="category">🔖{{ props.data.type }}</div>
            </span>

            <span class="card_subtitle"
            >
                <text class="card_subtitle" v-if="props.data?.status === 0">自{{props.data?.remark }}起停更</text>
                <text class="card_subtitle"
                      v-if="props.data?.status === 1"
                >自{{ props.data?.remark }}起VIP用户每周{{ dateList[new Date(props.data?.remark).getDay()] }}10点更新1集</text
                >
                <text class="card_subtitle" v-if="props.data?.status === 2">至{{ props.data?.remark }}完结</text>
            </span
            >

            <p class="card_description">📄{{ props.data.desc }}</p>
        </div>
    </article>
</template>

<script setup >
import { ref } from "vue"
const dateList = ["日", "一", "二", "三", "四", "五", "六"]

const props = defineProps({
    data: {
        type: Object,
        default() {
            return {}
        }
    }
})
const show = ref(false)


</script>

  <style lang="scss" scoped>

  .card {
    position: relative;
    width: 700rpx;
    height: 300rpx;
    color: #2e2d31;
    background: #131313;
    overflow: hidden;
    border-radius: 40rpx;
    background-size: cover;
    background-position: center;
    box-shadow: 0 0 40rpx rgba(0, 0, 0, 0.2);
    transition: all 0.25s;

    cursor: pointer;
    margin: 10rpx 0;
    &.active {
      height: 500rpx;
      .temporary_text {
        transform: translateY(60rpx);
      }
    }
  }

  .temporary_text {
    font-weight: bold;
    font-size: 60rpx;
    padding: 12rpx 24rpx;
    color: #fff;
    transform: translateY(100rpx);
    // margin-left: 24px;
    transition: all 0.25s;
    display: flex;
    justify-content: space-between;
    font-family: "KaiTi", sans-serif;
    flex-wrap: nowrap;
    .title {
      flex: 1;
      text-align: center;
      // font-size: 25px;
      text-shadow: 0 0 10rpx #000;

    }
    .score {
      font-size: 24rpx;
      background-color: #409eff;
      border-radius: 20rpx;
      display: flex;
      align-items: center;
      height: 50rpx;
      padding: 10rpx;
      margin-right: 40rpx;
    }
  }

  .card_title {
    display: flex;
    align-items: center;
    font-family: "KaiTi", sans-serif;
    .title {
      font-weight: bold;
      font-size: 36rpx;
    }
    .fire {
      font-size: 24rpx;
      margin-left: 10rpx;
    }
    .category {
      font-size: 24rpx;
      margin-left: 10rpx;
    }
  }

  .card_content {
    width: 600rpx;
    position: absolute;
    left: 0;
    bottom: 0;
    /* edit the width to fit card */
    width: 100%;
    padding: 40rpx;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 40rpx;
    /* edit here to change the height of the content box */
    transform: translateY(300rpx);
    transition: transform 0.25s;
    color: #fff;
  }

  .card_title {
    //   color: #131313;
    line-height: 30rpx;
  }

  .card_subtitle {
    display: block;
    font-size: 24rpx;
    margin-bottom: 20rpx;
    margin-top: 10rpx;
    padding-right: 40rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card_description {
    opacity: 0;
    transition: opacity 0.5s;
    font-size: 24rpx;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    text-overflow: ellipsis;
    // height: 30px;
    //   height: 100px;
    min-height: 100rpx;
    max-width: 600rpx !important;
    box-sizing: border-box;
  }

  .card.active .card_content {
    transform: translateY(0);
  }

  .card.active .card_description {
    opacity: 1;
    transition-delay: 0.25s;
  }
  </style>
