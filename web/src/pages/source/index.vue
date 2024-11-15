<template>
  <div class="source" :class="{ mobile: settingStore.isMobile }">
    <div class="head">
      <div class="title">学习资源</div>
      <div class="desc">人生最大的风险就是不冒任何风险！</div>
    </div>
    <el-card>
      <div class="group container mx-auto max-w-screen-xl mt-5">
        <div class="item" v-for="item in sourceList" :key="item._id">
          <div class="info">
            <el-avatar :src="item.logo" :size="30" />
            <div class="title">{{ item.name }}</div>
            <div class="desc">————{{ item.desc }}</div>
          </div>
          <div class="list">
            <SourceCard type="web" v-for="i in item.source" :key="i._id" :data="i" />
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import SourceCard from "@/views/sources/components/SourceCard.vue"
import { getSourceListAPI } from "@/api/web/source"
import type { GroupItem } from "@/types/admin/source"
import { ref, onMounted } from "vue"
// 资源数据
const sourceList = ref<GroupItem[]>([])
import { useSettingsStore } from "@/store/modules/settings"

const settingStore = useSettingsStore()

// 获取资源数据
const getSourceList = async () => {
  const res = await getSourceListAPI()
  if (res.code === 200) {
    sourceList.value = res.data
  }
}

onMounted(() => {
  getSourceList()
})
</script>

<style scoped lang="scss">
.source {
  font-size: 20px;
  &.mobile {
    font-size: 14px;
    .head {
      height: 100px;
    }
  }
}
.head {
  background-image: url(../../assets/picture/picture-bg3.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  height: 300px;
  width: 100%;
  background-position: center;
  border-radius: 0 0 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    color: #fff;
    text-align: center;
    text-shadow: 0 0.1875rem 0.3125rem #1c1f21;
    letter-spacing: 2px;
    font-size: 1.7em;
    margin-bottom: 15px;
    font-weight: 700;
  }
  .desc {
    @extend .title;
    font-size: 0.9em;
  }
}
.group {
  display: flex;
  flex-direction: column;
  align-items: left;
  .item {
    margin: 20px 0;
    .list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
    }
    .info {
      display: flex;
      align-items: center;
      border-left: 8px solid #699ff0;
      padding-left: 10px;
      margin: 20px 0;
      .title {
        font-size: 18px;
        margin-left: 5px;
      }
      .el-avatar {
        margin-right: 10px;
        box-shadow: 0 0 10px #699ff0;
      }
      .desc {
        font-size: 14px;
        color: #999;
      }
    }
  }
}
</style>
