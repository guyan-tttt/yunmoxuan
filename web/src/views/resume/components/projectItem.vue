<template>
  <div
    class="item"
    :style="{
      backgroundImage: `url(${props.data.bgImg})`
    }"
  >
    <div class="top">
      <div class="name"><img :src="props.data.logo" alt="" />{{ props.data.name }}</div>
      <div class="time">{{ dayjs(props.data.start_time).format("YYYY-MM") }} ~ {{ dayjs(props.data.end_time).format("YYYY-MM") }}</div>
    </div>
    <div class="link" v-if="props.data.link">
      <div class="name">🧬 项目链接</div>
      <a :href="props.data.link">{{ props.data.link }}</a>
    </div>

    <div class="desc">
      {{ props.data.desc }}
    </div>
    <div class="tech" v-html="props.data.content" />
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs"

const props = defineProps<{
  data: any
}>()
</script>

<style scoped lang="scss">
.item {
  width: 100%;
  margin-top: 20px;
  width: 100%;
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
  ::v-deep(.tech) {
    width: 100%;
    color: #333 !important;
  }
  .desc {
    font-size: 16px;
    text-shadow: 5px -5px 10px #000;
    margin-top: 20px;
  }
}
</style>
