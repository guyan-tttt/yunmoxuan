<template>
  <div>
    <div class="header">
      <h2 class="color-white dark:text-black">云墨音乐</h2>
      <div class="search">
        <el-autocomplete
          :prefix-icon="Search"
          placeholder="请输入搜索内容"
          v-model="searchWord"
          :fetch-suggestions="getSearchSuggest as any"
          @select="selectSuggest"
        >
          <template #suffix>
            <el-icon class="el-input__icon" @click="clearSearchWord" color="red">
              <CircleClose />
            </el-icon>
          </template>
          <template #default="{ item }">
            <div class="item">
              <div class="content">
                <div class="title">{{ item.name }}</div>
                <div class="desc" />
              </div>
            </div>
          </template>
        </el-autocomplete>
        <el-button :icon="Search" type="primary" border @click="searchDetail">搜索</el-button>
      </div>
    </div>
    <div class="search content container mx-auto max-w-screen-xl mt-5">
      <el-card>
        <!-- 搜索历史 -->
        <div class="search-history">
          <div class="search-history-title">
            搜索历史
            <el-button circle :icon="Delete" size="small" type="danger" @click="clearHistory" />
          </div>
          <div class="search-history-list">
            <div class="search-history-item" v-for="(item, index) in historyStore.historyList" :key="index" @click="searchMusic(item)">
              {{ item }}
              <el-icon @click.stop="removeHistory(item)">
                <CircleClose />
              </el-icon>
            </div>
          </div>
        </div>
        <!-- 热搜列表 -->
        <div class="hot-search">
          <div class="hot-search-title">热搜列表</div>
          <div class="hot-search-list">
            <div
              class="hot-search-item"
              v-for="(item, index) in hotSearchList"
              :key="index"
              :class="{ active: item.score > 40000 }"
              @click="searchMusic(item.searchWord)"
            >
              <span class="name">{{ item.searchWord }}</span>
              <span class="score">{{ item.score > 40000 ? "🔥" : "🌟" }}{{ item.score }}</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import { getHotSearchAPI, getSearchSuggestAPI } from "@/api/web/music"
import { Search, Delete } from "@element-plus/icons-vue"
import { useRouter } from "vue-router"
import { useHistoryStore } from "@/store/modules/history"
import { ElMessage } from "element-plus"
// 历史记录仓库
const historyStore = useHistoryStore()

const router = useRouter()

// 热搜列表
const hotSearchList = ref<any[]>([])

// 获取热搜列表
const getHotSearchList = async () => {
  const res = await getHotSearchAPI()
  if (res.code === 200) {
    console.log(res)
    hotSearchList.value = res.data
  }
}

// 当前搜索关键字
const searchWord = ref<string>("")

// 发送请求获取搜索建议
const getSearchSuggest = async (queryString: string, cb: (arg: any[]) => void) => {
  if (searchWord.value) {
    const res = await getSearchSuggestAPI(queryString)
    if (res.code === 200) {
      let data = [] as any[]
      res.result && Object.keys(res.result).length
        ? res.result.order.forEach((item: any) => {
            data.push(...res.result[item])
          })
        : (data = [{ name: "无数据" }])
      cb(data)
      return
    }
    cb([{ name: "无数据" }])
    return
  }
  cb([{ name: "无数据" }])
}

// 清除搜索框内容
const clearSearchWord = () => {
  searchWord.value = ""
}

// 选择搜索建议
const selectSuggest = (item: any) => {
  console.log(item)
  searchWord.value = item.name
  searchDetail()
}

const searchDetail = () => {
  if (searchWord.value) {
    historyStore.addHistory(searchWord.value)
    router.push(`/home-music/index/search-detail?keyword=${searchWord.value}`)
  } else {
    ElMessage.warning("请输入搜索内容")
  }
}

// 清空记录
const clearHistory = () => {
  historyStore.clearHistory()
}

// 清除记录
const removeHistory = (val: string) => {
  historyStore.removeHistory(val)
}

// 点击热搜
const searchMusic = (val: string) => {
  searchWord.value = val
  searchDetail()
}

onMounted(() => {
  getHotSearchList()
})
</script>

<style scoped lang="scss">
%title {
  padding-left: 20px;
  font-size: 20px;
  font-weight: 800;
  border-left: 5px solid var(--primary-color);
  border-radius: 2px;
}
.search {
  .el-card {
    min-height: calc(100vh - 289px - 56px - 50px);
  }
  .search-history {
    margin: 20px;
    min-height: 200px;
    .search-history-title {
      @extend %title;
    }
    .search-history-list {
      margin-top: 10px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      .search-history-item {
        transition: all 0.3s ease-in-out;
        font-family: "楷体";
        padding: 5px 20px;
        border-radius: 20px;
        cursor: pointer;
        border: #ececec 1px solid;
        display: flex;
        align-items: center;
        .el-icon {
          margin-left: 10px;
        }
        &:hover {
          background: var(--primary-color);
          color: #fff;
        }
      }
    }
  }
  .hot-search {
    margin: 20px;
    .hot-search-title {
      @extend %title;
    }
    .hot-search-list {
      margin-top: 10px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      .hot-search-item {
        display: flex;
        align-items: center;
        padding: 10px;
        cursor: pointer;
        &.active {
          color: #e60026;
          font-weight: 700;
        }

        border-radius: 20px;
        transition: all 0.3s ease-in-out;
        &:hover {
          background: #f5f5f5;
          transform: translateY(-10px) scale(1.05);
        }
        .name {
          flex: 1;
          margin-left: 20px;
          font-size: 20px;

          cursor: pointer;
          &:hover {
            color: var(--primary-color);
          }
          font-family: "楷体";
        }
        .score {
          margin-right: 20px;
        }
      }
    }
  }
}

.header {
  height: 50px;
  width: 100%;
  background-color: #409eff;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  h2 {
    padding: 0;
    margin: 0;
    font-family: "楷体", Courier, monospace;
  }
  .search {
    width: 40%;
    margin-left: 20px;
    display: flex;
    align-items: center;
    ::v-deep(.el-input__wrapper) {
      border-radius: 40px;
      background-color: rgba(255, 255, 255, 0.3);
      .el-input__prefix {
        color: #fff;
      }
      .el-input__inner {
        color: #fff;
        &::placeholder {
          color: #fff;
        }
      }
    }
  }
}
</style>
