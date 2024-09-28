<template>
    <div class="source">
        <div class="bg">
            <image
                src="../../static/source/picture-bg.jpeg"
                mode="widthFix"
            />
        </div>
        <div class="content">

            <div class="item" v-for="item in 3" :key="item">
                <div class="info">
                    <image class="icon"/>
                    <div class="title">前端开发</div>
                    <div class="desc">————得得得</div>
                </div>
                <div class="list">
                    <SourceCard type="web" v-for="i in 3" :key="i" :data="i" />
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import SourceCard from "./components/SourceCard.vue"
</script>

<style scoped lang="scss">
.source {
    width: 700rpx;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .bg {
        width: 100%;
        image {
            width: 100%;
            border-radius: 0 0 20rpx 20rpx;
            box-shadow: 0 0 10rpx #000;
        }
    }
    .content {
        width: 100%;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        border-radius: 20rpx;
        box-shadow: 0 10rpx 10prx #000;
        margin-top: 20rpx;
        .item {
            width: 100%;
            margin: 20rpx 0;
            padding: 0 20rpx;
            .list {
                display: flex;
                flex-wrap: wrap;
                gap: 40rpx;
            }
            .info {
                display: flex;
                align-items: center;
                padding-left: 10rpx;
                margin: 20rpx 0;
                position: relative;

                &::after {
                    content: "";
                    width: 10rpx;
                    height: 80rpx;
                    background-color: #699ff0;
                    position: absolute;
                    left: -10rpx;
                    top: 10rpx;
                    border-radius: 30rpx;
                }
            .title {
                font-size: 30rpx;
                margin-left: 5rpx;
            }
            .icon {
                margin-right: 10rpx;
                box-shadow: 0 0 10rpx #699ff0;
                width: 100rpx;
                height: 100rpx;
                border-radius: 50%;
            }
            .desc {
                font-size: 26rpx;
                color: #999;
            }
            }
        }

    }
}
</style>