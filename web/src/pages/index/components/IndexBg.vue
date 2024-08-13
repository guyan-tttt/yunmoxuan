<template>
  <div>
    <div class="index-bg" />
  </div>
</template>

<script setup lang="ts" />

<style scoped lang="scss">
.index-bg {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  background: url(https://cdn.pixabay.com/photo/2023/03/29/02/59/woman-7884470_1280.jpg) no-repeat;
  background-size: cover;
  transition: all 0.5s;
}
</style>
