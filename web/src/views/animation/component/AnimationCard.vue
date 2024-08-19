<template>
  <article class="card">
    <div class="temporary_text">
      <div class="title">🌟完美世界</div>
      <span class="score">💫9.5分</span>
    </div>
    <div class="card_content">
      <span class="card_title">
        <div class="title">完美世界</div>
        <div class="fire">🔥19873</div>
        <div class="category">🔖3D</div>
      </span>
      <span class="card_subtitle">VIP用户每周五10点更新1集</span>
      <p class="card_description">
        本作动画生，为应劫而至，他身化亿万血雨，洒落万古岁月，经历无数时空的熬炼gddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd，岁月长河的洗礼，他化万古，他化自在。看男主石昊如何一生极致辉煌，造就无尽传说。
      </p>
    </div>
  </article>
</template>

<script setup></script>

<style lang="scss" scoped>
/* From Uiverse.io by eslam-hany */
/* From Uiverse.io by Kemboi-Dun */
.card {
  position: relative;
  width: 300px;
  height: 150px;
  color: #2e2d31;
  background: #131313;
  overflow: hidden;
  border-radius: 20px;
  background: url(https://www.4kbizhi.com/d/file/2024/07/01/small093702duOyt1719797822.jpg);
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
  margin-left: 24px;
  transition: all 0.25s;
  display: flex;
  justify-content: space-between;
  font-family: "KaiTi", sans-serif;
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
