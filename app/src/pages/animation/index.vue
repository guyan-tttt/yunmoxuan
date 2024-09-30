<template>
    <div class="animation">
        <uni-swipe-action class="list">
            <!-- 基础用法 -->
            <uni-swipe-action-item  v-for="item in 10"
                                    :key="item"
                                    @click="onClick"
                                    @change="change">
                <AnimationCard />
                <template #right>
                    <text class="iconfont icon-xiangce"/>
                </template>
            </uni-swipe-action-item>
        </uni-swipe-action>


    </div>
</template>

<script setup>
import AnimationCard from "./components/AnimationCard.vue"

const options = [
    {
        text: "更多 >",
        style: {
            backgroundColor: "transparent",
            color: "#909399",
            fontSize: "40px"

        }
    },
]
</script>

<style scoped lang="scss">
.animation {
    width: 700rpx;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    ::v-deep(.list) {
        width: 100%;
        margin-top: 20rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20rpx;
        .iconfont {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 100rpx;
            margin-left: 20rpx;
            color: #409eff;
            margin-right: 20rpx;
        }
    }
}
</style>