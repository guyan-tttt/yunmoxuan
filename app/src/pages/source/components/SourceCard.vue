<template>
    <view class="card"
          :class="{active: isActive}"
          @click="handleClick"
          :style="{
              backgroundImage: `url(${props.data.bg})`
          }">
        <div class="top">
            <image class="img" :src="props.data.logo" mode="aspectFill"/>
            <div class="name">{{ props.data.name }}</div>
            <div class="tag" @click.stop="showLink">🏷️</div>
        </div>
        <div class="content">
            <div class="desc">{{ props.data.desc }}</div>
        </div>
        <div class="bottom">
            <div class="group">📖{{ props.data.groupName }}</div>
            <div class="time">🕣{{ dayjs(props.data.createTime).format("YYYY-MM-DD") }}</div>
        </div>
    </view>
</template>

<script setup >
import { ref , defineProps} from "vue"
import dayjs from "dayjs"
const isActive = ref(false)

const emit = defineEmits(["update"])

const props = defineProps({
    data: {
        type: Object,
        default() {
            return {}
        },
    }
})

const handleClick = () => {
    isActive.value = !isActive.value
    emit("update")
}

const showLink = () => {
    uni.showModal({
        title: "资源链接",
        content: "复制链接在浏览器中打开",
        cancelText: "取消",
        confirmText: "确认",
        success:(success) => {
            if(success.confirm) {
                uni.setClipboardData({
                    data: props.data.link,
                    success:() => {
                        uni.showToast({
                            title: "链接已复制",
                        })
                    },
                })
            }
        },
    })
}
</script>

  <style scoped lang="scss">
  .card {
    width: 660rpx;
    height: 160rpx;
    overflow: hidden;
    box-shadow: 0 0 20rpx #999;
    border-radius: 20rpx;
    transition: all 0.5s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-size: cover;
    background-position: center;
    color: #fff;
    cursor: pointer;
    .top {
      height: 160rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all 0.5s;
      .img {
        margin-left: 40rpx;
        margin-right: 60rpx;
        border: 2rpx solid #fff;
        box-shadow: 0 0 20rpx #fff;
        transition: all 0.5s;
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
      }
      .name {
        flex: 1;
        font-size: 40rpx;
        font-weight: 700;
        font-family: "Source Han Serif SC";
        transition: all 0.5s;
        color: 999;
        text-shadow: 0 0 20rpx #000;
      }
      .tag {
        font-size: 60rpx;
        margin-right: 40rpx;
      }
    }
    .content {
      display: none;
      flex: 1;
      overflow: hidden;
      transition: all 0.5s;
      .desc {
        flex: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 40rpx;
        line-height: 40rpx;
        text-shadow: 0 0 20rpx #000;
      }
    }
    .bottom {
      display: none;
      width: 100%;
      display: flex;
      align-items: center;
      height: 0;
      overflow: hidden;
      transition: all 0.5s;
      .group {
        flex: 1;
        font-size: 32rpx;
        padding-left: 40rpx;
      }
      .time {
        font-size: 32rpx;
        padding-right: 40rpx;
      }
    }
    &.active {
      height: 400rpx;
      .top {
        .img {
          transform: translateX(-400rpx);
        }
        .name {
          transform: translateX(-180rpx);
        }
      }

      .content {
        display: flex;
      }
      .bottom {
        display: flex;
        height: 80rpx;
      }
    }
  }
  </style>
