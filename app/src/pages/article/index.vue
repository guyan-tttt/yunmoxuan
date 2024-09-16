<template>
    <view class="article">
        <ArticleBanner/>
        <ArticleList/>
    </view>
</template>

<script setup>
import ArticleBanner from "./components/Banner.vue"
import ArticleList from "./components/ArticleCategory"
</script>

<style scoped lang="scss">
.article {
    padding-top: 20rpx;
    width: 700rpx;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    gap: 20rpx;

}
</style>