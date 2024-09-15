<template>
    <view class="nav-list">
        <view class="nav-item" v-for="(item, index) in navdata" :key="index">
            <view class="icon"><text class="iconfont" :class="item.icon"/></view>
            <text class="text">{{ item.text }}</text>
        </view>
    </view>
</template>

<script setup>
const navdata = [
    {
        icon: "icon-wenzhang2",
        text: "博文",
        link: ""
    },
    {
        icon: "icon-xiangce",
        text: "相册",
        link: ""
    },
    {
        icon: "icon-pengyouquan",
        text: "动态",
        link: ""
    },
    {
        icon: "icon-liuyan",
        text: "留言",
        link: ""
    },
    {
        icon: "icon-ziliaoshouce",
        text: "资料",
        link: ""
    },
    {
        icon: "icon-pc-dongman",
        text: "追番",
        link: ""
    },

]
</script>

<style lang="scss" scoped>
.nav-list {
    width: 700rpx;
    height: 300rpx;
    border-radius: 12px;
    background-color: rgba(255,255,255,1);
    box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.4);
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10rpx;
    padding-top: 20rpx;
    .nav-item {
        width: 100%;
        height: 150rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        .icon {
            width: 80rpx;
            height: 80rpx;
            border-radius: 8px;
            background-color: rgba(255,255,255,1);
            box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.4);
            display: flex;
            justify-content: center;
            align-items: center;
            text {
                font-size: 48rpx;
                color: rgba(64,158,255,1);
            }
        }
        &>text {
            color: rgba(64,158,255,1);
            font-size: 13px;
            text-align: left;
            font-family: FZKai-regular;
            margin-top: 10rpx;
        }
    }
}
</style>