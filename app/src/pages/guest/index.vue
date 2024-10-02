<template>
    <div class="guest">
        <view class="content">
            <div class="section">
                <uni-section titleFontSize="20px"  title="留言列表（15）"  type="line"/>
                <view class="btn" @click="openForm">
                    添加留言
                </view>
            </div>
            <view class="list">
                <view class="item" v-for="item in guestList" :key="item._id">
                    <view class="top">
                        <view class="avatar">
                            <text v-if="!item.avatar">{{ item.nickname.substring(0,1) }}</text>
                            <image
                                v-else
                                lazy-load
                                :src="item.avatar"
                                mode="aspectFit"
                            />
                        </view>
                        <view class="nickname">{{ item.nickname }}</view>
                        <view class="date">🕦 {{ dayjs(item.createTime).format("YYYY-MM-DD") }}</view>
                    </view>
                    <view class="desc">{{ item.content }}
                    </view>
                </view>
            </view>
        </view>
        <uni-popup ref="formPopup" type="bottom" background-color="#fff">
            <view id="form" style="margin: 0 auto; width: 600rpx;margin-top: 40rpx;">
                <uni-forms   :modelValue="formData">
                    <uni-forms-item label="昵称" required>
                        <uni-easyinput  placeholder="请输入昵称" />
                    </uni-forms-item>
                    <uni-forms-item label="内容" required>
                        <uni-easyinput  placeholder="请输入内容" />
                    </uni-forms-item>
                    <uni-forms-item label="头像">
                        <uni-easyinput  placeholder="请输人头像链接" />
                    </uni-forms-item>
                    <uni-forms-item label="邮箱">
                        <uni-easyinput  placeholder="请输入邮箱" />
                    </uni-forms-item>
                    <uni-forms-item >
                        <button style="border-radius: 40rpx; background-color: #e0c3f3; border: 2rpx solid #fff;color: #fff;">提交</button>
                    </uni-forms-item>
                </uni-forms>
            </view>
        </uni-popup>
    </div>
</template>

<script setup>
import { getGuestListAPI } from "@/api/guest.js"
import { ref, onMounted } from "vue"
import dayjs from "dayjs"
import { onReachBottom } from "@dcloudio/uni-app"

// 分页数据
const pageData = ref({
    page: 1,
    pageSize: 7,
    total: 0
})

// 留言数据
const guestList = ref([])

// 获取留言数据
const getGuestList = async () => {
    const res = await getGuestListAPI(pageData.value.page,pageData.value.pageSize)
    console.log(res)
    if(res.code === 200) {
        guestList.value = guestList.value.concat(res.data)
        pageData.value.total = res.total
    }
}
// 表单数据
const formData = ref({
    nickname: "",
    content: "",
    avatar: "",
    email: ""
})

const formPopup = ref(null)

// 打开弹框
const openForm = () => {
    formPopup.value.open()
}

onMounted(() => {
    getGuestList()

})

onReachBottom(() => {
    if(guestList.value.length < pageData.value.total) {
        pageData.value.page += 1
        getGuestList()
    } else {
        uni.showToast({
            title: "没有更多了",
        })
    }
})
</script>

<style scoped lang="scss">

.guest {
    width: 700rpx;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40rpx;
    .content {
        width: 700rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(0,0,0,0.4);
        border-radius: 20rpx;
        margin-top: 20rpx;
        background-color: #fff;
        .section {
            width: 700rpx !important;
            border-radius: 20rpx;
            box-sizing: border-box;
            padding: 0 20rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .btn {
                margin-right: 30rpx;
                color: #fff;
                font-weight: 700;
                text-shadow: 0 0 10rpx #000;
            }
            ::v-deep(.uni-section) {
                background-color: #fff;
            }
        }
        .list {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0 20rpx;
            box-sizing: border-box;
            gap: 20rpx;
            margin-bottom: 20rpx;
            .item {
                width: 100%;
                flex: 1;
                background: linear-gradient(90deg, #e0c3f3, #8ec5fc);
                border-radius: 20rpx;
                color: #fff;
                box-sizing: border-box;
                padding: 10rpx;
                border: 5rpx solid #bebebe;
                .top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .avatar {
                        width: 100rpx;
                        height: 100rpx;
                        border-radius: 50%;
                        border: 5rpx solid #fff;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        overflow: hidden;
                        text {
                            font-size: 50rpx;
                        }
                        image {
                            width: 100%;
                            object-fit: cover;
                        }

                    }
                    .nickname {
                        flex: 1;
                        margin-left: 20rpx;
                        font-size: 40rpx;
                        text-shadow: 0 0 10rpx #ccc;
                        font-weight: 700;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .date {
                        margin-right: 10rpx;
                    }
                }
                .desc  {
                    width: 100%;
                    margin-top: 20rpx;
                    font-size: 30rpx;
                    text-shadow: 0 0 10rpx #ccc;
                }
            }
        }
    }
    ::v-deep(.uni-popup.bottom #form) {
        margin: 0 auto;
        width: 600rpx;
}
}

</style>