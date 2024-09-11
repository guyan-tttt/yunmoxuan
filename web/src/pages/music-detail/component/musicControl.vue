<template>
  <div class="control">
    <div class="left">
      <div class="prev" v-cursor-pointer @click="prevMusic">
        <SvgIcon name="music-prev" />
      </div>
      <div class="next" v-cursor-pointer @click="nextMusic">
        <SvgIcon name="music-next" />
      </div>
    </div>
    <div class="right">
      <div class="mode" v-cursor-pointer>
        <div class="icon">
          <el-popover placement="top" :width="200" trigger="click">
            <template #reference>
              <SvgIcon :name="musicStore.playMode.icon" />
            </template>
            <ul class="icons">
              <li v-for="(item, index) in musicStore.modes" :key="item.icon" @click="changeMode(index)">
                <SvgIcon style="color: #000" :name="item.icon" />
                <span>{{ item.name }}</span>
              </li>
            </ul>
          </el-popover>
        </div>
      </div>
      <div class="list" v-cursor-pointer>
        <el-popover placement="top-start" :width="300" trigger="click">
          <template #reference>
            <SvgIcon name="music-list" />
          </template>
          <ul class="music-list" v-if="musicStore.musicList.length > 0">
            <li
              v-for="(item, index) in musicStore.musicList"
              :key="item.id"
              @click="changeMusic(item)"
              :class="{ active: item.id === musicStore.currentMusic.id }"
            >
              <div class="index">{{ index + 1 }}</div>
              <div class="name">{{ item.title }}</div>
              <div class="artist">{{ item.artist }}</div>
              <el-icon class="ml-5" color="#FF0000" @click.stop="deleteMusic(item)"><DeleteFilled /></el-icon>
            </li>
          </ul>
          <div v-else>暂无歌曲</div>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMusicStore } from "@/store/modules/music"

const musicStore = useMusicStore()

// 列表切换歌曲
const changeMusic = (item: any) => {
  musicStore.setCurrentMusic(item)
}

// 删除歌曲
const deleteMusic = (item: any) => {
  musicStore.deleteMusic(item)
}

// 切换播放模式
const changeMode = (index: number) => {
  musicStore.changeMode(index)
}

// 播放下一首
const nextMusic = () => {
  musicStore.nextMusic()
}
// 播放上一首
const prevMusic = () => {
  musicStore.prevMusic()
}
</script>

<style scoped lang="scss">
.control {
  width: 1280px;
  height: 70px;
  // background-color: red;
  // background-color: #fff;
  border: 2px solid #fff;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    margin-left: 50px;

    .prev {
      width: 50px;
      height: 50px;
      svg {
        width: 100%;
        height: 100%;
      }
    }
    .next {
      width: 50px;
      height: 50px;
      margin-left: 20px;
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
  .right {
    display: flex;
    margin-right: 50px;
    .icon {
      width: 40px;
      height: 40px;
      margin-right: 20px;

      svg {
        width: 100%;
        height: 100%;
        outline: none;
      }
    }
    .list {
      margin-left: 20px;
      width: 40px;
      height: 40px;
      svg {
        width: 100%;
        height: 100%;
        outline: none;
      }
    }
  }
}

::v-deep(.el-popper) {
  background-color: transparent !important;
  color: #409eff !important;
}
.el-popover {
  padding: 0;
  margin: 0;
  outline: none;

  ul.icons {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    padding: 0;
    li {
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      justify-content: center;
      padding: 0;
      border-radius: 10px;
      transition: all 0.3s;
      &:hover {
        background-color: #409eff;
        color: #fff;
        transform: translateY(-5px);
      }

      svg {
        width: 40px;
        height: 40px;
        color: #409eff !important;
        border: 1px solid #409eff;
        background-color: #409eff;
        padding: 5px;
        border-radius: 50%;
      }
      span {
        margin-left: 10px;
      }
    }
  }
  ul.music-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    padding: 0;
    li {
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      justify-content: space-between;
      padding: 6px;
      border-radius: 10px;
      transition: all 0.3s;
      cursor: var(--cursor-pointer);
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 0 10px #999;
      }
      &.active {
        border: 1px solid #409eff;
      }
      .name {
        flex: 1;
        font-size: 16px;
        margin-left: 10px;
      }
      .index {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #409eff;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
      }
      .artist {
      }
      .name {
        flex: 1;
        font-size: 16px;
        margin-left: 10px;
      }
      .index {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #409eff;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
      }
      .artist {
        font-size: 14px;
        color: #999;
      }
    }
  }
}
</style>
