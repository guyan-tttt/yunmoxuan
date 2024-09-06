<template>
  <div class="content container mx-auto max-w-screen-xl mt-5">
    <el-card>
      <el-row justify="space-between" align="middle">
        <h2>⭐ 推荐歌单</h2>
        <span class="mr-3 hover:text-blue" style="cursor: pointer" @click="$router.back()"> 返回></span>
      </el-row>
      <el-row style="width: 100%" justify="center">
        <el-tabs :tab-position="tabPosition" style="height: 200px" class="demo-tabs" @tab-change="changeCategory">
          <el-tab-pane v-for="item in categoryLabel" :key="item" :label="item" />
        </el-tabs>
        <div class="content">
          <ul class="list">
            <CategoryCard v-for="item in categoryData" :key="item.id" :data="item" />
          </ul>
        </div>
      </el-row>
      <el-row justify="space-between" class="mt-5">
        <div v-cursor-pointer class="more" v-if="categoryData.length < pageData.total" @click="changePage">
          <span>加载更多</span>
        </div>
        <div class="nomore" v-else>到底了~💫</div>
      </el-row>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue"
import type { TabsInstance } from "element-plus"
import CategoryCard from "./component/CategoryCard.vue"
import { getRecommendSongCategoryAPI } from "@/api/web/music"
const tabPosition = ref<TabsInstance["tabPosition"]>("left")

const pageData = ref({
  limit: 10,
  total: 0,
  cat: "全部"
})

// 歌单分类数据
const categoryLabel = ["全部", "华语", "古风", "欧美", "流行"]
const categoryData = ref<any[]>([])

// 获取歌单分类数据
const getCategory = async () => {
  const res = await getRecommendSongCategoryAPI(pageData.value.limit, pageData.value.cat)
  if (res.code === 200) {
    categoryData.value = res.playlists
    pageData.value.total = res.total
  }
}

// 切换分类
const changeCategory = (index: any) => {
  pageData.value.cat = categoryLabel[index as number]
  pageData.value.limit = 10
  getCategory()
}

// 加载下一页
const changePage = () => {
  if (pageData.value.limit >= pageData.value.total) return

  pageData.value.limit += 10
  getCategory()
}
onMounted(() => {
  getCategory()
})
</script>

<style scoped lang="scss">
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
.content {
  width: 70%;
  min-height: 200px;
  .list {
    width: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
}
.more {
  display: inline-block;
  text-align: center;
  margin: 0 auto;
  background: #fff;
  border-radius: 100px;
  padding: 10px 35px;
  font-size: 15px;
  font-weight: 700;
  box-shadow:
    0 10px 13px rgba(31, 45, 61, 0.1),
    0 0 0 -1px rgba(32, 160, 255, 0.2),
    0 0 0 -25px rgba(32, 160, 255, 0.3);
  transition:
    all 0.25s,
    box-shadow 0s;
  letter-spacing: 1px;
  &:hover {
    color: #20a0ff;
    box-shadow:
      0 10px 13px rgba(32, 160, 255, 0.3),
      0 0 0 25px rgba(32, 160, 255, 0),
      0 0 0 25px rgba(32, 160, 255, 0);
    transition:
      all 1s,
      box-shadow 1s ease-out 0.1s;
  }
}
</style>
