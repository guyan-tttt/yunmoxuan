<template>
    <div class="tags">
        <uni-card class="item"
                  v-for="item in tagList"
                  :key="item._id"
                  :title="item.name"
                  :isFull="true"
                  extra="标签"
                  :thumbnail="item.icon">
            <rich-text class="uni-body" :nodes="item.desc"/>
        </uni-card>
    </div>
</template>

<script setup>
import { getTagListAPI } from "@/api/category"
import { ref ,onMounted} from "vue"

// 标签列表
const tagList = ref([])

// 获取标签
const getTag = async() => {
    const res = await getTagListAPI()
    if(res.code === 200) {
        tagList.value = res.data
    }
}


onMounted(() => {
    getTag()
})

</script>

<style scoped lang="scss">
.tags {
    width: 700rpx;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20rpx;
}

</style>