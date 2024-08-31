<template>
  <article class="card" :style="{ backgroundImage: `url(${props.data.cover})` }">
    <div class="temporary_text">
      <div class="title">🌟{{ props.data.name }}</div>
      <span class="score">💫{{ props.data.score.toFixed(1) }}分</span>
    </div>
    <div class="card_content">
      <span class="card_title">
        <div class="title">{{ props.data.name }}</div>
        <div class="fire">🔥{{ props.data.hot }}</div>
        <div class="category">🔖{{ props.data.type }}</div>
      </span>
      <span class="card_subtitle" v-if="props.data.status === 0">自{{ props.data.remark }}起停更</span>
      <span class="card_subtitle" v-if="props.data.status === 1"
        >自{{ props.data.remark }}起VIP用户每周{{ dateList[new Date(props.data.remark).getDay()] }}10点更新1集</span
      >
      <span class="card_subtitle" v-if="props.data.status === 2">至{{ props.data.remark }}完结</span>
      <p class="card_description">📄{{ props.data.desc }}</p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { defineProps } from "vue"

const props = defineProps<{
  data: any
}>()

const dateList = ["日", "一", "二", "三", "四", "五", "六"]
</script>

<style lang="scss" scoped>
/* From Uiverse.io by eslam-hany */
/* From Uiverse.io by Kemboi-Dun */
.card {
  position: relative;
  width: 280px;
  height: 150px;
  color: #2e2d31;
  background: #131313;
  overflow: hidden;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  transition: all 0.25s;
  cursor: pointer;

  &:hover {
    height: 250px;
    .temporary_text {
      transform: translateY(30px);
    }
  }
}

.temporary_text {
  font-weight: bold;
  font-size: 30px;
  padding: 6px 12px;
  color: #fff;
  transform: translateY(50px);
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
  }
  .score {
    font-size: 12px;
    background-color: #409eff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    height: 25px;
    padding: 5px;
    margin-right: 20px;
  }
}

.card_title {
  display: flex;
  align-items: center;
  font-family: "KaiTi", sans-serif;
  .title {
    font-weight: bold;
    font-size: 18px;
  }
  .fire {
    font-size: 12px;
    margin-left: 5px;
  }
  .category {
    font-size: 12px;
    margin-left: 5px;
  }
}

.card_content {
  position: absolute;
  left: 0;
  bottom: 0;
  /* edit the width to fit card */
  width: 100%;
  padding: 20px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  /* edit here to change the height of the content box */
  transform: translateY(150px);
  transition: transform 0.25s;
  color: #fff;
}

.card_title {
  //   color: #131313;
  line-height: 15px;
}

.card_subtitle {
  display: block;
  font-size: 12px;
  margin-bottom: 10px;
  margin-top: 5px;
  padding-right: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card_description {
  opacity: 0;
  transition: opacity 0.5s;
  font-size: 12px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  text-overflow: ellipsis;
  // height: 30px;
  //   height: 100px;
  min-height: 50px;
}

.card:hover .card_content {
  transform: translateY(0);
}

.card:hover .card_description {
  opacity: 1;
  transition-delay: 0.25s;
}
</style>
