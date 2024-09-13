<template>
  <div class="item">
    <slot />
    <div class="pic" v-if="$props.data?.al?.picUrl">
      <el-image class="img" :src="$props.data?.al?.picUrl" fit="cover" lazy>
        <template #placeholder>
          <Loading />
        </template>
      </el-image>
    </div>
    <div class="name">
      <p>{{ props.data.name }}</p>
      ---
      <span v-for="item in props.data?.ar || props.data?.artists" :key="item.id">{{ item.name }} ·</span>
    </div>
    <slot name="check" />
    <div class="about">
      <div class="play" @click.stop="addMusicList">
        <el-icon><Headset /></el-icon>
      </div>
      <div class="download"><SvgIcon class="btn" name="download" /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue"
import Loading from "@/components/Loading/index.vue"
import { useMusicStore } from "@/store/modules/music"

const props = defineProps<{
  data: any
  type?: string
}>()

// 音乐仓库
const musicStore = useMusicStore()

// 添加音乐到播放列表
const addMusicList = () => {
  if (!props.type) {
    musicStore.addMusicList(props.data)
  } else {
    musicStore.addMusicListSearch(props.data)
  }
}
</script>

<style scoped lang="scss">
.item {
  width: 70%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  align-items: center;
  font-size: 16px;
  transition: all 0.5s;
  padding: 10px 0;
  &:hover {
    background-color: #f5f8fb;
    transform: translateY(-2px);
    .name p,
    .about .time {
      color: #409eff;
    }
    .about {
      .play,
      .download {
        transform: scale(1);
      }
    }
  }
  &:first-child {
    border-top: 1px solid #ccc;
  }
  .pic {
    width: 80px;
    height: 80px;
    border-radius: 5px;
    margin-left: 10px;
    .img {
      border-radius: 5px;
    }
  }
  .name {
    display: flex;
    align-items: center;
    flex: 1;
    margin-left: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    p {
      font-size: 18px;
    }
    span {
      display: inline-block;
      font-size: 16px;
      color: #909399;
      max-width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .about {
    margin-right: 20px;
    margin-left: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
    .play,
    .download {
      transform: scale(0);
      transition: all 0.5s;
    }
  }
  .desc {
    flex: 1;
    font-size: 14px;
    color: #909399;
  }
}
</style>
