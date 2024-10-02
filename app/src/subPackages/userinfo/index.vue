<template>
    <div class="userinfo">

        <view class="header">
            <div class="section">
                <uni-section titleFontSize="20px"  title="个人简介"  type="line"/>
            </div>
            <div class="top">
                <view class="left">
                    <image
                        :src="userStore.userInfo.avatar"
                        mode="scaleToFill"
                    />
                    <view class="name">
                        <text class="iconfont icon-nan"/>
                        <view class="name-text">
                            {{ userStore.userInfo.nickname }}
                        </view>

                    </view>
                </view>
                <view class="right">
                    <view class="gender">性别：{{ userStore.userInfo.gender === 1 ? "男" : "女 "}}</view>
                    <view class="age">年龄： 20</view>
                    <view class="phone">电话：{{ userStore.userInfo.phone }}</view>
                    <view class="email">邮箱： {{ userStore.userInfo.email }}</view>
                </view>
            </div>
            <view class="desc">
                {{ userStore.userInfo.introduction }}
            </view>
        </view>

        <view class="web" @click="copyLinkWeb">
            <div class="section">
                <uni-section titleFontSize="20px"  title="个人网站"  type="line"/>
            </div>
            <div class="content">
                <view class="img">
                    <image
                        src="../../static/favicon.ico"
                        mode="widthFix"
                    />
                </view>
                <view class="info">
                    <view class="name">云墨轩</view>
                    <view class="desc">个人博客网站</view>
                </view>
            </div>
        </view>

        <view class="wx" @click="previewWX">
            <div class="section">
                <uni-section titleFontSize="20px"  title="微信公众号"  type="line"/>
            </div>
            <image
                src="http://jeek-space-blog.top/static/offical-account-2-M3UK4b_i.png"
                mode="widthFix"
            />
        </view>
        <view class="tags">
            <div class="section">
                <uni-section titleFontSize="20px"  title="技术栈"  type="line"/>
            </div>
            <view class="content">
                <view class="item" v-for="item in tagsList" :key="item._id">
                    <image
                        :src="item.icon"
                        mode="widthFix"
                    />
                    <text>{{ item.name }}</text>
                </view>
            </view>
        </view>
        <view class="web">
            <div class="section">
                <uni-section titleFontSize="20px"  title="相关链接"  type="line"/>
            </div>
            <div class="list">
                <div class="item" >
                    <div class="name">github</div>
                    <div>{{ userStore.userInfo.github }}</div>
                </div>
                <div class="item" >
                    <div class="name">gitee</div>
                    <div>{{ userStore.userInfo.gitee }}</div>
                </div>
                <div class="item" >
                    <div class="name">csdn</div>
                    <div>{{ userStore.userInfo.csdn }}</div>
                </div>
            </div>
        </view>
    </div>
</template>

<script setup>
import { useUserStore } from "@/store"
import { getTagListAPI } from "@/api/category"
import { ref ,onMounted } from "vue"

const webLink = ref("http://jeek-space.top")
const wxCode = ref("https://jeek-space-blog.top:3000/images/wx/wx-code.jpg")
const userStore = useUserStore()
// 标签
const tagsList = ref([])
const getTagList = async() => {
    const res = await getTagListAPI()
    if(res.code === 200) {
        tagsList.value = res.data
    }
}

// 复制网页
const copyLinkWeb = () => {
    uni.setClipboardData({
        data: webLink.value,
        success() {
            uni.showToast({
                title: "链接复制成功，请前往浏览器打开！",
                icon:"none"
            })
        }
    })
}
const previewWX = () => {
    // #ifdef MP-ALIPAY
    my.previewImage({
        urls: [wxCode.value],
        enableSavePhoto: true,
        enableShowPhotoDownload: true,
    })
    // #endif
}
onMounted(() => {
    getTagList()

})

</script>

<style scoped lang="scss">
.userinfo {
    width: 700rpx;
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 20rpx auto;
    margin-bottom: 40rpx;
    .section {
        width: 700rpx !important;
        border-radius: 20rpx;
        box-sizing: border-box;
        padding: 0 20rpx;
        ::v-deep(.uni-section) {
            background-color: #fff;
        }
    }
    .header {
        width: 100%;
        display: flex;
       flex-direction: column;
        align-items: center;
        box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(0,0,0,0.4);
        border-radius: 20rpx;
        box-sizing: border-box;
        margin-top: 20rpx;
        padding: 20rpx 10rpx;
        background-color: #fff;
        .top {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .left {
            width: 300rpx;
            display: flex;
            flex-direction: column;
            align-items: center;
            image {
                width: 150rpx;
                height: 150rpx;
                border-radius: 50%;
                border: 10rpx solid rgba(64,158,255,1);
            }
            .name {
                display: flex;
                align-items: center;
                font-size: 40rpx;
                margin-top: 10rpx;
                .iconfont {
                    color: rgba(64,158,255,1);
                    font-size: 50rpx;
                    margin-left: 10rpx;
                }

            }
        }
        .right {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 10rpx;
        }
        .desc {
            width: 100%;
            box-sizing: border-box;
            padding: 20rpx;
            font-size: 30rpx;
        }
    }
    .web {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(0,0,0,0.4);
        border-radius: 20rpx;
        background-color: #fff;
        box-sizing: border-box;
        margin-top: 20rpx;
        padding: 20rpx 10rpx;
        .content {
            width: 100%;
            display: flex;
            align-items: center;
        }
        .list {
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
            .item {
                width: 100%;
                display: flex;
                align-items: center;
                .name {
                    font-weight: 700;
                    color: rgba(64,158,255,1);
                    font-size: 36rpx;
                    margin-right: 20rpx;
                    margin-left: 20rpx;
                }
                text {
                    font-size: 30rpx;
                    color: #ccc;
                }
            }
        }
        .img {
            width: 300rpx;
            display: flex;
            justify-content: center;
            image {
                width: 150rpx;
                border-radius: 50%;
                border: 10rpx solid rgba(64,158,255,1);
            }
        }
        .info {
            flex: 1;
            display: flex;
            flex-direction: column;
            .name {
                font-size: 40rpx;
                margin-left: 20rpx;
                font-weight: 700;
                color: rgba(64,158,255,1);
            }
            .desc  {
                margin-left: 20rpx;
                margin-top: 20rpx;
                font-size: 35rpx;
            }

        }
    }
    .wx {
        margin: 0;
        padding: 0;
        width: 700rpx;
        margin-top: 20rpx;
        box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(0,0,0,0.4);
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 20rpx;
        background-color: #fff;
        box-sizing: border-box;
        margin-top: 20rpx;
        padding: 20rpx 10rpx;
        image {
            width: 90%;
        }
    }
    .tags {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #fff;
        border-radius: 20rpx;
        margin-top: 20rpx;
        border-radius: 20rpx;
        background-color: #fff;
        box-sizing: border-box;
        margin-top: 20rpx;
        padding: 20rpx 10rpx;
        box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(0,0,0,0.4);
        .content {
            width: 90%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 10rpx;
            .item {
                display: flex;
                align-items: center;
                justify-content: center;
                box-sizing: border-box;
                padding: 10rpx 20prx;
                border-radius: 10rpx;
                image {
                    width: 50rpx;
                }
                text {
                    font-size: 30rpx;
                    font-weight: 700;
                    margin-left: 10rpx;
                }
            }
        }
    }

}
</style>